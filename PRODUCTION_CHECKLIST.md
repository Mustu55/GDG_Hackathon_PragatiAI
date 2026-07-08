# Production Readiness Checklist

Before deploying the PRAGATI AI application to a production environment, ensure the following steps have been completed:

## Backend Adjustments
- [ ] **Environment Variables**: Use real, secure values in your production environment (do not use `.env.sample`).
  - Set `NODE_ENV=production`.
  - Set `MONGO_URI` to a secure MongoDB cluster (e.g., MongoDB Atlas).
  - Generate a strong, secure, and random `JWT_SECRET`.
  - Ensure the `GEMINI_API_KEY` is properly configured.
- [ ] **CORS Settings**: Update CORS in `backend/src/app.js` to only allow requests from your specific production frontend URL (remove wildcard or development localhost origins).
- [ ] **Security Packages**: Ensure `helmet` and `express-rate-limit` are correctly configured to prevent abuse in production.

## Frontend Adjustments
- [ ] **API URL Configuration**: The frontend currently proxies requests to `http://localhost:5000` via Vite in development. For production, ensure the frontend points to the live backend URL. This can be configured by replacing the local URL or setting a `VITE_API_URL` environment variable if your API utility uses it.
- [ ] **Build Process**: Run `npm run build` in the `frontend/` directory to generate the optimized static assets in the `dist/` directory.

## Deployment Strategy
- Serve the frontend `dist/` folder via a CDN, Nginx, or a service like Vercel/Netlify.
- Host the backend Node.js application on a service like Render, Heroku, AWS, or a virtual private server, making sure the `PORT` matches the deployment configuration.
