# PRAGATI AI Backend Documentation

## 1. Authentication
All endpoints under `/api/auth`

- `POST /api/auth/register`: Register a new citizen or officer. Returns JWT.
- `POST /api/auth/login`: Authenticate and get JWT.
- `GET /api/auth/me`: Get current user profile (Requires Auth).

## 2. Complaints
All endpoints under `/api/complaints`

- `POST /api/complaints`: Submit a new complaint (Requires Auth). Accepts `multipart/form-data` with an `images` field for file uploads.
- `GET /api/complaints/my`: List complaints submitted by the logged-in citizen.
- `GET /api/complaints`: List all complaints (Admin/Officer only).

## 3. Community Issues
All endpoints under `/api/issues`

- `GET /api/issues`: List all merged community issues (Admin/Officer only).
- `GET /api/issues/:id`: Get details for a specific issue including linked complaints.
- `PUT /api/issues/:id`: Update issue status or assignment.

## 4. Analytics
All endpoints under `/api/analytics`

- `GET /api/analytics`: Returns stats for dashboard (total complaints, resolution rate, category breakdown, priority distribution). Admin/Officer only.

## 5. AI Services
All endpoints under `/api/ai`

- `POST /api/ai/chat`: Send a message to the AI civic assistant (Requires Auth).
- `GET /api/ai/governance-brief`: Generate a summarized brief of top critical issues (Admin/Officer only).
