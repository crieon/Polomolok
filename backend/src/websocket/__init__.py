from flask import request, session
from flask_socketio import emit, join_room, leave_room, rooms
import logging

logger = logging.getLogger(__name__)

# Store active connections and their room assignments
active_connections = {}


def register_websocket_events(socketio):
    """Register all WebSocket event handlers"""

    @socketio.on('connect')
    def handle_connect():
        """Handle client connection"""
        sid = request.sid
        active_connections[sid] = {'room': None, 'user_id': None}
        logger.info(f'Client connected: {sid}')
        emit('connection_response', {'data': 'Connected to server'})

    @socketio.on('disconnect')
    def handle_disconnect():
        """Handle client disconnection"""
        sid = request.sid
        if sid in active_connections:
            room = active_connections[sid].get('room')
            if room:
                leave_room(room)
                emit('user_left', {
                    'user_id': active_connections[sid]['user_id'],
                    'room': room
                }, room=room)
            del active_connections[sid]
        logger.info(f'Client disconnected: {sid}')

    @socketio.on('join_monitoring_room')
    def handle_join_room(data):
        """Handle joining a monitoring room"""
        sid = request.sid
        room = data.get('room_code')
        user_id = data.get('user_id')

        if not room or not user_id:
            emit('error', {'message': 'Room code and user_id required'})
            return

        join_room(room)
        active_connections[sid] = {'room': room, 'user_id': user_id}

        logger.info(f'User {user_id} joined room {room}')
        emit('user_joined', {
            'user_id': user_id,
            'room': room,
            'timestamp': __import__('datetime').datetime.utcnow().isoformat()
        }, room=room)

    @socketio.on('leave_monitoring_room')
    def handle_leave_room(data):
        """Handle leaving a monitoring room"""
        sid = request.sid
        if sid not in active_connections:
            return

        room = active_connections[sid]['room']
        user_id = active_connections[sid]['user_id']

        if room:
            leave_room(room)
            emit('user_left', {
                'user_id': user_id,
                'room': room,
                'timestamp': __import__('datetime').datetime.utcnow().isoformat()
            }, room=room)
            logger.info(f'User {user_id} left room {room}')

        active_connections[sid] = {'room': None, 'user_id': None}

    @socketio.on('send_instruction')
    def handle_instruction(data):
        """Handle sending instruction audio to a room"""
        sid = request.sid
        if sid not in active_connections:
            emit('error', {'message': 'Not connected'})
            return

        room = active_connections[sid]['room']
        user_id = active_connections[sid]['user_id']

        if not room:
            emit('error', {'message': 'Not in a room'})
            return

        audio_data = data.get('audio')
        if not audio_data:
            emit('error', {'message': 'No audio data provided'})
            return

        # Broadcast instruction to all users in the room except sender
        emit('instruction_received', {
            'from_user_id': user_id,
            'audio': audio_data,
            'timestamp': __import__('datetime').datetime.utcnow().isoformat()
        }, room=room, skip_sid=sid)

        logger.info(f'Instruction sent from user {user_id} to room {room}')

    @socketio.on('webrtc_offer')
    def handle_webrtc_offer(data):
        """Handle WebRTC offer for video/audio connection"""
        sid = request.sid
        if sid not in active_connections:
            return

        room = active_connections[sid]['room']
        if not room:
            return

        emit('webrtc_offer', {
            'offer': data.get('offer'),
            'from_user_id': active_connections[sid]['user_id']
        }, room=room, skip_sid=sid)

    @socketio.on('webrtc_answer')
    def handle_webrtc_answer(data):
        """Handle WebRTC answer for video/audio connection"""
        sid = request.sid
        if sid not in active_connections:
            return

        room = active_connections[sid]['room']
        if not room:
            return

        emit('webrtc_answer', {
            'answer': data.get('answer'),
            'from_user_id': active_connections[sid]['user_id']
        }, room=room, skip_sid=sid)

    @socketio.on('webrtc_ice_candidate')
    def handle_ice_candidate(data):
        """Handle ICE candidate for WebRTC connection"""
        sid = request.sid
        if sid not in active_connections:
            return

        room = active_connections[sid]['room']
        if not room:
            return

        emit('webrtc_ice_candidate', {
            'candidate': data.get('candidate'),
            'from_user_id': active_connections[sid]['user_id']
        }, room=room, skip_sid=sid)

    @socketio.on('session_update')
    def handle_session_update(data):
        """Handle session status updates"""
        sid = request.sid
        if sid not in active_connections:
            return

        room = active_connections[sid]['room']
        if not room:
            return

        emit('session_status', {
            'status': data.get('status'),
            'from_user_id': active_connections[sid]['user_id'],
            'timestamp': __import__('datetime').datetime.utcnow().isoformat()
        }, room=room)


def get_room_users(room):
    """Get list of users in a specific room"""
    return [conn for conn in active_connections.values() if conn['room'] == room]
