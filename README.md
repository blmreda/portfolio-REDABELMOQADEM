# Portfolio Reda

This is a full-stack portfolio application built with React (Vite) frontend and Node.js/Express backend.

## Project Structure

```
.
├── backend/           # Node.js/Express backend
│   ├── src/
│   │   ├── config/    # Configuration files
│   │   ├── controllers/ # Request handlers
│   │   ├── models/    # Database models
│   │   └── routes/    # API routes
│   ├── dist/          # Frontend build output (served in production)
│   └── server.js      # Main server file
├── frontend/          # React/Vite frontend
│   ├── src/
│   │   ├── components/ # React components
│   │   └── services/  # API service functions
│   └── vite.config.js # Vite configuration
└── vercel.json        # Vercel deployment configuration
```

## Local Development

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

### Setup

1. Install backend dependencies:
```bash
cd backend
npm install
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Create `.env` files:
   - `backend/.env` for development
   - `backend/.env.production` for production

4. Start development servers:
```bash
# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Start frontend
cd frontend
npm run dev
```

## Deployment to Vercel

This project is configured for deployment to Vercel with the following setup:

1. The `vercel.json` file defines:
   - Two build processes (frontend and backend)
   - Routing rules for API and static files

2. Environment variables needed:
   - `MONGODB_URI` - MongoDB connection string
   - `EMAIL_USER` - Email address for sending notifications
   - `EMAIL_PASS` - App password for email authentication
   - `PERSONAL_EMAIL` - Personal email for contact form notifications

3. The frontend builds to `backend/dist/` which is served by the backend in production.

## Troubleshooting

### 404 Errors
- Check that `vercel.json` is properly configured
- Ensure frontend builds correctly to `backend/dist/`
- Verify routing in `backend/server.js`

### Database Connection Issues
- Confirm `MONGODB_URI` is correct
- Check MongoDB Atlas IP whitelist if using cloud MongoDB
- Verify database credentials

### Email Sending Issues
- Use App Passwords for Gmail (not regular password)
- Enable 2-Factor Authentication on Google account
- Generate App Password at https://myaccount.google.com/apppasswords