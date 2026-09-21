import React, { useEffect, useRef } from 'react';
import { useAppStore } from '../store/useAppStore';

const VideoGrid: React.FC = () => {
  const { localStream, remoteStreams, monitoringActive } = useAppStore();
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRefs = useRef<{ [key: string]: HTMLVideoElement }>({});

  // Set local stream
  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  // Set remote streams
  useEffect(() => {
    Object.entries(remoteStreams).forEach(([peerId, stream]) => {
      if (remoteVideoRefs.current[peerId]) {
        remoteVideoRefs.current[peerId].srcObject = stream;
      }
    });
  }, [remoteStreams]);

  const videoCount = Object.keys(remoteStreams).length + (localStream ? 1 : 0);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 bg-gray-900 rounded-lg overflow-auto">
        {!monitoringActive ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-gray-400">
              <div className="text-6xl mb-4">📹</div>
              <p className="text-xl">Select a room to start monitoring</p>
            </div>
          </div>
        ) : (
          <div
            className={`grid gap-4 p-4`}
            style={{
              gridTemplateColumns: `repeat(auto-fit, minmax(300px, 1fr))`,
            }}
          >
            {/* Local Video */}
            {localStream && (
              <div className="bg-black rounded-lg overflow-hidden shadow-lg">
                <video
                  ref={localVideoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-64 bg-black object-cover"
                />
                <div className="bg-gray-800 p-2">
                  <p className="text-sm font-semibold">You (Supervisor)</p>
                </div>
              </div>
            )}

            {/* Remote Videos */}
            {Object.entries(remoteStreams).map(([peerId, _]) => (
              <div
                key={peerId}
                className="bg-black rounded-lg overflow-hidden shadow-lg"
              >
                <video
                  ref={(el) => {
                    if (el) remoteVideoRefs.current[peerId] = el;
                  }}
                  autoPlay
                  playsInline
                  className="w-full h-64 bg-black object-cover"
                />
                <div className="bg-gray-800 p-2">
                  <p className="text-sm font-semibold">Therapist Room</p>
                </div>
              </div>
            ))}

            {/* Placeholder for empty rooms */}
            {videoCount === 0 && monitoringActive && (
              <div className="col-span-full flex items-center justify-center h-96">
                <div className="text-center text-gray-500">
                  <p className="text-lg">Waiting for participants...</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Video Stats */}
      {monitoringActive && (
        <div className="mt-4 bg-gray-800 rounded-lg p-3 text-sm text-gray-300">
          <p>
            Active Video Feeds: <span className="font-semibold">{videoCount}</span> / 4
          </p>
        </div>
      )}
    </div>
  );
};

export default VideoGrid;
