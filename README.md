# CMADS (Computerized Monitoring and Detection System)

CMADS is a cutting-edge web application featuring a Brutalist-lite Cinematic UI designed for advanced monitoring and detection. The system is split into a React-based frontend and a Python (FastAPI/YOLO) backend.

## Project Structure

- `frontend/`: React application using Vite, TailwindCSS, and Google OAuth.
- `backend/`: Python API leveraging FastAPI and advanced computer vision tools like Ultralytics (YOLO) and OpenCV.

## Features

- **Google OAuth Integration**: Secure command console access using Google SSO.
- **Cinematic UI**: Custom-built brutalist and terminal-inspired design.
- **Computer Vision Ready**: Backend equipped with YOLOv8 and OpenCV for real-time monitoring.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [Python](https://www.python.org/downloads/) (3.9 or higher)
- [Git](https://git-scm.com/)

---

## 🚀 Deployment Guide

### 1. Frontend Hosting (Vercel)

The easiest way to host the frontend is using [Vercel](https://vercel.com/).

1.  **Push your code to GitHub** (follow the instructions in `installation.txt`).
2.  **Import your Repository** on Vercel.
3.  **Configure Environment Variables**:
    *   In Vercel Project Settings > Environment Variables, add:
    *   `VITE_GOOGLE_CLIENT_ID` = `your_google_client_id_here`
4.  **Deploy**. Vercel will automatically detect Vite and deploy your app.

### 2. Backend Hosting (Render)

For the Python backend, we recommend [Render](https://render.com/).

1.  **Create a New Web Service** on Render.
2.  **Connect your GitHub Repository**.
3.  **Configure Build & Start Commands**:
    *   **Root Directory**: `backend`
    *   **Build Command**: `pip install -r requirements.txt`
    *   **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4.  **Deploy**.

---

## 🔒 Google Cloud Console (Production Setup)

For Google Login to work on your hosted site, you **must** update your OAuth settings:

1.  Go to the [Google Cloud Console Credentials page](https://console.cloud.google.com/apis/credentials).
2.  Edit your **OAuth 2.0 Client ID**.
3.  Add your production URL (e.g., `https://cmads-app.vercel.app`) to:
    *   **Authorized JavaScript origins**
    *   **Authorized redirect URIs** (add `https://cmads-app.vercel.app/` with the trailing slash).
4.  Save changes (it may take a few minutes to update).

---

## Technologies Used

- **Frontend**: React 18, Vite, TailwindCSS, Lucide React, Recharts, React Router v7.
- **Backend**: Python, FastAPI, Ultralytics YOLOv8, OpenCV.
- **Auth**: `@react-oauth/google`

## Notes on Security
- Never commit your `.env` files to GitHub. The included `.gitignore` ensures they remain safely untracked on your local machine.

---

*This application is strictly for authorized personnel. Unauthorized access will be logged and reported.*
