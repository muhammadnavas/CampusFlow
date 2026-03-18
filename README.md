# CampusFlow

AI-powered student task and notice management system.

CampusFlow helps students capture notices, extract deadlines with AI, store events, and trigger reminders through automation.

Live demo: https://campus-flow-flax.vercel.app

## Table of Contents

- Overview
- Features
- Tech Stack
- Project Structure
- Prerequisites
- Local Setup
- Environment Variables
- Run the App
- API Endpoints
- Evaluator Test Flow
- n8n Workflow
- Troubleshooting

## Overview

CampusFlow is a full-stack web app with:

- React frontend (Vite)
- Express backend
- Supabase database
- OpenRouter for AI extraction
- n8n for workflow automation and reminders

## Features

- Student registration and login flow
- AI-based event extraction from notice text
- Event creation and dashboard view
- Reminder workflow trigger via n8n webhook
- Health endpoint for quick backend verification

## Tech Stack

Frontend:

- React
- Vite
- Tailwind CSS

Backend:

- Node.js
- Express
- Supabase JS client

External services:

- Supabase
- OpenRouter
- n8n Cloud

## Project Structure

```text
CampusFlow/
|-- backend/
|   |-- config/
|   |-- sql/
|   |   `-- schema.sql
|   |-- server.js
|   |-- start.js
|   |-- package.json
|   `-- .env
|-- frontend/
|   |-- public/
|   |-- src/
|   |   |-- components/
|   |   |-- services/
|   |   |-- style/
|   |   |-- App.jsx
|   |   `-- main.jsx
|   |-- package.json
|   `-- .env.local
`-- README.md
```

## Prerequisites

- Node.js 18+
- npm 9+
- Git

Check installed versions:

```bash
node --version
npm --version
git --version
```

## Local Setup

1. Clone repository:

```bash
git clone <repository-url>
cd CampusFlow
```

2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

## Environment Variables

### Backend: backend/.env

```env
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key

# OpenRouter
OPENROUTER_API_KEY=sk-or-v1-your_key
OPENROUTER_MODEL=openai/gpt-4o-mini

# Server
PORT=5000
NODE_ENV=development

# CORS
FRONTEND_URL=http://localhost:5173

# n8n
N8N_WEBHOOK_URL=https://muhammadnavas.app.n8n.cloud/webhook/reminder
```

### Frontend: frontend/.env.local

```env
# Local backend
VITE_API_URL=http://localhost:5000/api

# n8n webhook used by frontend service
VITE_N8N_WEBHOOK_URL=https://muhammadnavas.app.n8n.cloud/webhook/reminder

# Optional backup AI key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

Production backend (Render) example:

```env
VITE_API_URL=https://campusflow-qas5.onrender.com/api
```

## Run the App

Start backend (Terminal 1):

```bash
cd backend
npm start
```

Start frontend (Terminal 2):

```bash
cd frontend
npm run dev
```

Local URLs:

- Frontend: http://localhost:5173
- Backend health: http://localhost:5000/api/health

## API Endpoints

Health check:

```http
GET /api/health
```

Register student:

```http
POST /api/register
Content-Type: application/json

{
  "studentName": "John Doe",
  "phoneNumber": "+91-9876543210",
  "studentEmail": "john.doe@college.edu"
}
```

## Evaluator Test Flow

1. Start backend and frontend.
2. Open frontend at http://localhost:5173.
3. Register a new student.
4. Confirm backend health endpoint returns status ok.
5. Create or submit an event through UI.
6. Confirm event processing call reaches backend.
7. Verify webhook integration path is configured.

Quick backend test:

```bash
curl http://localhost:5000/api/health
```

Expected response format:

```json
{
  "status": "ok",
  "message": "CampusFlow Backend is running",
  "timestamp": "2026-03-18T10:30:45.123Z"
}
```

## n8n Workflow

n8n instance:

- https://muhammadnavas.app.n8n.cloud

Webhook used:

- https://muhammadnavas.app.n8n.cloud/webhook/reminder

Flow:

```text
Webhook Trigger -> Create Event/Sync -> Send Notification
```

## Troubleshooting

Port already in use (5000):

```bash
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

CORS errors:

- Ensure backend is running.
- Ensure FRONTEND_URL matches frontend origin.
- Restart backend after .env changes.

Module not found:

```bash
cd backend && npm install
cd ../frontend && npm install
```

## License

MIT

Last updated: March 18, 2026
