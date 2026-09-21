import { io, Socket } from 'socket.io-client';

class WebSocketService {
  private socket: Socket | null = null;
  private url: string;

  constructor() {
    this.url = window.location.origin;
  }

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.socket = io(this.url, {
          reconnection: true,
          reconnectionDelay: 1000,
          reconnectionDelayMax: 5000,
          reconnectionAttempts: 5,
          transports: ['websocket', 'polling'],
        });

        this.socket.on('connect', () => {
          console.log('WebSocket connected');
          resolve();
        });

        this.socket.on('error', (error) => {
          console.error('WebSocket error:', error);
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  joinRoom(roomCode: string, userId: number): void {
    if (this.socket) {
      this.socket.emit('join_monitoring_room', {
        room_code: roomCode,
        user_id: userId,
      });
    }
  }

  leaveRoom(): void {
    if (this.socket) {
      this.socket.emit('leave_monitoring_room', {});
    }
  }

  sendInstruction(audioData: ArrayBuffer): void {
    if (this.socket) {
      this.socket.emit('send_instruction', { audio: audioData });
    }
  }

  sendWebRTCOffer(offer: RTCSessionDescriptionInit): void {
    if (this.socket) {
      this.socket.emit('webrtc_offer', { offer });
    }
  }

  sendWebRTCAnswer(answer: RTCSessionDescriptionInit): void {
    if (this.socket) {
      this.socket.emit('webrtc_answer', { answer });
    }
  }

  sendICECandidate(candidate: RTCIceCandidateInit): void {
    if (this.socket) {
      this.socket.emit('webrtc_ice_candidate', { candidate });
    }
  }

  on(event: string, callback: (...args: any[]) => void): void {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  off(event: string, callback?: (...args: any[]) => void): void {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }

  getSocket(): Socket | null {
    return this.socket;
  }

  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }
}

export default new WebSocketService();
