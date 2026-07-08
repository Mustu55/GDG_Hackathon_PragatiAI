# Google Technologies Used in PRAGATI AI

This project heavily utilizes the **Google Gemini API** (`@google/generative-ai`) to power its AI capabilities, bringing intelligent analysis and automation to civic governance.

Here is a breakdown of how Google technologies are integrated into the platform:

## 1. Automated Issue Classification (Gemini 2.0 Flash)
When citizens submit complaints, the Gemini API is used to automatically extract structured data from their unstructured text. It identifies the **category** of the issue (e.g., Water & Sanitation, Roads, Electricity), the **urgency/severity**, the responsible **department**, and the exact **location** if mentioned. This removes manual triage work for government officers.

## 2. Image Severity Analysis (Gemini 2.0 Flash - Vision)
When users upload photos of civic issues (like a pothole or a broken streetlight), the system sends the image data to Gemini's multi-modal endpoint. The AI analyzes the photo, extracts relevant **keywords (labels)**, assesses the **visual severity**, and generates a **brief description** of the visible problem.

## 3. Conversational AI Assistant (Gemini 2.0 Flash)
The platform features an intelligent, friendly chatbot for citizens. The AI is fed context about the platform and the citizen's recent complaints. It can guide citizens on how to draft effective complaints, provide status updates, and answer questions about government schemes and benefits using natural, conversational language.

## 4. Daily Governance Briefs (Gemini 2.0 Flash)
For city administrators and government officers, the system aggregates current open issues and feeds them to Gemini to generate an executive-level **Daily Governance Brief**. This brief highlights critical hotspots, overall trends, and suggests immediate administrative actions to take.

## 5. Automated Translation
The Gemini API also provides on-the-fly translation for civic reports, allowing citizens to communicate in their native language while administrators view standardized reports.

---
*Note: The platform is built using the official `@google/generative-ai` SDK.*
