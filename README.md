# Therapy Center Monitoring System (Centercam)

A real-time web-based monitoring system for therapy centers that enables supervisors to monitor therapy sessions, provide real-time instruction feedback, and maintain quality assurance.

## Features

- 🎥 **Live Video/Audio Monitoring** - Watch up to 4 concurrent therapy rooms
- 🎙️ **Real-time Instructions** - Send audio instructions that therapists can hear instantly
- 📊 **Session Management** - Track and record monitoring sessions with notes
- 🔐 **Secure Authentication** - User-based access control with supervisor/therapist roles
- 📱 **Responsive Design** - Works on desktop and tablet devices
- ⚡ **Real-time Communication** - WebSocket-based for low-latency updates

## Quick Start

### Local Development

1. **Clone and setup backend**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   python -m flask run
   ```

2. **Setup frontend** (in another terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Access** http://localhost:5173

### Docker

```bash
docker-compose up
```

## Project Structure

- `backend/` - Flask REST API with WebSocket support
- `frontend/` - React TypeScript SPA
- `backend/passenger_wsgi.py` - Production entry point

## Tech Stack

- **Backend**: Python 3.12.14 + Flask + Flask-SocketIO + SQLAlchemy
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Real-time**: WebSocket (Socket.io) + WebRTC
- **Database**: SQLite (dev) / PostgreSQL (production)

## Configuration

### Environment Variables (backend/.env)
```env
FLASK_ENV=development
SECRET_KEY=your-secret-key
DATABASE_URL=sqlite:///centercam.db
DEBUG=True
```

## Demo Credentials

- **Username**: supervisor
- **Password**: demo123

## Production Deployment

Deployed at: https://nozomupolomolok.com/centercam

**Setup**:
- Application root: `centercam`
- Python version: 3.12.14
- Entry point: `backend/passenger_wsgi.py`
- Entry point function: `application`

## API Endpoints

- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/rooms` - List rooms
- `POST /api/rooms` - Create room (supervisor)
- `GET /api/sessions` - List sessions
- `POST /api/sessions` - Start session
- `PUT /api/sessions/<id>` - Update session

## WebSocket Events

**Join Room**: `join_monitoring_room` - Enter monitoring room
**Send Instruction**: `send_instruction` - Broadcast audio
**WebRTC**: `webrtc_offer`, `webrtc_answer`, `webrtc_ice_candidate`

## Database Models

- **User** - Supervisors and therapists
- **TherapyRoom** - Physical rooms with monitoring capability
- **MonitoringSession** - Tracking of monitoring activities

## Features in Detail

### Monitoring Dashboard
- Real-time video grid (up to 4 rooms)
- Control panel for room selection
- Microphone toggle for instruction audio
- Session notes capability

### Real-time Communication
- WebSocket for instant event delivery
- WebRTC peer connections for video/audio
- Low-latency instruction audio stream
- Automatic reconnection handling

### Session Management
- Create/update monitoring sessions
- Add notes and observations
- Optional recording capability
- Session history tracking

## Development Commands

```bash
# Backend
cd backend
python -m flask run          # Run dev server
python -m pytest             # Run tests
python manage.py db upgrade  # Run migrations

# Frontend
cd frontend
npm run dev                  # Dev server
npm run build                # Build for production
npm run type-check           # TypeScript check
npm run lint                 # Linting
```

## Security

- Password hashing with PBKDF2
- Session-based authentication
- WebSocket authentication
- CORS with credentials
- Role-based access control (supervisor/therapist)

## Troubleshooting

### Backend won't start
- Ensure Python 3.12.14 is installed
- Check `.env` configuration
- Verify port 5000 is available

### Frontend won't load video
- Check browser camera permissions
- Ensure backend WebSocket connection works
- Check browser console for errors

### WebSocket connection issues
- Verify backend is running
- Check firewall settings
- Ensure TURN server credentials are valid

## License

Proprietary - Therapy Center Monitoring System
