import os
import logging
from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO
from config import config
from src.models import db
from src.routes import register_routes
from src.websocket import register_websocket_events

# Create logs directory if it doesn't exist
logs_dir = os.path.join(os.path.dirname(__file__), 'logs')
os.makedirs(logs_dir, exist_ok=True)

# Configure logging to file and console
log_file = os.path.join(logs_dir, 'error.log')
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(log_file),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)


def create_app(config_name=None):
    """Application factory function"""

    # Determine config name
    if config_name is None:
        config_name = os.getenv('FLASK_ENV', 'development')

    # Create Flask app
    app = Flask(__name__,
                static_folder='../frontend/dist',
                static_url_path='/')

    # Load configuration
    app.config.from_object(config.get(config_name, config['development']))

    # Initialize extensions
    db.init_app(app)
    CORS(app, supports_credentials=True)
    socketio = SocketIO(
        app,
        cors_allowed_origins="*",
        async_mode='threading',
        ping_timeout=60,
        ping_interval=25
    )

    # Create database tables
    with app.app_context():
        db.create_all()
        logger.info('Database tables created/verified')

    # Register routes
    register_routes(app)

    # Register WebSocket events
    register_websocket_events(socketio)

    # Serve frontend
    @app.route('/')
    def index():
        """Serve the frontend SPA"""
        return app.send_static_file('index.html')

    @app.errorhandler(404)
    def not_found(error):
        """Serve index.html for SPA routing"""
        if app.debug:
            return {'error': 'Not found'}, 404
        return app.send_static_file('index.html')

    @app.errorhandler(500)
    def internal_error(error):
        """Handle 500 errors"""
        logger.error(f'Internal Server Error: {error}', exc_info=True)
        return {'error': 'Internal server error', 'message': str(error)}, 500

    @app.errorhandler(Exception)
    def handle_exception(error):
        """Handle any unhandled exception"""
        logger.error(f'Unhandled exception: {error}', exc_info=True)
        return {'error': 'Server error', 'message': str(error)}, 500

    @app.route('/api/health', methods=['GET'])
    def health_check():
        """Health check endpoint"""
        return {
            'status': 'healthy',
            'environment': config_name
        }, 200

    logger.info(f'Application initialized with config: {config_name}')

    return app, socketio


if __name__ == '__main__':
    app, socketio = create_app()
    socketio.run(app, debug=True, host='0.0.0.0', port=5000)
