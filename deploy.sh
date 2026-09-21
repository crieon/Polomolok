#!/bin/bash
set -e

echo "🔨 Building Therapy Center Monitor - SIMPLIFIED"

# Build frontend
cd "$(dirname "$0")/frontend"
echo "📦 Installing frontend dependencies..."
npm install

echo "🏗️ Building React app..."
npm run build

# Copy to backend static
echo "📋 Copying built files to backend..."
backend_static="../backend/static"
rm -rf "$backend_static"
mkdir -p "$backend_static"
cp -r dist/* "$backend_static/"

# Go back to root
cd ..

# Create deployment zip
echo "📦 Creating deployment package..."
rm -f deployment.zip
zip -r deployment.zip \
    backend/ \
    frontend/package.json \
    frontend/package-lock.json \
    .gitignore \
    README.md \
    QUICK_START.md \
    -x "backend/logs/*" \
    "backend/*.db" \
    "backend/__pycache__/*" \
    "backend/**/__pycache__/*" \
    "backend/venv/*" \
    "frontend/node_modules/*" \
    "frontend/dist/*" \
    ".git/*" \
    ".git/**/*" \
    ".vscode/*" \
    ".idea/*"

echo "✅ Build complete!"
echo "📦 Deployment package created: deployment.zip"
echo ""
echo "📝 Next steps:"
echo "1. Upload deployment.zip to your server (via FTP/File Manager)"
echo "2. Extract contents into /centercam folder"
echo "3. Run: cd backend && python init_db.py"
echo "4. Visit: https://nozomupolomolok.com/centercam"
echo ""
echo "💡 To debug errors:"
echo "   Download backend/logs/error.log via FTP"
