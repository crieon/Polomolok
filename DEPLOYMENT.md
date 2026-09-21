# Simple 3-Step Deployment Guide

This guide shows how to deploy the Therapy Center Monitor to your production server.

## ✅ Step 1: Build Locally (One Command)

On your local machine:

```bash
cd /home/user/Polomolok
chmod +x deploy.sh
./deploy.sh
```

This creates a file called `deployment.zip` with everything ready to go.

**What it does:**
- Installs npm dependencies
- Builds React frontend
- Copies built files to backend
- Creates deployment.zip

---

## 📤 Step 2: Upload to Server (FTP Only)

Using your FTP client (FileZilla, Cyberduck, etc.):

1. Connect to: `nozomupolomolok.com` with your hosting credentials
2. Navigate to: `/public_html/`
3. **Delete** the old `centercam` folder (if it exists)
4. **Upload** `deployment.zip` to `/public_html/`
5. **Extract** the zip file - contents go into `/public_html/centercam/`
6. Passenger automatically restarts when files change ✅

**That's it! No SSH needed.**

---

## 🗄️ Step 3: Initialize Database (Run Once)

If this is your first deployment:

Using a web terminal or cPanel file manager:

```bash
cd /public_html/centercam/backend
python init_db.py
```

This creates:
- Database tables
- Demo supervisor account (username: `supervisor`, password: `demo123`)
- 4 therapy rooms
- Demo therapist account (username: `therapist`, password: `demo123`)

**Run this only once. Never again unless you want to reset everything.**

---

## ✨ That's All!

Visit: **https://nozomupolomolok.com/centercam**

Login with:
- Username: `supervisor`
- Password: `demo123`

---

## 🐛 Debugging (No SSH Required)

If something goes wrong:

1. Open your FTP client
2. Navigate to: `/public_html/centercam/backend/logs/`
3. Download: `error.log`
4. Open the file to see what went wrong

All errors are logged automatically. No SSH access needed.

---

## 📋 File Structure After Upload

```
/public_html/centercam/
├── backend/                    # Python application
│   ├── app.py
│   ├── requirements.txt
│   ├── init_db.py             # Run once on first deployment
│   ├── centercam.db           # Auto-created by init_db.py
│   ├── logs/
│   │   └── error.log          # Download via FTP to debug
│   ├── src/
│   └── static/                # Built React frontend
├── passenger_wsgi.py           # Entry point (Passenger loads this)
└── frontend/                   # Source files (not used in production)
```

---

## ❌ Problems?

**Can't extract zip on server?**
- Use a different FTP client
- Or upload files manually (boring but works)

**Still seeing errors?**
- Check `backend/logs/error.log` file
- Make sure you ran `python init_db.py`
- Verify folder permissions are correct (755)

**Database exists but it's old?**
- Delete `/centercam/backend/centercam.db`
- Run `python init_db.py` again to reset

---

## 🚀 Updates

To update your app later:

1. Run `./deploy.sh` locally
2. Upload `deployment.zip`
3. Extract (overwriting old files)
4. Passenger auto-restarts
5. Done!

No database reset needed on updates.
