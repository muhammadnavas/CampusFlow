"# 🎓 CampusFlow

**AI-Powered Student Task & Notice Management System**

CampusFlow is an intelligent notification system that helps students never miss important college deadlines. Convert college notices, assignments, and deadlines into automated reminders with AI-powered event extraction, Google Calendar sync, and WhatsApp notifications.

---

## 🌟 Features

- **📄 Smart Notice Parsing**: AI-powered extraction of event information from college notices and assignment sheets
- **🤖 Intelligent Event Detection**: Uses OpenRouter's GPT-4o to understand academic deadlines and requirements
- **📅 Google Calendar Integration**: Automatically sync extracted events to your Google Calendar
- **📱 WhatsApp Reminders**: Get instant WhatsApp notifications before important dates
- **🔐 Secure & Private**: GDPR-compliant, encrypted data storage with Supabase
- **⚡ Zero Configuration**: One-time registration, then let it work automatically
- **🎯 Smart Scheduling**: Customizable reminder times to ensure you never miss deadlines

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd CampusFlow

# Frontend Setup
cd frontend
npm install
npm run dev

# Backend Setup (in another terminal)
cd backend
npm install
npm start
```

### Environment Variables Setup

#### Step 1: Backend Configuration

Create a `.env` file in the `backend/` directory:

```env
# ============================================
# Supabase Configuration
# ============================================
# Get these from https://app.supabase.com
SUPABASE_URL=https://juozmbvylgbcbpbadhxb.supabase.co
SUPABASE_ANON_KEY=sb_publishable_YOUR_KEY_HERE
SUPABASE_SERVICE_KEY=sb_secret_YOUR_SERVICE_KEY_HERE

# ============================================
# OpenRouter API Configuration (AI Event Extraction)
# ============================================
# Sign up at https://openrouter.ai for free credits
OPENROUTER_API_KEY=sk-or-v1-YOUR_API_KEY_HERE
OPENROUTER_MODEL=openai/gpt-4o-mini

# ============================================
# Server Configuration
# ============================================
PORT=5000
NODE_ENV=development

# ============================================
# CORS Configuration
# ============================================
# Production (Vercel)
FRONTEND_URL=https://campus-flow-flax.vercel.app
# Local Development
# FRONTEND_URL=http://localhost:5173

# ============================================
# n8n Automation Webhook (WhatsApp Reminders)
# ============================================
# Get this from your n8n workflow
N8N_WEBHOOK_URL=https://muhammadnavas.app.n8n.cloud/webhook/reminder
```

#### Step 2: Frontend Configuration

Create a `.env.local` file in the `frontend/` directory:

```env
# ============================================
# Frontend Environment Configuration
# ============================================

# API Base URL (Point to your backend)
# Local Development
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

- **Designer & Developer**: Muhammad Navas
- **AI Integration**: OpenRouter (GPT-4o)
- **Infrastructure**: Vercel, Render, Supabase

---

**Made with ❤️ for students by students**" 
