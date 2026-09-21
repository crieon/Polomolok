from flask import Blueprint, request, jsonify, session
from src.models import db, User, TherapyRoom, MonitoringSession
from src.utils import hash_password, verify_password, login_required, supervisor_required, generate_room_code
import logging

logger = logging.getLogger(__name__)

api_bp = Blueprint('api', __name__, url_prefix='/api')


@api_bp.route('/auth/register', methods=['POST'])
def register():
    """Register a new user"""
    data = request.get_json()

    if not data or not data.get('username') or not data.get('password'):
        return jsonify({'error': 'Username and password required'}), 400

    if User.query.filter_by(username=data['username']).first():
        return jsonify({'error': 'Username already exists'}), 409

    user = User(
        username=data['username'],
        password=hash_password(data['password']),
        email=data.get('email', f"{data['username']}@centercam.local"),
        role=data.get('role', 'therapist')
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({
        'message': 'User registered successfully',
        'user_id': user.id,
        'username': user.username
    }), 201


@api_bp.route('/auth/login', methods=['POST'])
def login():
    """Login user"""
    data = request.get_json()

    if not data or not data.get('username') or not data.get('password'):
        return jsonify({'error': 'Username and password required'}), 400

    user = User.query.filter_by(username=data['username']).first()

    if not user or not verify_password(user.password, data['password']):
        return jsonify({'error': 'Invalid credentials'}), 401

    if not user.is_active:
        return jsonify({'error': 'User account is inactive'}), 403

    session['user_id'] = user.id
    session['username'] = user.username
    session['role'] = user.role

    return jsonify({
        'message': 'Login successful',
        'user_id': user.id,
        'username': user.username,
        'role': user.role
    }), 200


@api_bp.route('/auth/logout', methods=['POST'])
@login_required
def logout():
    """Logout user"""
    session.clear()
    return jsonify({'message': 'Logout successful'}), 200


@api_bp.route('/auth/me', methods=['GET'])
@login_required
def get_current_user():
    """Get current user info"""
    user = User.query.get(session['user_id'])

    if not user:
        return jsonify({'error': 'User not found'}), 404

    return jsonify({
        'user_id': user.id,
        'username': user.username,
        'email': user.email,
        'role': user.role
    }), 200


@api_bp.route('/rooms', methods=['GET'])
@login_required
def list_rooms():
    """List all therapy rooms"""
    rooms = TherapyRoom.query.filter_by(is_active=True).all()

    return jsonify({
        'rooms': [
            {
                'id': room.id,
                'room_name': room.room_name,
                'room_code': room.room_code,
                'location': room.location
            }
            for room in rooms
        ]
    }), 200


@api_bp.route('/rooms', methods=['POST'])
@supervisor_required
def create_room():
    """Create a new therapy room"""
    data = request.get_json()

    if not data or not data.get('room_name'):
        return jsonify({'error': 'Room name required'}), 400

    room = TherapyRoom(
        room_name=data['room_name'],
        room_code=generate_room_code(),
        location=data.get('location', ''),
        is_active=True
    )

    db.session.add(room)
    db.session.commit()

    return jsonify({
        'message': 'Room created successfully',
        'room': {
            'id': room.id,
            'room_name': room.room_name,
            'room_code': room.room_code,
            'location': room.location
        }
    }), 201


@api_bp.route('/rooms/<int:room_id>', methods=['GET'])
@login_required
def get_room(room_id):
    """Get room details"""
    room = TherapyRoom.query.get(room_id)

    if not room:
        return jsonify({'error': 'Room not found'}), 404

    return jsonify({
        'id': room.id,
        'room_name': room.room_name,
        'room_code': room.room_code,
        'location': room.location,
        'is_active': room.is_active
    }), 200


@api_bp.route('/sessions', methods=['GET'])
@supervisor_required
def list_sessions():
    """List monitoring sessions for current supervisor"""
    user_id = session['user_id']
    sessions_list = MonitoringSession.query.filter_by(supervisor_id=user_id).all()

    return jsonify({
        'sessions': [s.to_dict() for s in sessions_list]
    }), 200


@api_bp.route('/sessions', methods=['POST'])
@supervisor_required
def create_session():
    """Create a new monitoring session"""
    data = request.get_json()
    user_id = session['user_id']

    if not data or not data.get('room_id'):
        return jsonify({'error': 'Room ID required'}), 400

    room = TherapyRoom.query.get(data['room_id'])
    if not room:
        return jsonify({'error': 'Room not found'}), 404

    session_obj = MonitoringSession(
        room_id=data['room_id'],
        supervisor_id=user_id,
        notes=data.get('notes', ''),
        is_recording=data.get('is_recording', False)
    )

    db.session.add(session_obj)
    db.session.commit()

    logger.info(f'Monitoring session {session_obj.id} started for room {data["room_id"]}')

    return jsonify({
        'message': 'Session created successfully',
        'session': session_obj.to_dict()
    }), 201


@api_bp.route('/sessions/<int:session_id>', methods=['PUT'])
@supervisor_required
def update_session(session_id):
    """Update a monitoring session"""
    data = request.get_json()
    user_id = session['user_id']

    session_obj = MonitoringSession.query.get(session_id)
    if not session_obj:
        return jsonify({'error': 'Session not found'}), 404

    if session_obj.supervisor_id != user_id:
        return jsonify({'error': 'Unauthorized'}), 403

    if 'end_time' in data:
        from datetime import datetime
        session_obj.end_time = datetime.utcnow()

    if 'notes' in data:
        session_obj.notes = data['notes']

    if 'is_recording' in data:
        session_obj.is_recording = data['is_recording']

    db.session.commit()

    return jsonify({
        'message': 'Session updated successfully',
        'session': session_obj.to_dict()
    }), 200


def register_routes(app):
    """Register all routes with the Flask app"""
    app.register_blueprint(api_bp)
