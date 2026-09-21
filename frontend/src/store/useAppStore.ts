import { create } from 'zustand';

export interface User {
  user_id: number;
  username: string;
  email: string;
  role: 'supervisor' | 'therapist';
}

export interface Room {
  id: number;
  room_name: string;
  room_code: string;
  location: string;
}

export interface Session {
  id: number;
  room_id: number;
  room_name?: string;
  supervisor_id: number;
  start_time?: string;
  end_time?: string;
  notes: string;
  recording_url?: string;
  is_recording: boolean;
}

interface AppState {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;

  // Rooms
  rooms: Room[];
  setRooms: (rooms: Room[]) => void;

  // Current session
  currentSession: Session | null;
  setCurrentSession: (session: Session | null) => void;

  // Active monitoring
  monitoringActive: boolean;
  setMonitoringActive: (active: boolean) => void;
  currentRoomCode: string | null;
  setCurrentRoomCode: (code: string | null) => void;

  // WebRTC
  localStream: MediaStream | null;
  setLocalStream: (stream: MediaStream | null) => void;
  remoteStreams: { [key: string]: MediaStream };
  addRemoteStream: (peerId: string, stream: MediaStream) => void;
  removeRemoteStream: (peerId: string) => void;

  // UI State
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Auth
  user: null,
  isAuthenticated: false,
  login: (user: User) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false, currentSession: null }),

  // Rooms
  rooms: [],
  setRooms: (rooms: Room[]) => set({ rooms }),

  // Current session
  currentSession: null,
  setCurrentSession: (currentSession: Session | null) => set({ currentSession }),

  // Active monitoring
  monitoringActive: false,
  setMonitoringActive: (monitoringActive: boolean) => set({ monitoringActive }),
  currentRoomCode: null,
  setCurrentRoomCode: (currentRoomCode: string | null) => set({ currentRoomCode }),

  // WebRTC
  localStream: null,
  setLocalStream: (localStream: MediaStream | null) => set({ localStream }),
  remoteStreams: {},
  addRemoteStream: (peerId: string, stream: MediaStream) =>
    set((state) => ({
      remoteStreams: { ...state.remoteStreams, [peerId]: stream },
    })),
  removeRemoteStream: (peerId: string) =>
    set((state) => {
      const newStreams = { ...state.remoteStreams };
      delete newStreams[peerId];
      return { remoteStreams: newStreams };
    }),

  // UI State
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  error: null,
  setError: (error: string | null) => set({ error }),
}));
