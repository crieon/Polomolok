# Quick Start Guide - Therapy Center Monitor

## Where Are the Files?

All files are located at: **`/home/user/Polomolok`**

## How to Run Locally

### Step 1: Open Terminal and Navigate to Project

```bash
cd /home/user/Polomolok
```

### Step 2: Start Backend (Terminal 1)

```bash
# Navigate to backend
cd /home/user/Polomolok/backend

# Run Flask development server
python -m flask run --host=0.0.0.0 --port=5000
```

**Expected Output:**
```
 * Serving Flask app 'app'
 * Debug mode: on
 * Running on http://0.0.0.0:5000
```

### Step 3: Start Frontend (Terminal 2 - New Terminal)

```bash
# Navigate to frontend
cd /home/user/Polomolok/frontend

# Install dependencies (first time only)
npm install

# Start dev server
npm run dev
```

**Expected Output:**
```
  VITE v5.0.0  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### Step 4: Open Browser

1. Open your web browser
2. Go to: **`http://localhost:5173`**
3. Login with:
   - **Username**: supervisor
   - **Password**: demo123

## Troubleshooting

### Backend won't start
- Check if port 5000 is in use: `lsof -i :5000`
- Kill process: `kill -9 <PID>`

### Frontend won't start
- Check if port 5173 is in use: `lsof -i :5173`
- Try different port: `npm run dev -- --port 5174`

### npm install fails
- Clear cache: `npm cache clean --force`
- Delete node_modules: `rm -rf node_modules`
- Try again: `npm install`

### Database issues
- Reset database: `rm backend/centercam.db`
- Reinitialize: `cd backend && python init_db.py`

## File Structure Quick Reference

```
/home/user/Polomolok/
├── backend/           ← Flask API (Python)
├── frontend/          ← React App (JavaScript/TypeScript)
├── docker-compose.yml ← Docker setup
└── README.md          ← Full documentation
```

## Demo Accounts

- **Supervisor**: username=`supervisor`, password=`demo123`
- **Therapist**: username=`therapist`, password=`demo123`

## What to Test

1. Login as supervisor
2. Click "Therapy Room 1" to start monitoring
3. Toggle microphone to send instructions
4. Add notes to session
5. Click "Stop Monitoring" to end session

## Running with Docker (Optional)

If you have Docker installed:

```bash
cd /home/user/Polomolok
docker-compose up
```

Then visit: `http://localhost:5173`

## Need Help?

- Check backend logs in Terminal 1
- Check frontend logs in Terminal 2
- Browser console: Press F12 to open Developer Tools
