# 🚀 CampusFlow - Quick Start Guide

## What's Ready ✅

You now have a **complete one-time registration system** with backend + Supabase integration:

```
User registers once → Data saved to Supabase → Create unlimited events
```

---

## 📦 What Was Added

### Backend (New!)
- `server.js` - Express server with API endpoints
- `config/database.js` - Supabase operations
- `package.json` - Node.js dependencies
- `.env.example` - Configuration template
- `sql/schema.sql` - Database schema

### Frontend (Updated!)
- `Registration.jsx` - One-time registration form
- `authService.js` - Registration & authentication
- `eventService.js` - Event management with backend
- `EventInbox.jsx` - Updated to use backend
- `App.jsx` - Registration flow logic
- `Header.jsx` - Logout button added

---

## ⚡ Quick Setup (10 minutes)

### Step 1: Set Up Supabase

1. Go to https://supabase.com
2. Create free account
3. Create new project "campusflow"
4. Get API credentials from Settings → API
5. Copy `SUPABASE_URL` and `anon public key`

### Step 2: Run SQL Schema

1. In Supabase, go to **SQL Editor**
2. Create new query
3. Copy entire content from `backend/sql/schema.sql`
4. Click **Run**

### Step 3: Start Backend

```bash
cd backend
npm install
cp .env.example .env

# Edit .env with Supabase credentials
# SUPABASE_URL=your-url
# SUPABASE_ANON_KEY=your-key

npm run dev
# ✅ Backend running on http://localhost:5000
```

### Step 4: Start Frontend

```bash
cd frontend
npm install
cp .env.local.example .env.local

npm run dev
# ✅ Frontend running on http://localhost:5173
```

---

## 🧪 Test It

1. Open http://localhost:5173
2. **Registration page** appears first
3. Fill form:
   - Name: John Doe
   - Email: john@gmail.com
   - Phone: +91 98765 43210
4. Click "Complete Registration"
5. **✅ Registered!** Now shows Event Inbox
6. Try registering again with same email
7. **✅ Error message!** Prevents duplicate registration

---

## 💾 How It Works

### Registration (One-Time)
```
Frontend          Backend           Supabase
   ↓                ↓                   ↓
Fill form    →  /api/register  →  INSERT students
   ↓                ↓                   ↓
Check email  ← Check duplicate ← SELECT students WHERE email
   ↓
Save to localStorage
```

### Event Creation (Unlimited)
```
Frontend             Backend            Supabase
   ↓                  ↓                   ↓
Enter event    →  /api/events  →  INSERT events
   ↓                  ↓                   ↓
              →  n8n webhook  →  WhatsApp + Calendar
```

---

## 🗂️ Project Structure

```
CampusFlow/
├── backend/
│   ├── server.js              # Main backend
│   ├── config/database.js     # DB operations
│   ├── sql/schema.sql         # Database schema
│   ├── package.json
│   ├── .env                   # ← Edit this (Supabase credentials)
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Registration.jsx
│   │   │   └── EventInbox.jsx
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   └── eventService.js
│   │   ├── App.jsx
│   │   └── style/
│   ├── .env.local             # ← Edit this
│   └── .env.local.example
│
└── BACKEND_SETUP.md           # Detailed guide
```

---

## 🔑 Key Features

✅ **One-Time Registration**
- Students register only once
- Email must be unique
- Data persists in Supabase
- localStorage prevents re-registration

✅ **Event Management**
- Create unlimited events after registration
- Events stored in Supabase
- Sent to n8n for automation

✅ **Persistent Storage**
- All data in Supabase (PostgreSQL)
- Works across browser sessions
- Secure backend

✅ **Student Info**
- Name, Email, Phone stored
- Displayed in header
- Used for WhatsApp/Calendar

---

## 🎯 API Endpoints Ready

### Register Student
```
POST /api/register
{
  "studentName": "John",
  "studentEmail": "john@gmail.com",
  "phoneNumber": "+91 98765 43210"
}
```

### Create Event
```
POST /api/events
{
  "studentId": "uuid",
  "title": "Assignment",
  "date": "2024-03-20",
  "time": "17:00",
  "description": "Details"
}
```

### Get Student Info
```
GET /api/student/:studentId
```

### Get Student Events
```
GET /api/student/:studentId/events
```

---

## ⚙️ Environment Variables

### Backend (.env)
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_KEY=eyJhbGc...
PORT=5000
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env.local)
```env
VITE_API_URL=http://localhost:5000/api
VITE_N8N_WEBHOOK_URL=http://localhost:5678/webhook/campusflow
```

---

## 🧠 What's Next

1. **Test the flow**
   - Register a student
   - Create an event
   - Check Supabase dashboard to see data

2. **Integrate n8n**
   - Set up n8n webhook to receive events
   - Add WhatsApp integration (Twilio)
   - Add Google Calendar integration

3. **Deploy**
   - Backend to Render/Railway/Heroku
   - Frontend to Vercel/Netlify
   - Keep Supabase in cloud

---

## 📝 Supabase Data Verification

To see your registered students:

1. Go to Supabase dashboard
2. Click "Table Editor"
3. Select "students" table
4. See all registrations
5. Select "events" table
6. See all events created

---

## 🐛 Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| 404 on /api/register | Backend not running or wrong URL |
| "Email already registered" | Correct! Try different email |
| CORS error | Check FRONTEND_URL in backend .env |
| "Backend not connected" | Ensure backend is running |
| Events not saving | Check studentId is valid |

---

## 📊 Status

```
✅ Backend Setup        - Complete
✅ Supabase Integration - Complete
✅ One-Time Registration - Complete
✅ Event Storage        - Complete
⏳ n8n Integration      - Next (see N8N_QUICK_START.md)
⏳ Deployment           - Deploy when ready
```

---

## 📚 Full Documentation

- **Backend Setup**: See `BACKEND_SETUP.md`
- **Frontend Setup**: See `frontend/CAMPUSFLOW_SETUP.md`
- **n8n Workflow**: See `frontend/N8N_QUICK_START.md`
- **Event Inbox**: See `frontend/EVENT_INBOX_SETUP.md`

---

## 🎉 You're Ready!

Your CampusFlow system is now ready for:
1. Testing the registration flow
2. Creating events
3. Integrating with n8n
4. Going live with WhatsApp + Calendar automation

**Next step:** Follow `BACKEND_SETUP.md` for detailed configuration!

---

**Created:** March 2024  
**Version:** 1.0 Complete  
**Status:** ✅ Production Ready
