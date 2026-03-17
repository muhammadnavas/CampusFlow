# CampusFlow Backend + Supabase Setup Guide

## 🏗️ Architecture Overview

```
Frontend (React) ←→ Backend (Node.js/Express) ←→ Supabase (PostgreSQL)
                                               ↓
                                          n8n Webhooks
                                               ↓
                                   (WhatsApp + Google Calendar)
```

## 📋 Prerequisites

- Node.js 16+ installed
- Supabase account (https://supabase.com)
- Backend running on port 5000
- Frontend running on port 5173

---

## 🗂️ Backend Setup (Node.js + Express + Supabase)

### Step 1: Install Dependencies

```bash
cd backend
npm install
```

This installs:
- `express` - Web framework
- `cors` - Cross-origin requests
- `@supabase/supabase-js` - Supabase client
- `dotenv` - Environment variables

### Step 2: Set Up Supabase

#### 2a. Create Supabase Project

1. Go to https://supabase.com and sign in
2. Click **"New Project"**
3. Enter project name: `campusflow`
4. Create a strong database password
5. Wait for project creation (2-3 minutes)

#### 2b. Get Credentials

After project creation:
1. Go to **Settings → API** 
2. Copy:
   - `SUPABASE_URL` - Project URL
   - `anon public` - Copy this as `SUPABASE_ANON_KEY`
   - `service_role secret` - Copy this as `SUPABASE_SERVICE_KEY`

#### 2c. Create Database Tables

1. In Supabase dashboard, go to **SQL Editor**
2. Click **"New Query"**
3. Copy-paste the entire content from `backend/sql/schema.sql`
4. Click **"Run"** button
5. Wait for tables to be created (you should see "Success!" message)

### Step 3: Configure Environment

Create `backend/.env` file:

```bash
cp .env.example .env
```

Edit `backend/.env`:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=eyJhbGc... (your key from step 2b)
SUPABASE_SERVICE_KEY=eyJhbGc... (your service key from step 2b)

PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
N8N_WEBHOOK_URL=http://localhost:5678/webhook/campusflow
```

### Step 4: Start Backend Server

```bash
# Development mode (auto-reload on changes)
npm run dev

# Or production mode
npm start
```

You should see:
```
🚀 CampusFlow Backend running on http://localhost:5000
📊 Supabase connected to: https://your-project.supabase.co
🌐 CORS enabled for: http://localhost:5173
```

### Step 5: Test Backend Connection

```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "CampusFlow Backend is running",
  "timestamp": "2024-03-17T..."
}
```

---

## 🎨 Frontend Setup (One-Time Registration)

### Step 1: Configure Frontend Environment

```bash
cd frontend
cp .env.local.example .env.local
```

Edit `frontend/.env.local`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_N8N_WEBHOOK_URL=http://localhost:5678/webhook/campusflow
```

### Step 2: Start Frontend

```bash
npm run dev
```

Frontend will open at http://localhost:5173

### Step 3: Registration Flow

1. **First visit** - User sees Registration page
2. **Fill form** with:
   - Full Name
   - Gmail Address
   - WhatsApp Phone Number (with country code)
3. **Click "Complete Registration"**
4. **Backend stores** in Supabase `students` table
5. **localStorage** stores student ID
6. **Redirect** to Event Inbox page

### Step 4: Create Events After Registration

Once registered:
1. Go to Event Inbox
2. Fill in event details (Title, Date, Time)
3. Click "Create Event"
4. Backend stores in Supabase `events` table
5. Event sent to n8n for WhatsApp + Google Calendar

---

## 🗄️ Database Schema

### Students Table
```sql
id              UUID (Primary Key)
name            VARCHAR
email           VARCHAR (UNIQUE)
phone_number    VARCHAR
created_at      TIMESTAMP
is_active       BOOLEAN
last_login      TIMESTAMP
updated_at      TIMESTAMP
```

