# Deployment Guide

This guide covers how to deploy the PRAGATI AI platform for production.

## Prerequisites

- Node.js v18+
- MongoDB instance (MongoDB Atlas recommended)
- Google Gemini API Key

## Backend Deployment

1. **Environment Variables**: Create a `.env` file in your production environment matching `backend/.env`.
2. **Install Dependencies**: `npm ci --production` in the `backend/` directory.
3. **Start the Server**: Use a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start src/index.js --name "pragati-api"
   ```

## Frontend Deployment

1. **Environment Variables**: Configure Vite environment variables for production (e.g. `VITE_API_URL`).
2. **Build**: Run `npm run build` in the `frontend/` directory.
3. **Serve**: Host the `dist/` folder on a static hosting service like Vercel, Netlify, or Nginx.

## File Uploads

For production, the local `uploads/` folder strategy is not scalable for multi-instance deployments. It is recommended to replace Multer's local disk storage with AWS S3 or Google Cloud Storage using `multer-s3` or similar.
