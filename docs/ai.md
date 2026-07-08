# PRAGATI AI - AI Integration Details

The PRAGATI AI backend leverages the **Google Gemini API** (`@google/generative-ai` SDK) to automate governance workflows.

## Services Implemented (`src/services/aiService.js`)

### 1. Complaint Classification
When a citizen submits a text or voice complaint, `aiService.classifyComplaint` is triggered.
- **Model:** `gemini-1.5-flash`
- **Function:** Parses the raw text and extracts a structured JSON object containing:
  - `category` (e.g. Water, Roads)
  - `urgency` (Low to Critical)
  - `department`
  - `summary`

### 2. Image Analysis
When a citizen uploads a photo with their complaint.
- **Model:** `gemini-1.5-flash` (Multimodal capabilities)
- **Function:** Takes the base64 encoded image and returns recognized labels (e.g., "pothole", "flooding") and a visual `severity` score.

### 3. Conversational AI (Chatbot)
For the citizen dashboard assistant.
- **Model:** `gemini-1.5-flash`
- **Function:** Provides contextual answers to citizen queries regarding government schemes or temporary safety advice.

### 4. Governance Brief Generation
For the Admin Command Center.
- **Model:** `gemini-1.5-pro`
- **Function:** Takes the JSON payload of the top 10 unresolved critical issues and generates a human-readable, executive summary paragraph for city administrators.