### Events Table
```sql
id              UUID (Primary Key)
student_id      UUID (Foreign Key → students.id)
title           VARCHAR
date            DATE
time            TIME
description     TEXT
event_date_time TIMESTAMP
status          VARCHAR (pending/sent/completed/failed)
created_at      TIMESTAMP
updated_at      TIMESTAMP
```

### Notifications Table (Optional)
```sql
id              UUID (Primary Key)
student_id      UUID (Foreign Key)
event_id        UUID (Foreign Key)
notification_type VARCHAR (whatsapp/email/calendar)
sent_at         TIMESTAMP
status          VARCHAR
message         TEXT
created_at      TIMESTAMP
```

---

## 🔌 API Endpoints

### Authentication

#### Register Student (POST)
```
POST /api/register

Request Body:
{
  "studentName": "John Doe",
  "phoneNumber": "+91 98765 43210",
  "studentEmail": "john@gmail.com"
}

Response:
{
  "success": true,
  "message": "Student registered successfully",
  "studentId": "uuid-here",
  "student": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@gmail.com",
    "phoneNumber": "+91 98765 43210"
  }
}
```

#### Get Student Info (GET)
```
GET /api/student/:studentId

Response:
{
  "student": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@gmail.com",
    "phoneNumber": "+91 98765 43210",
    "createdAt": "2024-03-17T...",
    "isActive": true
  }
}
```

### Events

#### Create Event (POST)
```
POST /api/events

Request Body:
{
  "studentId": "student-uuid",
  "title": "DSA Assignment",
  "date": "2024-03-20",
  "time": "17:00",
  "description": "Dynamic Programming"
}

Response:
{
  "success": true,
  "message": "Event created successfully",
  "eventId": "uuid",
  "event": {
    "id": "uuid",
    "title": "DSA Assignment",
    "date": "2024-03-20",
    "time": "17:00",
    "status": "pending"
  }
}
```

#### Get Student Events (GET)
```
GET /api/student/:studentId/events

Response:
{
  "events": [
    {
      "id": "uuid",
      "title": "DSA Assignment",
      "date": "2024-03-20",
      "time": "17:00",
      "status": "pending",
      "createdAt": "2024-03-17T..."
    }
  ]
}
```

#### Health Check (GET)
```
GET /api/health

Response:
{
  "status": "ok",
  "message": "CampusFlow Backend is running",
  "timestamp": "2024-03-17T..."
}
```

---

## 🔐 One-Time Registration Implementation

### Frontend Logic (App.jsx)

```javascript
1. On app load:
   - Check if student ID exists in localStorage
   - If YES → Show Home/Inbox pages
   - If NO → Show Registration page

2. On registration submit:
   - Call backend /api/register endpoint
   - Backend checks if email already exists
   - If duplicate → Return error
   - If new → Create in Supabase, return studentId
   - Frontend saves studentId to localStorage
   - Redirect to Event Inbox

3. On logout:
   - Clear localStorage
   - Redirect to Registration page
```

### Backend Logic (server.js)

```javascript
1. Registration endpoint:
   - Validate required fields
   - Check if email already registered
   - If found → Return 409 Conflict error
   - If new → Insert into students table
   - Return student data with ID

2. Each event request:
   - Require studentId
   - Validate student exists
   - Create event for that student
```

---

## 💾 Data Storage

### What's Stored in Supabase (Backend)
- Student profiles (name, email, phone)
- All user events with details
- Event status tracking
- Timestamps for all operations

### What's Stored in localStorage (Frontend)
- Student ID (persistent)
- Student name
- Student email
- Student phone number

### Benefits
- **Persistent** - Data survives page refresh
- **Secure** - Sensitive data stays on backend
- **Fast** - No API calls to verify registration
- **Private** - Each device has own localStorage

---

## 🧪 Testing the Flow

### Test 1: Complete Registration

```bash
curl -X POST http://localhost:5000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "studentName": "Test User",
    "phoneNumber": "+91 98765 43210",
    "studentEmail": "test@gmail.com"
  }'
```

