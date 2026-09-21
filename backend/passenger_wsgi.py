"""
Passenger WSGI entry point for production deployment.
This file is executed by Passenger to start the application.
"""
import os
import sys

# Add the backend directory to Python path
sys.path.insert(0, os.path.dirname(__file__))

# Import and create the Flask app
from app import create_app

# Create application for Passenger
app, socketio = create_app()

# Passenger expects 'application' variable
application = app

if __name__ == "__main__":
    socketio.run(app)
