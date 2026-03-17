# 🎓 CampusFlow - Event Inbox Implementation

## ✅ What's Been Created

Your CampusFlow Event Inbox is now fully set up! Here are all the new components:

### 📁 New Files Created

```
frontend/
├── src/
│   ├── components/
│   │   └── EventInbox.jsx              ✨ Main event entry form
│   ├── services/
│   │   └── n8nService.js               🔗 n8n API integration
│   └── style/
│       └── EventInbox.css              🎨 Styling for inbox
├── .env.example                        ⚙️  Environment template
├── EVENT_INBOX_SETUP.md               📖 Detailed setup guide
├── N8N_QUICK_START.md                 🚀 n8n workflow guide
├── n8n-workflow-sample.json           🔧 Pre-built workflow
└── CAMPUSFLOW_SETUP.md               📋 This file
```

### 🔄 Modified Files

- **src/App.jsx** - Added page routing for home/inbox
- **src/style/Header.jsx** - Added navigation buttons

---

## 🚀 Getting Started (2 minutes)

### Step 1: Install Dependencies
```bash
cd frontend
npm install
```

### Step 2: Configure Environment
```bash
# Copy template
cp .env.example .env.local

# edit .env.local and add your n8n webhook URL
# VITE_N8N_WEBHOOK_URL=http://localhost:5678/webhook/campusflow
```

### Step 3: Start Dev Server
```bash
npm run dev
```

### Step 4: Access Event Inbox
- Open: **http://localhost:5173**
- Click **"Event Inbox"** or **"+ Add Event"**

---

## 📋 Features

### Event Inbox Form Includes:

✅ **Student Information Section**
- Student name
- WhatsApp phone number (+country code)
- Gmail address

✅ **Event Details Section**
- Event title (required)
- Date picker (required)
- Time picker (required)
- Description textarea

✅ **Validation & Error Handling**
- Required field validation
- User-friendly error messages
- Loading state during submission
- Success confirmation

✅ **n8n Integration**
- Automatic webhook POSTing
- Error handling with user feedback
- Response validation
- Timestamp tracking

---

## 🔗 How It Works

### 1. User Fills Form
```
Student enters:
- Title: "DSA Assignment"
- Date: "2024-03-20"
- Time: "17:00"
- Phone: "+91 98765 43210"
```

### 2. Frontend Submits to n8n
```json
POST http://localhost:5678/webhook/campusflow
{
  "title": "DSA Assignment",
  "date": "2024-03-20",
  "time": "17:00",
  "description": "...",
  "phoneNumber": "+91 98765 43210",
  "studentName": "...",
  "studentEmail": "...",
  "timestamp": "2024-03-17T...",
  "source": "campusflow-frontend"
}
```

### 3. n8n Processes
- Validates data
- Creates Google Calendar event
- Sends WhatsApp reminder
- Returns success response

### 4. User Gets Notified
- Form shows success ✅
- WhatsApp message arrives 📱
- Calendar event created 📅

---

## 🏗️ Architecture

```
Frontend (React)
    ↓ (Form submission)
n8n Webhook
    ├─ Data Validation
    ├─ Google Calendar (Create Event)
    ├─ Twilio WhatsApp (Send Message)
    └─ Response (Success/Error)
    ↓
User's Phone & Calendar
```

---

## 📚 Component Details

### EventInbox.jsx
- **Purpose**: Main form component
- **State**: Form data, loading, messages
- **Actions**: Input changes, form submission
- **Integration**: Calls `n8nService.sendEventToN8n()`
- **Features**: Validation, error handling, responsive design

### n8nService.js
- **Purpose**: API client for n8n webhook
- **Main Function**: `sendEventToN8n(eventData)`
- **Features**: 
  - Validates required fields
  - Sends POST request with JSON payload
  - Handles errors gracefully
  - Logs activity for debugging
  - Test connection function

### EventInbox.css
- **Dark theme** matching CampusFlow branding
- **Glassmorphism** design with backdrop blur
- **Responsive** - Mobile, tablet, desktop
- **Animations** - Smooth transitions and spinners
- **Accessibility** - Proper contrast and readability

---

## ⚙️ Environment Configuration

### .env.local Setup

Create file: `frontend/.env.local`

```env
# Your n8n webhook URL
# For local development:
VITE_N8N_WEBHOOK_URL=http://localhost:5678/webhook/campusflow

# For production:
# VITE_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/campusflow
```

### Accessing in Code
```javascript
const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL;
```

---

## 🔗 n8n Webhook Setup

### Minimal Setup Required

1. **n8n Running** (local or cloud)
2. **Webhook Node** listening to `/webhook/campusflow`
3. **POST Request Handling**
   - Receive JSON data
   - Validate fields
   - Return success response

### Example n8n Flow
```
Webhook Trigger
    ↓
Validate Data
    ↓
Google Calendar (Create)
    ↓
Twilio (WhatsApp)
    ↓
Response
```

### Testing the Webhook
```bash
curl -X POST http://localhost:5678/webhook/campusflow \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Event",
    "date": "2024-03-20",
    "time": "17:00",
    "description": "Testing",
    "studentName": "Test User",
    "phoneNumber": "+91 98765 43210",
    "studentEmail": "test@gmail.com"
  }'
```

