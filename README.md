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

### Environment Variables

#### Backend (`.env`)
```env
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_key

# OpenRouter API (for AI event extraction)
OPENROUTER_API_KEY=your_openrouter_key
OPENROUTER_MODEL=openai/gpt-4o-mini

# Server
PORT=5000
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=https://campus-flow-flax.vercel.app
# For local: FRONTEND_URL=http://localhost:5173

# n8n Webhook (for reminders)
N8N_WEBHOOK_URL=https://your-n8n-instance/webhook/reminder
```

#### Frontend (`.env.local`)
```env
VITE_API_URL=http://localhost:5000/api
VITE_N8N_WEBHOOK_URL=https://your-n8n-instance/webhook/reminder
VITE_GEMINI_API_KEY=your_gemini_key
```

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
