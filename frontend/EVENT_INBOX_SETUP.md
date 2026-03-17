# CampusFlow - Event Inbox Setup Guide

## Overview

The **Event Inbox** component is a form-based interface where students can enter event details (assignments, exams, notices) which are automatically sent to n8n for processing. n8n then:

1. 🤖 Extracts event details using AI
2. 📱 Sends WhatsApp reminders via Twilio
3. 📅 Creates Google Calendar events via OAuth
4. 🔔 Notifies students

---

## 📁 File Structure

```
frontend/src/
├── components/
│   └── EventInbox.jsx          # Main event entry form
├── services/
│   └── n8nService.js           # n8n webhook integration
├── style/
│   └── EventInbox.css          # Event inbox styling
└── .env.example                # Environment configuration template
```

---

## 🚀 Setup Instructions

### 1. Configure Environment Variables

Create a `.env.local` file in the `frontend/` directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your n8n webhook URL:

```env
VITE_N8N_WEBHOOK_URL=http://localhost:5678/webhook/campusflow
```

**For Production:**
```env
VITE_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/campusflow
```

### 2. Start the Development Server

```bash
npm run dev
```

The Event Inbox will be accessible at: `http://localhost:5173`

### 3. Navigate to Event Inbox

- Click **"Event Inbox"** in the navigation bar, or
- Click **"+ Add Event"** button in the header

---

## 📋 Form Fields

### Student Information (Optional but recommended)
- **Student Name** - Your name
- **WhatsApp Phone Number** - Where you'll receive reminders (with country code, e.g., +91 98765 43210)
- **Gmail Address** - For Google Calendar integration

### Event Details (Required)
- **Event Title*** - What is the event? (e.g., "DSA Assignment", "Math Exam", "College Notice")
- **Date*** - When is it? (YYYY-MM-DD format)
- **Time*** - What time? (HH:MM format, 24-hour)
- **Description** - Additional details about the event

\* = Required field

---

## 🌊 API Request Flow

### Frontend → n8n

When you submit the form, the following data is sent to n8n:

```json
{
  "title": "DSA Assignment",
  "date": "2024-03-20",
  "time": "17:00",
  "description": "Assignment on Dynamic Programming",
  "studentName": "John Doe",
  "phoneNumber": "+91 98765 43210",
  "studentEmail": "john@gmail.com",
  "timestamp": "2024-03-17T10:30:45.123Z",
  "source": "campusflow-frontend"
}
```

### n8n Processing

Your n8n workflow should:

1. **Receive** the webhook POST request
2. **Parse** the event data
3. **AI Processing** (Optional):
   - Use OpenAI/Gemini/Claude to extract and summarize
   - Generate reminder message content
4. **Create Google Calendar Event**:
   - Use Google Calendar node
   - Authenticate with OAuth
   - Create event with title, date, time
5. **Send WhatsApp Message**:
   - Use Twilio WhatsApp node
   - Send reminder to the phone number provided
6. **Log Success/Failure**
   - Store in database (Supabase/Firebase)
   - Send response back to frontend

---

## 🔗 n8n Webhook Configuration

### Step-by-Step Setup in n8n

1. **Create a new workflow** in n8n
2. **Add a Webhook Trigger node**:
   - Method: `POST`
   - URL: `/webhook/campusflow`
   - Authentication: (Set up based on your security needs)
   
3. **Add nodes for processing**:
   ```
   Webhook → AI Processing → Google Calendar → WhatsApp → Database → Response
   ```

4. **Example Workflow Structure**:

   ```
   Webhook Trigger
     ↓
   Code Node (Extract/Validate Data)
     ↓
   IF - Has Phone Number?
     ├─ YES → Twilio WhatsApp
     └─ NO → Log Error
     ↓
   Google Calendar OAuth
     ├─ Create Event with Title, Date, Time
     ↓
   Supabase Insert (Log Event)
     ↓
   HTTP Response (Send Success)
   ```

---

## 🔒 Security Considerations

### For Development
- Local n8n: `http://localhost:5678/webhook/campusflow`
- No authentication required

### For Production
1. **Enable Webhook Authentication** in n8n:
   - `Settings → Webhooks`
   - Add header validation
   
2. **Use HTTPS** for all webhook URLs:
   ```env
   VITE_N8N_WEBHOOK_URL=https://your-instance.com/webhook/campusflow
   ```

3. **Rate Limiting** (in n8n):
   - Limit requests per student per minute
   - Prevent spam/abuse

