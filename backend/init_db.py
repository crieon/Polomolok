#!/usr/bin/env python
"""Initialize database with demo data"""

import os
import sys
sys.path.insert(0, os.path.dirname(__file__))

from app import create_app
from src.models import db, User, TherapyRoom
from src.utils import hash_password, generate_room_code

def init_db():
    """Initialize database with demo data"""
    app, _ = create_app()

    with app.app_context():
        # Drop all tables (for development)
        # db.drop_all()

        # Create all tables
        db.create_all()

        # Create demo supervisor user if not exists
        supervisor = User.query.filter_by(username='supervisor').first()
        if not supervisor:
            supervisor = User(
                username='supervisor',
                password=hash_password('demo123'),
                email='supervisor@centercam.local',
                role='supervisor',
                is_active=True
            )
            db.session.add(supervisor)
            print("✓ Created supervisor user (username: supervisor, password: demo123)")

        # Create demo therapist user if not exists
        therapist = User.query.filter_by(username='therapist').first()
        if not therapist:
            therapist = User(
                username='therapist',
                password=hash_password('demo123'),
                email='therapist@centercam.local',
                role='therapist',
                is_active=True
            )
            db.session.add(therapist)
            print("✓ Created therapist user (username: therapist, password: demo123)")

        # Create demo therapy rooms if not exist
        for i in range(1, 5):
            room = TherapyRoom.query.filter_by(room_name=f'Therapy Room {i}').first()
            if not room:
                room = TherapyRoom(
                    room_name=f'Therapy Room {i}',
                    room_code=generate_room_code(),
                    location=f'Building A - Floor 2 - Room {i}',
                    is_active=True
                )
                db.session.add(room)
                print(f"✓ Created {room.room_name} (Code: {room.room_code})")

        db.session.commit()
        print("\n✓ Database initialized successfully!")
        print("\nDemo Credentials:")
        print("  Supervisor - username: supervisor, password: demo123")
        print("  Therapist - username: therapist, password: demo123")

if __name__ == '__main__':
    init_db()
