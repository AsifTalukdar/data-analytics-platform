# Data Analytics Platform

A full-stack web application for uploading, analyzing, and visualizing CSV data with Google authentication.

## 📋 Project Overview

This is a data analytics platform where users can:
- **Authenticate** using Google OAuth
- **Upload CSV files** securely
- **Analyze data** with automatic statistical calculations
- **Visualize data** with interactive charts and tables
- **View insights** including min, max, mean, and median values for numeric columns

## 🏗️ Architecture

### **Frontend (Next.js + React)**
- **Location**: `/frontend`
- **Tech Stack**: 
  - Next.js 16.2.4
  - React 19.2.4
  - Tailwind CSS 4
  - Recharts (for charts)
  - NextAuth 4.24.14 (Google OAuth)
  - Babel React Compiler

**Key Features:**
- Login page with Google authentication
- Main dashboard for file uploads
- CSV preview in table format
- Interactive bar and line charts for data visualization
- Real-time data analysis display
- Session management with NextAuth

### **Backend (Express.js + PostgreSQL)**
- **Location**: `/backend`
- **Tech Stack**:
  - Express.js 5.2.1
  - PostgreSQL (pg)
  - Multer (file upload handling)
  - CORS enabled
  - Dotenv (environment variables)

**API Endpoints:**
1. `GET /` - Health check
2. `POST /api/upload` - Upload CSV file to database
   - Saves file metadata (filename, size) to PostgreSQL
   - Stores file in `/uploads` directory
3. `GET /api/uploads` - Retrieve all uploaded files
4. `POST /api/analyze` - Analyze CSV file
   - Parses CSV headers and data
   - Calculates min, max, mean, median for numeric columns
   - Returns statistics

**Database Connection:**
- PostgreSQL database: `analytics_db`
- User: postgres
- Host: localhost
- Port: 5432

### **Python Analytics Service**
- **Location**: `/backend/python-service`
- **Tech Stack**:
  - Flask
  - Pandas
  - CORS enabled

**Endpoint:**
- `POST /analyze` - Advanced data analysis
  - Uses pandas for efficient data processing
  - Returns: row count, column count, column info, numeric summary, and data preview
  - Runs on port 6000

### **File Upload Storage**
- **Location**: `/backend/uploads`
- Contains 30+ CSV files uploaded during testing/development
- Files named with timestamp + original filename (e.g., `1777366061898-sample.csv`)

## 🚀 Getting Started

### Prerequisites
- Node.js
- PostgreSQL
- Python 3.x

### Setup Frontend
```bash
cd frontend
npm install
npm run dev
# Frontend runs on http://localhost:3000
```

### Setup Backend
```bash
cd backend
npm install
node index.js
# Backend runs on http://localhost:5000
```

### Setup Python Service
```bash
cd backend/python-service
pip install flask flask-cors pandas
python analyze.py
# Python service runs on http://localhost:6000
```

## 📊 Workflow (Step-by-Step)

1. **User Starts App**: Opens `http://localhost:3000`
2. **Authentication**: User clicks "Sign in with Google"
3. **Dashboard**: After login, user lands on main dashboard
4. **File Upload**: User selects a CSV file to upload
5. **Frontend Processing**:
   - File is read client-side
   - CSV headers and rows are parsed
   - Table preview is displayed
   - Chart data is prepared
6. **Backend Processing**:
   - File is sent to `/api/analyze` endpoint
   - Express.js parses CSV and calculates statistics
   - Results are returned to frontend
7. **Display Results**:
   - Numeric statistics (min, max, mean, median) are shown
   - Data is displayed in an interactive table
   - Charts (bar/line) visualize the data
   - Upload history can be retrieved

## 🔐 Authentication

- **Provider**: Google OAuth (NextAuth.js)
- **Session Management**: SessionProvider wraps the app
- **Protected Routes**: Main dashboard requires authentication
- Unauthenticated users are redirected to login page

## 📁 Project Structure

```
data-analytics-platform/
├── backend/
│   ├── index.js (Express server + API endpoints)
│   ├── package.json
│   ├── python-service/
│   │   └── analyze.py (Flask service)
│   └── uploads/ (CSV files storage)
│
└── frontend/
    ├── src/
    │   └── app/
    │       ├── page.js (Main dashboard)
    │       ├── layout.js
    │       ├── providers.js (NextAuth SessionProvider)
    │       ├── login/
    │       │   └── page.js (Login page)
    │       ├── api/
    │       │   └── auth/[...nextauth]/route.js (NextAuth config)
    │       └── globals.css
    ├── package.json
    ├── next.config.mjs
    └── README.md
```

## 🎨 UI Components

- **Login Page**: Centered card with Google sign-in button
- **Dashboard**: File upload area, data preview table, statistics panel
- **Charts**: Recharts library for interactive visualizations
- **Styling**: Tailwind CSS for responsive design

## 🔧 Technologies Used

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js, React, Tailwind CSS, Recharts |
| Backend | Express.js, Node.js |
| Database | PostgreSQL |
| Analytics | Python, Flask, Pandas |
| Auth | NextAuth with Google OAuth |
| File Upload | Multer |

## 📝 Notes

- All CSV files are stored in `/backend/uploads/` with timestamp prefixes
- Database connection requires PostgreSQL running locally
- CORS is enabled for frontend-backend communication
- Session tokens are managed via NextAuth
- Python service provides enhanced data analysis capabilities

## 🚦 Running the Application

1. Start PostgreSQL
2. Run `node index.js` in backend folder
3. Run `python analyze.py` in python-service folder
4. Run `npm run dev` in frontend folder
5. Open `http://localhost:3000` in browser
6. Sign in with Google and start uploading CSV files!
