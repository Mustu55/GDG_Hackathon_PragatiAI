# PRAGATI AI - Complete Tech Stack

This document outlines the complete technology stack used to build the PRAGATI AI platform. The project is structured as a full-stack monorepo with a React frontend and a Node.js backend.

## 🎨 Frontend Stack
The frontend is a modern, fast, and responsive Single Page Application (SPA).

- **Core Framework:** [React 19](https://react.dev/)
- **Build Tool / Bundler:** [Vite 8](https://vitejs.dev/)
- **Routing:** [React Router v7](https://reactrouter.com/)
- **Styling & UI:**
  - [Tailwind CSS](https://tailwindcss.com/) (v3) via PostCSS
  - [Framer Motion](https://www.framer.com/motion/) (Animations & Transitions)
  - [Lucide React](https://lucide.dev/) (Iconography)
  - `clsx` & `tailwind-merge` (Dynamic class management)
  - [React Toastify](https://fkhadra.github.io/react-toastify/) (Notifications)
- **Forms & Validation:**
  - [React Hook Form](https://react-hook-form.com/)
  - [Zod](https://zod.dev/) (Schema validation & resolvers)
- **Maps & Geolocation:**
  - [Leaflet](https://leafletjs.com/) & [React-Leaflet](https://react-leaflet.js.org/)
- **Document Generation:**
  - `jspdf` & `jspdf-autotable` (For generating PDF reports)
- **Utilities & Tooling:**
  - `date-fns` (Date manipulation)
  - `oxlint` (Ultra-fast JavaScript linter)

## ⚙️ Backend Stack
The backend is a robust REST API that handles data management, security, and AI integrations.

- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/) (v5)
- **Database:** [MongoDB](https://www.mongodb.com/)
- **ODM (Object Data Modeling):** [Mongoose](https://mongoosejs.com/)
- **AI Integration:** 
  - `@google/generative-ai` (Google Gemini API for text, vision, and chat)
- **Security & Authentication:**
  - `jsonwebtoken` (JWT for stateless authentication)
  - `bcryptjs` (Password hashing)
  - `helmet` (HTTP header security)
  - `cors` (Cross-Origin Resource Sharing)
  - `express-rate-limit` (API rate limiting)
- **Data Validation:**
  - [Zod](https://zod.dev/) (Input validation)
- **File Uploads:**
  - `multer` (Handling multipart/form-data for image uploads)
- **Logging & Monitoring:**
  - `winston` (Advanced logging)
- **Environment Management:**
  - `dotenv` (Environment variable injection)

## 🚀 Deployment & Version Control
- **Version Control:** Git & GitHub
- **Package Manager:** npm