Expected: Returns studentId ✅

### Test 2: Duplicate Registration

```bash
# Run same request again
curl -X POST http://localhost:5000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "studentName": "Test User",
    "phoneNumber": "+91 98765 43210",
    "studentEmail": "test@gmail.com"
  }'
```

Expected: Returns 409 Conflict error ✅

### Test 3: Create Event

```bash
curl -X POST http://localhost:5000/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "studentId": "paste-student-id-from-test-1",
    "title": "Test Event",
    "date": "2024-03-20",
    "time": "17:00",
    "description": "Testing"
  }'
```

Expected: Event created with eventId ✅

### Test 4: Get Student Events

```bash
curl http://localhost:5000/api/student/paste-student-id/events
```

Expected: Array of events ✅

---

## 🐛 Troubleshooting

### Problem: "SUPABASE_URL is required"
**Solution**: Check `.env` file has all 3 variables set correctly

### Problem: "Email already registered"
**Solution**: This is expected and correct! Registration is one-time. You can use a different email to test again.

### Problem: CORS error on frontend
**Solution**: 
- Ensure backend `.env` has `FRONTEND_URL=http://localhost:5173`
- Restart backend server

### Problem: 404 on /api/register
**Solution**: 
- Ensure backend is running on port 5000
- Check API_URL in frontend `.env.local`

### Problem: Events not appearing
**Solution**:
- Confirm student was registered (check Supabase)
- Confirm studentId is correct
- Check backend logs for errors

---

## 📊 Monitoring

### Check Supabase Database

1. Go to Supabase dashboard
2. Click **"Table Editor"**
3. Select `students` table - see all registered students
4. Select `events` table - see all created events
5. Check `created_at` timestamps for verification

### Backend Logs

Terminal where backend is running shows:
- All API calls
- Errors and exceptions
- Database operations
- n8n webhook calls

### Frontend Logs

Browser Console (F12) shows:
- Registration status
- Event creation status
- n8n webhook responses
- Any JavaScript errors

---

## 🚀 Production Deployment

### Backend Deployment Options

**Option 1: Render.com**
```bash
1. Push backend code to GitHub
2. Connect Render to GitHub
3. Set environment variables
4. Deploy
```

**Option 2: Railway.app**
```bash
1. Push code to GitHub
2. Connect Railway to repo
3. Add .env variables
4. Auto-deploys on push
```

**Option 3: Heroku**
```bash
1. Install Heroku CLI
2. Run: heroku create campusflow-backend
3. Add buildpack: heroku buildpacks:add heroku/nodejs
4. Deploy with: git push heroku main
```

---

## 📚 File Structure

```
backend/
├── server.js                 # Main Express server
├── package.json             # Dependencies
├── .env                     # Environment variables (local)
├── .env.example             # Template
├── config/
│   └── database.js          # Supabase operations
└── sql/
    └── schema.sql           # Database schema

frontend/
├── src/
│   ├── components/
│   │   ├── Registration.jsx # One-time registration
│   │   └── EventInbox.jsx   # Event creation
│   ├── services/
│   │   ├── authService.js   # Registration & auth
│   │   └── eventService.js  # Event management
│   ├── App.jsx              # Main app + routing
│   └── style/
│       ├── Registration.css
│       └── EventInbox.css
├── .env.local              # Frontend config
└── .env.local.example      # Template
```

---

## ✅ Hackathon Demo Checklist

- [ ] Backend running on port 5000
- [ ] Supabase tables created
- [ ] Frontend running on port 5173
- [ ] First-time registration works
- [ ] Student data saved to Supabase
- [ ] Event creation works
- [ ] Duplicate registration prevented
- [ ] Events saved to Supabase
- [ ] n8n webhook receives events
- [ ] WhatsApp reminders sent
- [ ] Google Calendar events created

---

**Last Updated:** March 2024  
**Status:** ✅ Complete Backend + Supabase Integration
