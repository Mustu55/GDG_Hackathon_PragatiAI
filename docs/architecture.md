# PRAGATI AI System Architecture

## Overview
PRAGATI AI operates on a modern, decoupled architecture:
- **Frontend**: React + Vite (Single Page Application)
- **Backend**: Node.js + Express (RESTful API)
- **Database**: MongoDB (NoSQL)
- **AI Layer**: Google Gemini API integration

## Directory Structure (Monorepo)
- `/frontend`: Contains the React application and UI components.
- `/backend`: Contains the Node.js server, MongoDB models, and API routes.
- `/docs`: Project documentation.
- `/uploads`: (Generated at runtime) Stores locally uploaded images and audio.

## Data Flow
1. **Citizen Submission**: A citizen uploads a complaint via the React frontend.
2. **API Reception**: The Express backend receives the payload (text + images via Multer).
3. **AI Processing**: The `aiService` calls the Google Gemini API to classify the complaint and analyze any images for severity.
4. **Database Storage**: The structured data (now containing AI-generated categories, urgency, and summaries) is saved to MongoDB.
5. **Dashboard Rendering**: Admin officers query the `/api/analytics` and `/api/issues` endpoints to view prioritized data and the AI-generated Governance Brief.
