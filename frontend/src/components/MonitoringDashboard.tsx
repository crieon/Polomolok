import React, { useEffect, useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import VideoGrid from './VideoGrid';
import ControlPanel from './ControlPanel';
import { roomsAPI, sessionsAPI } from '../services/api';
import websocketService from '../services/websocket';

const MonitoringDashboard: React.FC = () => {
  const {
    user,
    rooms,
    setRooms,
    currentSession,
    setCurrentSession,
    setMonitoringActive,
    setCurrentRoomCode,
    setError,
    error,
  } = useAppStore();

  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadRooms = async () => {
      try {
        const response = await roomsAPI.listRooms();
        setRooms(response.data.rooms);
      } catch (err) {
        setError('Failed to load rooms');
      } finally {
        setIsLoading(false);
      }
    };

    loadRooms();
  }, [setRooms, setError]);

  const handleStartMonitoring = async (roomId: number) => {
    if (!user) return;

    try {
      setSelectedRoomId(roomId);
      const room = rooms.find((r) => r.id === roomId);
      if (!room) return;

      // Create monitoring session
      const sessionResponse = await sessionsAPI.createSession(roomId);
      setCurrentSession(sessionResponse.data.session);
      setCurrentRoomCode(room.room_code);
      setMonitoringActive(true);

      // Connect to WebSocket room
      await websocketService.connect(user.user_id);
      websocketService.joinRoom(room.room_code, user.user_id);

      // Set up event listeners
      setupWebSocketListeners();
    } catch (err) {
      setError('Failed to start monitoring');
    }
  };

  const handleStopMonitoring = async () => {
    if (!currentSession) return;

    try {
      websocketService.leaveRoom();
      websocketService.disconnect();

      // End session
      await sessionsAPI.updateSession(currentSession.id, { end_time: new Date().toISOString() });

      setCurrentSession(null);
      setCurrentRoomCode(null);
      setMonitoringActive(false);
      setSelectedRoomId(null);
    } catch (err) {
      setError('Failed to stop monitoring');
    }
  };

  const setupWebSocketListeners = () => {
    websocketService.on('user_joined', (data) => {
      console.log('User joined:', data);
    });

    websocketService.on('user_left', (data) => {
      console.log('User left:', data);
    });

    websocketService.on('instruction_received', (data) => {
      console.log('Instruction received:', data);
    });

    websocketService.on('webrtc_offer', (data) => {
      console.log('WebRTC offer received:', data);
    });

    websocketService.on('webrtc_answer', (data) => {
      console.log('WebRTC answer received:', data);
    });

    websocketService.on('webrtc_ice_candidate', (data) => {
      console.log('ICE candidate received:', data);
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-white text-xl">Loading therapy center...</div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-900 text-white overflow-hidden">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Therapy Center Monitor</h1>
            <p className="text-gray-400">Welcome, {user?.username}</p>
          </div>
          <div className="text-sm text-gray-400">
            {currentSession && (
              <span className="inline-block bg-red-600 px-3 py-1 rounded">
                🔴 Monitoring Active
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="h-[calc(100vh-80px)] flex">
        {/* Video Grid (Left) */}
        <div className="flex-1 flex flex-col p-4">
          <VideoGrid />
        </div>

        {/* Control Panel (Right) */}
        <div className="w-80 bg-gray-800 border-l border-gray-700 overflow-y-auto">
          <ControlPanel
            rooms={rooms}
            selectedRoomId={selectedRoomId}
            onStartMonitoring={handleStartMonitoring}
            onStopMonitoring={handleStopMonitoring}
            isMonitoring={!!currentSession}
          />
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded shadow-lg">
          {error}
        </div>
      )}
    </div>
  );
};

export default MonitoringDashboard;