---

## 🐛 Debugging

### Frontend Debug Steps

1. **Open Browser DevTools** (F12)
2. **Go to Console tab**
3. **Check for errors** (red messages)
4. **Look for API logs** (green ✅ / red ❌)

### In Code: Check Console Logs
```javascript
// In n8nService.js
console.log('🚀 Sending event to n8n:', payload);
console.log('✅ n8n response:', data);
console.log('❌ Error:', error);
```

### Common Issues

| Problem | Solution |
|---------|----------|
| "Cannot find module" | Run `npm install` in frontend folder |
| 404 on webhook | Check webhook URL in `.env.local` |
| CORS error | Ensure n8n allows your frontend URL |
| "Unknown environment variable" | Restart `npm run dev` after editing `.env.local` |
| Form not submitting | Check browser console for JavaScript errors |

---

## 📱 Form Field Reference

### Required Fields (marked with *)
- **Event Title** - What is happening? (string)
- **Date** - When? (YYYY-MM-DD format)
- **Time** - What time? (HH:MM format, 24-hour)

### Optional Fields
- **Student Name** - Your name (string)
- **WhatsApp Number** - Phone with country code (string, e.g., +91 98765 43210)
- **Gmail** - Email address (email format)
- **Description** - Additional details (string, max 1000 chars)

---

## 🎯 Demo Script

For the hackathon demo:

```
1. Open Event Inbox
   "Click on navigation: Event Inbox"

2. Fill in the form
   Title: "Machine Learning Project Due"
   Date: Tomorrow's date
   Time: 5:00 PM (17:00)
   Phone: Your test number
   Email: Your email

3. Click "🚀 Send to n8n Webhook"
   "Form shows loading state"

4. Check Success Message
   "✅ Event sent successfully!"

5. Verify Results:
   a) Check n8n dashboard
      "Show execution logs"
   
   b) Check WhatsApp
      "Show received reminder message"
   
   c) Check Google Calendar
      "Show created event"
```

---

## 📖 Full Documentation

For detailed information, see:

- **[EVENT_INBOX_SETUP.md](./EVENT_INBOX_SETUP.md)** - Complete technical setup
- **[N8N_QUICK_START.md](./N8N_QUICK_START.md)** - n8n workflow guide
- **[n8n-workflow-sample.json](./n8n-workflow-sample.json)** - Pre-built workflow

---

## 🚀 Next Steps

### Phase 1: Get It Running (This Week)
- [ ] Set up `.env.local` with n8n URL
- [ ] Start frontend: `npm run dev`
- [ ] Test Event Inbox form submission
- [ ] Verify webhook connection works

### Phase 2: Integrate Services (Next)
- [ ] Set up n8n webhook listener
- [ ] Configure Google Calendar API
- [ ] Set up Twilio WhatsApp
- [ ] Test end-to-end workflow

### Phase 3: Enhance (Optional)
- [ ] Add AI processing for event extraction
- [ ] Add database for storing events
- [ ] Add student authentication
- [ ] Add multiple reminder options

---

## 💡 Pro Tips

1. **Test webhook first** with curl before connecting frontend
2. **Check n8n logs** for errors - not frontend
3. **Use ngrok** for testing with external services: `ngrok http 5678`
4. **Environment variables** require dev server restart
5. **Phone format matters** for Twilio: +countrycode-phone-number
6. **Date/Time validation** happens in both frontend & n8n

---

## 🔐 Security Notes

### For Hackathon (Development)
- No authentication needed
- localhost only
- Test credentials are fine

### For Production
- Add authentication to webhook
- Use HTTPS only
- Don't expose API keys
- Add rate limiting
- Validate all inputs on backend

---

## 📊 File Breakdown

### EventInbox.jsx (~200 lines)
- Form state management
- Input change handlers
- Form submission logic
- Error/success messages
- Responsive UI

### n8nService.js (~60 lines)
- Webhook URL configuration
- Data validation
- HTTP POST request
- Error handling
- Connection testing

### EventInbox.css (~400 lines)
- Dark theme styling
- Glassmorphism effects
- Responsive grid layouts
- Form input styling
- Animation keyframes

---

## 🎓 Learning Points

This implementation demonstrates:

✅ React hooks (useState)
✅ Form handling and validation
✅ API integration (fetch)
✅ Error handling & UX
✅ CSS animations & responsive design
✅ Environment configuration
✅ n8n webhook integration
✅ User feedback mechanisms

---

## 📞 Quick Reference

### Start Development
```bash
cd frontend
npm run dev
```

### Access Application
- Frontend: http://localhost:5173
- Event Inbox: Click "Event Inbox" in nav

### View Logs
- Browser: F12 → Console
- n8n: Dashboard → Executions

### Reset Everything
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## 🎉 You're All Set!

Your Event Inbox is ready to receive event details and send them to n8n. The frontend is fully functional and just needs an n8n webhook to complete the integration.

**Next**: Set up the n8n workflow and test the complete flow!

---

**Created**: March 2024  
**Project**: CampusFlow  
**Component**: Event Inbox  
**Status**: ✅ Ready for Integration
