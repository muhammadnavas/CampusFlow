# n8n Workflow Setup - Quick Start Guide

## 🚀 Quick Setup (5 minutes)

### Option 1: Import Pre-built Workflow

1. **Open n8n** (local or cloud instance)
2. **Create New Workflow** or Open Existing
3. **Menu → Import from File** → Select `n8n-workflow-sample.json`
4. **Credentials Setup** (see below)
5. **Save & Activate**

### Option 2: Build from Scratch

Follow the minimal workflow structure below.

---

## 📋 Minimal Workflow Structure

```
Webhook (POST /webhook/campusflow)
    ↓
Code Node (Validate Data)
    ↓
[Branch 1] Google Calendar (Create Event)
    ↓
[Branch 2] Twilio (Send WhatsApp)
    ↓
Respond to Webhook (Send Success/Error)
```

---

## 🔑 Required Credentials

You'll need to set up these integrations in n8n:

### 1. Google Calendar API

**In Google Cloud Console:**
1. Create project: https://console.cloud.google.com
2. Enable APIs: Google Calendar API
3. Create OAuth 2.0 credentials (Desktop application)
4. Download credentials JSON

**In n8n:**
1. Go to **Credentials**
2. Create new: **Google OAuth2**
3. Enter OAuth credentials
4. Scopes: `calendar`

### 2. Twilio WhatsApp

**In Twilio:**
1. Create account: https://www.twilio.com
2. Get Account SID & Auth Token
3. Set up WhatsApp Sandbox
4. Get WhatsApp number

**In n8n:**
1. Go to **Credentials**
2. Create new: **Twilio**
3. Enter Account SID & Auth Token

---

## 🔄 Node-by-Node Setup

### Node 1: Webhook Trigger
```
Type: Webhook
Method: POST
Path: campusflow
Authentication: None (or add if needed)
```

### Node 2: Code (Validate Data)
```javascript
// JavaScript code node
const eventData = $json.body;

// Validate required fields
if (!eventData.title || !eventData.date || !eventData.time) {
  throw new Error('Missing: title, date, time');
}

// Parse date and time
const eventDateTime = new Date(`${eventData.date}T${eventData.time}:00`);

return {
  ...eventData,
  eventDateTime: eventDateTime.toISOString(),
  status: 'validated',
  timestamp: new Date().toISOString()
};
```

### Node 3: Google Calendar (Only if phone exists)
```
Type: Google Calendar
Resource: Event
Operation: Create
Calendar ID: primary
Title: {{ $json.title }}
Description: {{ $json.description }}
Start Time: {{ $json.eventDateTime }}
End Time: {{ dateAdd($json.eventDateTime, 1, 'hours') }}
```

### Node 4: Twilio WhatsApp (Only if phone exists)
```
Type: Twilio
Operation: Send Message
To: whatsapp:{{ phoneNumber }}
Message: 📌 Reminder: {{ $json.title }}
         Due: {{ $json.date }} at {{ $json.time }}
         
         {{ $json.description }}
```

### Node 5: If Branch (Check Phone)
```
Type: IF
Condition: phoneNumber is not empty
Yes Branch: Send both Calendar + WhatsApp
No Branch: Send only Calendar + Success
```

### Node 6: Respond to Webhook
```
Type: Respond to Webhook
Status Code: 200
Response Body:
{
  "success": true,
  "message": "Event processed",
  "eventId": "{{ $json.id }}",
  "timestamp": "{{ now() }}"
}
```

---

## 🧪 Testing Your Workflow

### Test 1: Using n8n UI
1. Open workflow
2. Click **Execute Workflow** (play button)
3. Check execution logs

### Test 2: Using Frontend
1. Start CampusFlow frontend: `npm run dev`
2. Go to Event Inbox
3. Fill form and submit
4. Check n8n execution logs

### Test 3: Using cURL
```bash
curl -X POST http://localhost:5678/webhook/campusflow \
  -H "Content-Type: application/json" \
  -d '{
    "title": "DSA Assignment",
    "date": "2024-03-20",
    "time": "17:00",
    "description": "Dynamic Programming",
    "studentName": "John Doe",
    "phoneNumber": "+91 98765 43210",
    "studentEmail": "john@gmail.com"
  }'
```

### Expected Response
```json
{
  "success": true,
  "message": "Event processed successfully",
  "calendarEventCreated": true,
  "whatsappSent": true
}
```

---

## 🔐 Security Setup

### For Local Development
- No authentication needed on webhook
- Use ngrok for HTTPS testing: `ngrok http 5678`

### For Production
1. **Enable Webhook Authentication:**
   - Settings → Webhooks
   - Add header validation token

2. **Frontend .env.local:**
   ```env
   VITE_N8N_WEBHOOK_URL=https://your-n8n.com/webhook/campusflow?token=YOUR_SECRET_TOKEN
   ```

3. **n8n Webhook Node:**
   ```
   Authentication: Header
   Header Name: X-Token
   Compare Value: YOUR_SECRET_TOKEN
   ```

---

## 🚨 Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| "Invalid credentials" | Check Google/Twilio API keys in n8n Credentials |
| "404 webhook not found" | Ensure webhook path is correct: `/webhook/campusflow` |
| "CORS Error" | In n8n settings, allow your frontend URL |
| "WhatsApp not sent" | Check Twilio account has WhatsApp enabled |
| "Calendar event not created" | Verify Google Calendar API is enabled & credentials valid |
| "Date parsing error" | Ensure date format is YYYY-MM-DD, time is HH:MM |

---

## 📊 Workflow Execution Logs

In n8n, you can view:
- **Input data** received from webhook
- **Output data** from each node
- **Errors** and where they occurred
- **Execution time** for performance analysis

### To check logs:
1. Open workflow
2. Click **Execution** tab
3. Click on any execution to see details
4. Expand each node to see input/output

---

## 🎯 Demo Checklist

For hackathon presentation:

- [ ] Webhook node listening on correct path
- [ ] Data validation working
- [ ] Google Calendar event creates successfully
- [ ] WhatsApp message sends to phone
- [ ] Error handling if phone missing
- [ ] Response sent back to frontend
- [ ] Execution shows in n8n logs
- [ ] No sensitive data logged

---

## 📞 Support Resources

- n8n Docs: https://docs.n8n.io
- Community Forum: https://community.n8n.io
- Webhook Testing: https://webhook.site
- Google Calendar Docs: https://developers.google.com/calendar

---

## 🎨 Advanced Customizations

### Add AI Processing (Optional)
Insert before Google Calendar:

```
Code Node: Call OpenAI API
- Prompts ChatGPT to summarize event
- Returns formatted message
```

### Add Database Logging
After Calendar/WhatsApp:

```
Supabase/Firebase Node
- Log all events
- Store status (success/failed)
- Track user activity
```

### Add Email Backup
After WhatsApp:

```
Gmail/SMTP Node
- Send email reminder too
- Backup if WhatsApp fails
- Include event attachment
```

---

**Version:** 1.0  
**Last Updated:** March 2024  
**For:** CampusFlow Hackathon
