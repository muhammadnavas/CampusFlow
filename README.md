"# 🎓 CampusFlow - AI-Powered Student Task & Notice Management System

**AI-Powered Student Task & Notice Management System**

CampusFlow is an intelligent notification system that helps students never miss important college deadlines. Convert college notices, assignments, and deadlines into automated reminders with AI-powered event extraction and automated notifications.

**Live Demo**: https://campus-flow-flax.vercel.app

---

## 📋 Table of Contents

- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [System Architecture](#-system-architecture)
- [Prerequisites](#-prerequisites)
- [Quick Start Guide](#-quick-start-guide)
- [Installation & Setup](#-installation--setup)
- [Running the Application](#-running-the-application)
- [Testing Guide](#-testing-guide)
- [API Endpoints](#-api-endpoints)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [Troubleshooting](#-troubleshooting)
- [License](#-license)

---

## 🌟 Features

- **📄 Smart Notice Parsing**: AI-powered extraction of event information from college notices and assignment sheets
- **🤖 Intelligent Event Detection**: Uses OpenRouter's GPT-4o to understand academic deadlines and requirements
- **✅ Event Management**: Create, update, and manage events easily
- **🔐 Secure & Private**: GDPR-compliant, encrypted data storage with Supabase
- **⚡ Real-time Updates**: Instant event synchronization across all devices
- **🎯 Automated Automation**: Integration with n8n for workflow automation
- **📱 Multi-Device Support**: Access from desktop and mobile devices

---

## 🏗️ Technology Stack

**Frontend:**
- React 19.x
- Vite 7.x (Build Tool)
- Tailwind CSS 3.x (Styling)
- PostCSS (CSS Processing)
- Three.js (3D Graphics)

**Backend:**
- Node.js 18.x
- Express.js 4.x (REST API)
- Supabase (Database & Authentication)
- Dotenv (Environment Configuration)
- CORS (Cross-Origin Resource Sharing)

**External Services:**
- OpenRouter API (AI-powered event extraction)
- Supabase (Database & Auth)
- n8n (Workflow Automation)

---

## 🏛️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React + Vite)                   │
│  - Login/Registration Component                              │
│  - Dashboard - Event Management UI                           │
│  - Event Inbox - Notification Management                     │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP/REST API
                       ▼
┌─────────────────────────────────────────────────────────────┐
│               Backend (Express.js + Node.js)                 │
│  - REST API Endpoints                                        │
│  - Student Management                                        │
│  - Event Processing & Storage                                │
│  - AI Event Extraction (OpenRouter)                          │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌───────────────┐ ┌─────────────┐ ┌──────────┐
│   Supabase    │ │ OpenRouter  │ │   n8n    │
│  (Database)   │ │ (AI API)    │ │(Workflow)│
└───────────────┘ └─────────────┘ └──────────┘
```

---

## ✅ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **npm** 9.x or higher (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))
- **Code Editor**: VS Code or any modern code editor

**Verify Installation:**
```bash
node --version   # Should be v18.x or higher
npm --version    # Should be 9.x or higher
git --version    # Should be 2.x or higher
```

---

## 🚀 Quick Start Guide

For a quick local setup and testing:

```bash
# 1. Clone the repository
git clone <repository-url>
cd CampusFlow

# 2. Install and run backend
cd backend
npm install
npm start
# Backend will run on http://localhost:5000

# 3. In a NEW terminal, install and run frontend
cd frontend
npm install
npm run dev
# Frontend will run on http://localhost:5173
```

**API Health Check:**
```bash
# In terminal, run:
curl http://localhost:5000/api/health

# Response:
# {"status":"ok","message":"CampusFlow Backend is running","timestamp":"2026-03-18T..."}
```

---

## 📦 Installation & Setup

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd CampusFlow
```

### Step 2: Backend Setup

#### 2.1 Install Dependencies

```bash
cd backend
npm install
```

**Installed Packages:**
- `express` - Web framework
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variables
- `@supabase/supabase-js` - Supabase client
- `uuid` - Unique ID generation
- `nodemon` (dev) - Auto-reload during development

#### 2.2 Configure Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
# Supabase Configuration
# Get from: https://app.supabase.com
SUPABASE_URL=https://juozmbvylgbcbpbadhxb.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_KEY=your_supabase_service_key_here

# OpenRouter API (AI Event Extraction)
# Sign up at: https://openrouter.ai
OPENROUTER_API_KEY=sk-or-v1-your_openrouter_key_here
OPENROUTER_MODEL=openai/gpt-4o-mini

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:5173

# n8n Webhook (For Workflow Automation)
# Get from your n8n workflow setup
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/reminder
```

**Environment Variables Reference:**

| Variable | Description | Example |
|----------|-------------|---------|
| `SUPABASE_URL` | Your Supabase project URL | `https://xxxx.supabase.co` |
| `SUPABASE_ANON_KEY` | Supabase anonymous key (public) | `sb_publishable_xxxx` |
| `SUPABASE_SERVICE_KEY` | Supabase service role key (secret) | `sb_secret_xxxx` |
| `OPENROUTER_API_KEY` | OpenRouter API key for AI | `sk-or-v1-xxxx` |
| `OPENROUTER_MODEL` | AI Model for event extraction | `openai/gpt-4o-mini` |
| `PORT` | Backend server port | `5000` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `FRONTEND_URL` | Frontend application URL | `http://localhost:5173` |
| `N8N_WEBHOOK_URL` | n8n workflow webhook URL | `https://xxxx.n8n.cloud/webhook/reminder` |

### Step 3: Frontend Setup

#### 3.1 Install Dependencies

```bash
cd frontend
npm install
```

**Installed Packages:**
- `react` - UI library
- `react-dom` - React DOM rendering
- `three` - 3D graphics
- `vite` (dev) - Build tool
- `tailwindcss` (dev) - Utility-first CSS
- `eslint` (dev) - Code linting

#### 3.2 Configure Frontend Environment

Create a `.env.local` file in the `frontend/` directory:

```env
# API Base URL - Point to your backend
VITE_API_URL=http://localhost:5000
```

---

## ▶️ Running the Application

### Option 1: Run Both Services (Recommended for Testing)

**Terminal 1 - Backend:**
```bash
cd backend
npm start
# Output: Server running on port 5000
# Access health check: http://localhost:5000/api/health
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Output: VITE v7.x.x ready in xxx ms
# Local: http://localhost:5173/
```

### Option 2: Development Mode with Hot Reload

**Terminal 1 - Backend (with auto-reload):**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Option 3: Build for Production

**Frontend Build:**
```bash
cd frontend
npm run build
# Creates dist/ folder with optimized build
```

**Production Run:**
```bash
cd backend
npm start

# Frontend served from dist/ folder
```

---

## 🧪 Testing Guide

### 1. Verify Backend is Running

```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Expected Response:
# {"status":"ok","message":"CampusFlow Backend is running","timestamp":"2026-03-18T..."}
```

### 2. Test Student Registration

```bash
curl -X POST http://localhost:5000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "studentName": "John Doe",
    "phoneNumber": "+91-9876543210",
    "studentEmail": "john.doe@college.edu"
  }'

# Expected Response (201 Created):
# {
#   "message": "Student registration successful",
#   "studentId": "550e8400-e29b-41d4-a716-446655440000",
#   "student": {
#     "id": "550e8400-e29b-41d4-a716-446655440000",
#     "name": "John Doe",
#     "email": "john.doe@college.edu",
#     "phone_number": "+91-9876543210"
#   }
# }
```

### 3. Test Frontend Access

1. Open browser and navigate to: `http://localhost:5173`
2. You should see the CampusFlow login page
3. Click on "Registration" to create a new account
4. Enter test credentials:
   - **Name**: John Doe
   - **Email**: john.doe@college.edu
   - **Phone**: +91-9876543210

### 4. Test Event Creation (via Dashboard)

1. Login with created credentials
2. Click "Create Event"
3. Fill in event details:
   - Event Title: "Assignment Submission"
   - Due Date: Select future date
   - Description: "Submit assignment"
4. Click Submit - event should appear in dashboard

### 5. CORS Testing

Verify frontend can communicate with backend:

```bash
# From frontend directory, run:
curl -i http://localhost:5000/api/health
# Should return 
2xx response with CORS headers
```

### 6. Browser Console Testing

1. Open Developer Tools (F12)
2. Go to Console tab
3. Test API call:
```javascript
fetch('http://localhost:5000/api/health')
  .then(r => r.json())
  .then(d => console.log(d))
```

### 7. Testing Checklist

- [ ] Backend server starts without errors
- [ ] Frontend builds successfully without warnings
- [ ] Health endpoint responds with status "ok"
- [ ] Student registration creates new entry in database
- [ ] Frontend loads in browser
- [ ] Login page displays correctly
- [ ] Registration form submits data to backend
- [ ] Errors are properly displayed to user
- [ ] No CORS errors in browser console

---

## 📡 API Endpoints

### Health Check
```http
GET /api/health
```
**Response:**
```json
{
  "status": "ok",
  "message": "CampusFlow Backend is running",
  "timestamp": "2026-03-18T10:30:45.123Z"
}
```

### Student Registration
```http
POST /api/register
Content-Type: application/json

{
  "studentName": "John Doe",
  "phoneNumber": "+91-9876543210",
  "studentEmail": "john.doe@college.edu"
}
```
**Success Response (201):**
```json
{
  "message": "Student registration successful",
  "studentId": "550e8400-e29b-41d4-a716-446655440000",
  "student": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "email": "john.doe@college.edu",
    "phone_number": "+91-9876543210",
    "created_at": "2026-03-18T10:30:45.123Z",
    "is_active": true
  }
}
```
**Error Response (409 - Already Registered):**
```json
{
  "error": "Email already registered",
  "message": "Please use a different email"
}
```

### Error Responses

| Status | Description |
|--------|-------------|
| `200` | Success |
| `201` | Created |
| `400` | Bad Request (missing/invalid fields) |
| `409` | Conflict (email already exists) |
| `500` | Server Error |

---

## 📁 Project Structure

```
CampusFlow/
├── README.md                          # Project documentation
├── backend/                           # Backend API Server
│   ├── server.js                      # Main Express server
│   ├── start.js                       # Server entry point
│   ├── package.json                   # Backend dependencies
│   ├── .env                          # Environment variables (create this)
│   ├── test-openrouter-key.js         # AI API testing utility
│   ├── mock-data.json                 # Mock test data
│   ├── config/
│   │   └── database.js                # Supabase configuration
│   └── sql/
│       └── schema.sql                 # Database schema
│
├── frontend/                          # React Frontend Application
│   ├── index.html                     # HTML entry point
│   ├── vite.config.js                 # Vite configuration
│   ├── tailwind.config.js             # Tailwind CSS config
│   ├── postcss.config.js              # PostCSS configuration
│   ├── eslint.config.js               # ESLint rules
│   ├── package.json                   # Frontend dependencies
│   ├── .env.local                    # Frontend env vars (create this)
│   ├── public/                        # Static assets
│   └── src/
│       ├── main.jsx                   # React entry point
│       ├── App.jsx                    # Main App component
│       ├── App.css                    # App styles
│       ├── index.css                  # Global styles
│       ├── components/                # Reusable components
│       │   ├── Login.jsx              # Login page
│       │   ├── Registration.jsx       # Registration page
│       │   ├── Dashboard.jsx          # Main dashboard
│       │   └── EventInbox.jsx         # Event notifications
│       ├── services/                  # API & external services
│       │   ├── authService.js         # Authentication API calls
│       │   ├── eventService.js        # Event management API calls
│       │   ├── geminiService.js       # Gemini AI integration
│       │   └── n8nService.js          # n8n workflow calls
│       ├── assets/                    # Images, fonts, etc.
│       └── style/                     # Component styles
│           ├── Dashboard.css          # Dashboard styling
│           ├── EventInbox.css         # Event inbox styling
│           ├── Header.jsx             # Header component
│           ├── HomePage.jsx           # Home page
│           ├── FloatingLines.jsx      # Decorative 3D component
│           └── Registration.css       # Registration styling
```

---

## 🔧 Environment Variables

### Backend Variables Explained

**Supabase Configuration:**
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Public key for client-side authentication
- `SUPABASE_SERVICE_KEY` - Secret key for server-side operations

**How to Get Supabase Credentials:**
1. Go to https://app.supabase.com
2. Create or select your project
3. Go to Settings → API
4. Copy URL and keys

**OpenRouter API:**
- `OPENROUTER_API_KEY` - API key for AI event extraction
- `OPENROUTER_MODEL` - Model to use (gpt-4o-mini is cost-effective)

**How to Get OpenRouter API Key:**
1. Visit https://openrouter.ai
2. Sign up for free account
3. Go to Keys section
4. Add your API key to `.env`

---

## ⚠️ Troubleshooting

### Issue: Backend won't start - PORT 5000 already in use

**Solution:**
```bash
# Windows - find process using port 5000
netstat -ano | findstr :5000

# Kill the process
taskkill /PID <PID> /F

# Or use different port in .env
PORT=5001
```

### Issue: CORS Error in Frontend Console

**Error:** `Access to XMLHttpRequest at 'http://localhost:5000/...' from origin 'http://localhost:5173' has been blocked by CORS policy`

**Solution:**
1. Verify backend is running
2. Check `FRONTEND_URL` in backend `.env`
3. Restart backend server
4. Clear browser cache (Ctrl+Shift+Delete)

### Issue: "Cannot find module" errors

**Solution:**
```bash
# Reinstall dependencies
rm -r node_modules
npm install

# For Windows:
rmdir /s /q node_modules
npm install
```

### Issue: Frontend shows blank page

**Solution:**
1. Open Developer Tools (F12)
2. Check Console tab for errors
3. Verify Vite server is running (should show "Local: http://localhost:5173/")
4. Try hard refresh (Ctrl+Shift+R)

### Issue: Database connection error

**Error:** `Error: Supabase client initialization failed`

**Solution:**
1. Verify `SUPABASE_URL` and `SUPABASE_ANON_KEY` are correct
2. Ensure Supabase project is active
3. Check internet connection
4. Verify API keys haven't expired

### Issue: AI Event Extraction not working

**Error:** `OpenRouter API Error - 401 Unauthorized`

**Solution:**
1. Verify `OPENROUTER_API_KEY` is correct
2. Check OpenRouter account has available credits
3. Verify model name is correct: `openai/gpt-4o-mini`
4. Test with: `node backend/test-openrouter-key.js`

### Common Commands for Debugging

```bash
# Check if port is listening
lsof -i :5000                    # macOS/Linux
netstat -ano | findstr :5000     # Windows

# Test backend endpoint
curl -v http://localhost:5000/api/health

# View backend logs in real-time
npm run dev                      # Uses nodemon with logs

# Clear npm cache
npm cache clean --force

# Update npm
npm install -g npm@latest
```

---

## 📝 Testing Workflows

### Complete User Registration Flow

1. **Start Services:**
   ```bash
   # Terminal 1: Backend
   cd backend && npm start

   # Terminal 2: Frontend
   cd frontend && npm run dev
   ```

2. **Open Frontend:**
   - Navigate to `http://localhost:5173`

3. **Register New Student:**
   - Click "Registration"
   - Enter details:
     - Name: Test Student
     - Email: test@college.edu
     - Phone: +91-9876543210
   - Click Submit

4. **Verify in Database:**
   - Go to Supabase Dashboard
   - Check "students" table for new entry

5. **Login:**
   - Logout if auto-logged-in
   - Login with same credentials

6. **Create Event:**
   - Fill event details
   - Submit
   - Verify in dashboard

---

## 🤝 Support & Contact

For issues or questions:
1. Check [Troubleshooting](#-troubleshooting) section
2. Review API endpoint documentation
3. Check browser console for error messages
4. Verify all environment variables are set correctly

---

## 📄 Database Schema

See [backend/sql/schema.sql](backend/sql/schema.sql) for complete database structure.

**Key Tables:**
- `students` - Student accounts and profile information
- `events` - Student events and deadlines
- `notifications` - Event notifications and reminders

---

## 📜 License

This project is licensed under the MIT License - see LICENSE file for details.

---

**Last Updated:** March 18, 2026  
**Version:** 1.0.0  
**Status:** Production Ready
VITE_API_URL=http://localhost:5000/api
# Production (Render backend)
# VITE_API_URL=https://campusflow-qas5.onrender.com/api

# ============================================
# n8n Webhook URL (Event Processing)
# ============================================
VITE_N8N_WEBHOOK_URL=https://muhammadnavas.app.n8n.cloud/webhook/reminder

# ============================================
# Gemini API Key (Optional - for backup AI)
# ============================================
VITE_GEMINI_API_KEY=AIzaSy_YOUR_GEMINI_KEY_HERE
```

---

## 🔧 Getting API Keys

### 1. **Supabase** (Database & Auth)
- Go to [supabase.com](https://app.supabase.com)
- Create a new project
- Copy `Project URL`, `Anon Key`, and `Service Key`
- Paste in backend `.env`

### 2. **OpenRouter** (AI Event Extraction)
- Visit [openrouter.ai](https://openrouter.ai)
- Sign up and login
- Generate API key
- Get free $5 credits for testing
- Paste in backend `.env`

### 3. **n8n** (Automation & WhatsApp)
- Create account at [n8n.io](https://n8n.io)
- Set up WhatsApp integration workflow
- Deploy and get webhook URL
- Paste in both `.env` files

### 4. **Google Calendar API** (Optional)
- [Google Cloud Console](https://console.cloud.google.com)
- Enable Google Calendar API
- Create OAuth 2.0 credentials
- (Currently handled via frontend)

---

## 📋 How It Works

### 1. **Student Registration**
- One-time registration with Name, Email, and WhatsApp number
- Data securely stored in Supabase

### 2. **Event Submission**
- Paste college notices or assignment details
- AI analyzes and extracts event information

### 3. **Event Processing**
- Extracted event data includes:
  - Event title
  - Date (YYYY-MM-DD format)
  - Time (HH:MM format)
  - Description

### 4. **Calendar & Reminders**
- Events automatically sync to Google Calendar
- WhatsApp reminders sent 24 hours before deadline
- Customizable reminder times

---

## ⚙️ n8n Automation Workflow

The backbone of CampusFlow's automation is powered by **n8n**, which handles event processing and WhatsApp notifications:

```
┌─────────────┐   POST    ┌──────────────────┐   1 item    ┌─────────────────────┐
│  Webhook    │──────────→│  Create an Event │──────────→  │  Send SMS/WhatsApp  │
│ (Trigger)   │           │  (Calendar Sync) │             │   (Notification)    │
└─────────────┘           └──────────────────┘             └─────────────────────┘
```

### Workflow Steps:

1. **Webhook Trigger** 
   - Receives event data via POST request from backend
   - Validates incoming event payload

2. **Create an Event**
   - Stores event in database
   - Syncs to Google Calendar
   - Sets reminder parameters

3. **Send WhatsApp Reminder**
   - Sends WhatsApp message 24 hours before deadline
   - Includes event details and due time
   - Customizable message templates

### Benefits:
- ✅ Real-time event processing
- ✅ Automatic notification scheduling
- ✅ No manual intervention required
- ✅ Scalable and reliable automation
- ✅ Easy workflow management via n8n UI

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation

### Backend
- **Node.js/Express** - Server framework
- **Supabase** - Database & Auth
- **OpenRouter API** - AI event extraction
- **n8n** - Automation & WhatsApp integration
- **CORS** - Cross-origin resource handling

### Deployment
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: Supabase (Cloud)
- **Automation**: n8n Cloud

---

## 📁 Project Structure

```
CampusFlow/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # API services
│   │   ├── style/           # Styling components
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
├── backend/                 # Express backend
│   ├── config/              # Database config
│   ├── sql/                 # Database schema
│   ├── server.js            # Main server file
│   ├── package.json
│   └── .env
└── README.md
```

---

## 🔐 API Endpoints

### Authentication
- `POST /api/register` - Register new student

### Events
- `POST /api/extract-event` - Extract event from text using AI
- `GET /api/health` - Health check endpoint

---

## 🚀 Deployment

### Frontend (Vercel)
```bash
# Push to GitHub, Vercel auto-deploys
git push origin main

# Or manual deploy
vercel deploy
```

### Backend (Render)
```bash
# Set environment variables in Render dashboard
# Backend auto-deploys on git push
git push origin main
```

---

## 🔄 CI/CD

- **GitHub Actions**: Automated deployment on push to main
- **Vercel**: Frontend auto-deployment
- **Render**: Backend auto-deployment with logs

---

## 📊 Database Schema

### Students Table
- `id` - UUID primary key
- `name` - Student name
- `email` - Gmail address
- `phone` - WhatsApp phone number
- `created_at` - Registration timestamp

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🆘 Support

For issues and questions:
- GitHub Issues: [Create an issue](https://github.com/your-repo/issues)
- Email: support@campusflow.app

---

## 🎯 Roadmap

- [ ] Mobile app (React Native)
- [ ] Telegram bot integration
- [ ] Assignment submission tracking
- [ ] Class schedule management
- [ ] Peer collaboration features
- [ ] Exam preparation resources

---

## 👥 Team

**Developers:**
- **Muhammad Navas** - Lead Developer & Full Stack
- **Samarth Hegde** - Backend & Database
- **Abdulrehan M K** - Frontend & UI/UX
- **Sanketh H R** - AI Integration & DevOps

**Technologies & Services:**
- **AI Model**: OpenRouter (GPT-4o-mini)
- **Infrastructure**: Vercel, Render, Supabase
- **Automation**: n8n Cloud

---

**Made with ❤️ for students by students**" 
