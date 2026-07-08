# PRAGATI AI - Voice-to-Decision Governance Agent

PRAGATI AI is an AI-powered Governance Layer that transforms fragmented citizen feedback into structured, evidence-based decision intelligence.

## Features
- **Citizen Portal**: Submit complaints (text/audio/images), view status, chat with AI assistant.
- **Admin Command Center**: View AI-prioritized issues, geographic hotspots, analytics, and auto-generated daily governance briefs.
- **AI Engine**: Powered by Google Gemini for auto-classification, image severity analysis, and conversational AI.

## Project Structure
This project is structured as a monorepo:
- `frontend/`: React + Vite + Tailwind application.
- `backend/`: Node.js + Express + MongoDB custom backend with Gemini integration.

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (Running locally or MongoDB Atlas URL)
- Google Gemini API Key

### Backend Setup
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Configure environment: Open `backend/.env` and insert your `MONGO_URI`, `JWT_SECRET`, and `GEMINI_API_KEY`.
4. Start the server: `npm run dev` (Runs on port 5000)

### Frontend Setup
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev` (Runs on port 5173)

*Note: Frontend API calls need to be pointed to `http://localhost:5000/api` in production/integration phase.*
