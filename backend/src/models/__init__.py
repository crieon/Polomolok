from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


class User(db.Model):
    """User model for supervisors and therapists"""
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False, index=True)
    password = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    role = db.Column(db.String(20), nullable=False, default='therapist')  # 'supervisor' or 'therapist'
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    sessions = db.relationship('MonitoringSession', backref='supervisor', lazy=True, foreign_keys='MonitoringSession.supervisor_id')

    def __repr__(self):
        return f'<User {self.username}>'


class TherapyRoom(db.Model):
    """Therapy room model"""
    __tablename__ = 'therapy_rooms'

    id = db.Column(db.Integer, primary_key=True)
    room_name = db.Column(db.String(80), nullable=False, index=True)
    room_code = db.Column(db.String(20), unique=True, nullable=False)
    location = db.Column(db.String(120))
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    sessions = db.relationship('MonitoringSession', backref='room', lazy=True, cascade='all, delete-orphan')

    def __repr__(self):
        return f'<TherapyRoom {self.room_name}>'


class MonitoringSession(db.Model):
    """Monitoring session model - tracks when supervisors monitor therapy sessions"""
    __tablename__ = 'monitoring_sessions'

    id = db.Column(db.Integer, primary_key=True)
    room_id = db.Column(db.Integer, db.ForeignKey('therapy_rooms.id'), nullable=False)
    supervisor_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    start_time = db.Column(db.DateTime, default=datetime.utcnow)
    end_time = db.Column(db.DateTime)
    notes = db.Column(db.Text)
    recording_url = db.Column(db.String(255))
    is_recording = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<MonitoringSession {self.id}>'

    def to_dict(self):
        return {
            'id': self.id,
            'room_id': self.room_id,
            'room_name': self.room.room_name if self.room else None,
            'supervisor_id': self.supervisor_id,
            'start_time': self.start_time.isoformat() if self.start_time else None,
            'end_time': self.end_time.isoformat() if self.end_time else None,
            'notes': self.notes,
            'recording_url': self.recording_url,
            'is_recording': self.is_recording
        }
