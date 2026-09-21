import hashlib
import os
from functools import wraps
from flask import session, jsonify
from datetime import datetime


def hash_password(password):
    """Hash password using SHA256"""
    salt = os.urandom(32)
    pwd_hash = hashlib.pbkdf2_hmac('sha256', password.encode(), salt, 100000)
    return (salt + pwd_hash).hex()


def verify_password(stored_hash, password):
    """Verify password against hash"""
    try:
        salt = bytes.fromhex(stored_hash[:64])
        stored_pwd_hash = bytes.fromhex(stored_hash[64:])
        pwd_hash = hashlib.pbkdf2_hmac('sha256', password.encode(), salt, 100000)
        return pwd_hash == stored_pwd_hash
    except (ValueError, IndexError):
        return False


def login_required(f):
    """Decorator to require login"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return jsonify({'error': 'Unauthorized'}), 401
        return f(*args, **kwargs)
    return decorated_function


def supervisor_required(f):
    """Decorator to require supervisor role"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return jsonify({'error': 'Unauthorized'}), 401

        from src.models import User
        user = User.query.get(session['user_id'])
        if not user or user.role != 'supervisor':
            return jsonify({'error': 'Forbidden - Supervisor access required'}), 403

        return f(*args, **kwargs)
    return decorated_function


def generate_room_code():
    """Generate a unique room code"""
    import random
    import string
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))


def format_datetime(dt):
    """Format datetime to ISO format string"""
    if dt is None:
        return None
    return dt.isoformat() if isinstance(dt, datetime) else str(dt)
