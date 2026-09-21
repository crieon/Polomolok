import React, { useState } from 'react';
import { Room } from '../store/useAppStore';
import websocketService from '../services/websocket';

interface ControlPanelProps {
  rooms: Room[];
  selectedRoomId: number | null;
  onStartMonitoring: (roomId: number) => void;
  onStopMonitoring: () => void;
  isMonitoring: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  rooms,
  selectedRoomId,
  onStartMonitoring,
  onStopMonitoring,
  isMonitoring,
}) => {
  const [isMicActive, setIsMicActive] = useState(false);
  const [notes, setNotes] = useState('');

  const handleSendInstruction = async () => {
    if (!isMicActive) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onloadend = () => {
          websocketService.sendInstruction(reader.result as ArrayBuffer);
        };
        reader.readAsArrayBuffer(blob);
      };

      mediaRecorder.start();
      setTimeout(() => mediaRecorder.stop(), 5000); // 5 second recording
    } catch (err) {
      console.error('Failed to record audio:', err);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Rooms Section */}
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold mb-3">Therapy Rooms</h2>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {rooms.map((room) => (
            <button
              key={room.id}
              onClick={() => onStartMonitoring(room.id)}
              disabled={isMonitoring && selectedRoomId !== room.id}
              className={`w-full p-3 rounded text-left transition ${
                selectedRoomId === room.id
                  ? 'bg-blue-600 text-white'
                  : isMonitoring
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-700 hover:bg-gray-600 text-white'
              }`}
            >
              <div className="font-semibold">{room.room_name}</div>
              <div className="text-xs text-gray-300">{room.room_code}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Monitoring Controls */}
      {isMonitoring && (
        <div className="flex-1 p-4 border-b border-gray-700 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Monitoring Controls</h2>

          {/* Microphone Control */}
          <div className="mb-4">
            <button
              onClick={() => setIsMicActive(!isMicActive)}
              className={`w-full p-3 rounded font-semibold transition ${
                isMicActive
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              {isMicActive ? '🎙️ Stop Instruction' : '🎤 Start Instruction'}
            </button>
          </div>

          {/* Send Instruction Button */}
          {isMicActive && (
            <div className="mb-4">
              <button
                onClick={handleSendInstruction}
                className="w-full p-3 rounded font-semibold bg-green-600 hover:bg-green-700 transition"
              >
                📤 Send Instruction
              </button>
            </div>
          )}

          {/* Notes Section */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Session Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes about this monitoring session..."
              className="w-full p-2 rounded bg-gray-700 text-white text-sm h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Stop Monitoring Button */}
          <button
            onClick={onStopMonitoring}
            className="w-full p-3 rounded font-semibold bg-red-600 hover:bg-red-700 transition"
          >
            ⏹️ Stop Monitoring
          </button>
        </div>
      )}

      {/* Info Section */}
      <div className="p-4 bg-gray-800 text-xs text-gray-400 flex-1">
        <h3 className="font-semibold mb-2">Instructions</h3>
        <ul className="space-y-1 text-xs">
          <li>• Click a room to start monitoring</li>
          <li>• Activate microphone to send instructions</li>
          <li>• All participants hear instructions live</li>
          <li>• Add session notes for records</li>
          <li>• Click Stop to end the session</li>
        </ul>
      </div>
    </div>
  );
};

export default ControlPanel;