4. **Input Validation** (in n8n):
   - Validate date/time format
   - Check phone number format
   - Sanitize text fields

---

## 📱 Twilio WhatsApp Integration

### In n8n Workflow:

```javascript
// Example: Twilio WhatsApp Node Configuration
{
  "from": "+1 your-twilio-whatsapp-number",
  "to": "="+{{ $json.phoneNumber }}",
  "body": "📌 Reminder: {{ $json.title }} due on {{ $json.date }} at {{ $json.time }}"
}
```

### Setup in Twilio:
1. Create Twilio account: https://www.twilio.com
2. Set up WhatsApp Sandbox
3. Get credentials (Account SID, Auth Token)
4. Use in n8n Twilio node

---

## 📅 Google Calendar Integration

### In n8n Workflow:

```javascript
// Example: Google Calendar Node Configuration
{
  "calendarId": "primary",
  "title": "={{ $json.title }}",
  "startDateTime": "={{ new Date($json.date + 'T' + $json.time).toISOString() }}",
  "endDateTime": "={{ new Date($json.date + 'T' + ($json.time.split(':')[0] + 1) + ':' + $json.time.split(':')[1]).toISOString() }}",
  "description": "={{ $json.description }}"
}
```

### Setup in Google Cloud:
1. Create Google Cloud project
2. Enable Google Calendar API
3. Create OAuth credentials
4. Use in n8n Google Calendar node

---

## 🧪 Testing the Integration

### 1. Local Testing (with n8n running locally)

```bash
# Terminal 1: Start n8n
n8n start

# Terminal 2: Start CampusFlow frontend
npm run dev
```

### 2. Test the Webhook

**Using the UI:**
1. Open http://localhost:5173
2. Go to Event Inbox
3. Fill in the form
4. Click "🚀 Send to n8n Webhook"
5. Check n8n dashboard for execution

**Using cURL:**
```bash
curl -X POST http://localhost:5678/webhook/campusflow \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Assignment",
    "date": "2024-03-20",
    "time": "17:00",
    "description": "Testing the webhook",
    "studentName": "Test User",
    "phoneNumber": "+91 98765 43210",
    "studentEmail": "test@gmail.com"
  }'
```

### 3. Expected Response

```json
{
  "success": true,
  "message": "Event processed successfully",
  "eventId": "event_123456",
  "calendarEventCreated": true,
  "whatsappSent": true
}
```

---

## 🐛 Debugging

### Frontend Console

Open browser DevTools (F12) → Console to see:
- Webhook request details
- Response from n8n
- Any client-side errors

### In n8n Dashboard

1. Go to your workflow execution
2. Click on each node to see input/output
3. Check for errors or unexpected data
4. Enable `Debug Mode` if available

### Common Issues

| Issue | Solution |
|-------|----------|
| 404 Error on webhook | Check webhook URL in `.env.local` |
| CORS Error | n8n CORS should allow your frontend URL |
| Twilio SMS not sent | Verify phone number format (+country-code) |
| Calendar event not created | Check Google OAuth setup |
| Missing environment variables | Run `cp .env.example .env.local` |

---

## 📊 Demo Checklist

For the hackathon demo, these should work:

- [ ] Student can fill event form
- [ ] Form submits to n8n webhook
- [ ] n8n webhook executes successfully
- [ ] WhatsApp message sent to phone
- [ ] Google Calendar event created
- [ ] n8n logs show successful execution
- [ ] Error handling works (invalid input)
- [ ] Response message shown to user

---

## 🔄 Environment Variables Reference

| Variable | Purpose | Example |
|----------|---------|---------|
| `VITE_N8N_WEBHOOK_URL` | n8n webhook endpoint | `http://localhost:5678/webhook/campusflow` |

---

## 📝 Next Steps

1. Set up n8n locally or use a cloud instance
2. Create the webhook workflow
3. Test with the Event Inbox form
4. Integrate AI processing (OpenAI/Gemini)
5. Set up Twilio and Google Calendar integrations
6. Deploy to production

---

## 📚 Resources

- [n8n Documentation](https://docs.n8n.io)
- [Twilio WhatsApp Integration](https://www.twilio.com/en-us/messaging/whatsapp)
- [Google Calendar API](https://developers.google.com/calendar/api)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-modes.html)

---

## 💡 Tips

- The event form handles local time conversion automatically
- All fields except student info can be pre-filled from college notices
- Consider adding email/SMS backup notifications
- Test the entire flow before the hackathon demo

---

**Created:** March 2024  
**Project:** CampusFlow - AI-powered Student Productivity System
