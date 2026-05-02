# Data Analytics Platform

A full-stack web application for CSV data analysis, visualization, and reporting. Upload CSV files, analyze data statistics, visualize trends with interactive charts, and export reports to PDF.

## 🎯 Features

- **File Upload & Management**: Upload CSV files and manage your data uploads
- **Data Analysis**: Automatic statistical analysis including mean, median, min, max for numeric columns
- **Interactive Visualizations**: Real-time charts and graphs using Recharts
- **PDF Export**: Generate and download analysis reports in PDF format
- **Google OAuth Authentication**: Secure login using Google accounts
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Docker Support**: Easy deployment with Docker and Docker Compose

## 🏗️ Architecture

### Tech Stack

**Frontend:**
- Next.js 16.2.4 (React 19)
- Tailwind CSS + PostCSS
- Recharts (data visualization)
- jsPDF & jsPDF-autotable (PDF generation)
- NextAuth.js (Google OAuth authentication)

**Backend:**
- Express.js (REST API)
- PostgreSQL (database)
- Multer (file uploads)
- Python Flask Service (advanced data analysis)
- Axios (HTTP client)

**Infrastructure:**
- Docker & Docker Compose
- Nginx (reverse proxy)
- PostgreSQL 15

### Project Structure

```
.
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   └── app/
│   │       ├── page.js      # Main dashboard
│   │       ├── layout.js    # Layout wrapper
│   │       ├── providers.js # Auth providers
│   │       ├── globals.css  # Global styles
│   │       ├── login/       # Login page
│   │       └── api/auth/    # NextAuth routes
│   ├── package.json
│   ├── next.config.mjs
│   └── Dockerfile
│
├── backend/                  # Express.js API server
│   ├── index.js             # Main server file
│   ├── package.json
│   ├── Dockerfile
│   ├── python-service/      # Flask analysis service
│   │   └── analyze.py
│   └── uploads/             # Uploaded files directory
│
├── nginx/                    # Nginx configuration
│   └── nginx.conf
│
├── docker-compose.yml       # Multi-container orchestration
└── README.md

```

## 🚀 Getting Started

### Prerequisites

- Docker & Docker Compose (recommended)
- Node.js 18+ and npm (for local development)
- PostgreSQL 15+ (if running without Docker)
- Google OAuth credentials (for authentication)

### Installation & Setup

#### Using Docker Compose (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/AsifTalukdar/data-analytics-platform.git
   cd data-analytics-platform
   ```

2. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   NEXTAUTH_SECRET=your_secret_key_here
   NEXTAUTH_URL=http://localhost
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   
   DB_USER=postgres
   DB_PASSWORD=postgres
   DB_NAME=analytics_db
   DB_HOST=db
   DB_PORT=5432
   ```

3. **Start all services**
   ```bash
   docker-compose up --build
   ```

   Services will be available at:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Database: localhost:5432
   - Nginx: http://localhost:80

#### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/AsifTalukdar/data-analytics-platform.git
   cd data-analytics-platform
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   # Runs on http://localhost:3000
   ```

3. **Backend Setup**
   ```bash
   cd backend
   npm install
   node index.js
   # Runs on http://localhost:5000
   ```

4. **PostgreSQL Setup**
   - Ensure PostgreSQL is running on localhost:5432
   - Create database `analytics_db`
   - Database tables will be auto-created if needed

## 📖 API Documentation

### Upload File
- **Endpoint**: `POST /api/upload`
- **Body**: FormData with file field
- **Response**: `{ message: string, upload: object }`

### Get Uploads
- **Endpoint**: `GET /api/uploads`
- **Response**: Array of upload records

### Analyze CSV
- **Endpoint**: `POST /api/analyze`
- **Body**: FormData with file field
- **Response**: Statistical analysis with numeric summary

```json
{
  "rows": 1000,
  "columns": 5,
  "numeric_summary": {
    "column_name": {
      "min": 0,
      "max": 100,
      "mean": 50.5,
      "median": 50
    }
  }
}
```

## 🔐 Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials (Web application)
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `http://your-domain.com/api/auth/callback/google`
6. Copy Client ID and Client Secret to your `.env` file

## 🛠️ Development

### Build Frontend
```bash
cd frontend
npm run build
npm start
```

### Lint Code
```bash
cd frontend
npm run lint
```

### Access Database
```bash
psql -U postgres -d analytics_db -h localhost
```

## 📊 Features Breakdown

### CSV Upload
- Users can upload CSV files from the dashboard
- Files are stored in `backend/uploads/` and database records maintained
- Supports large files (shows warning for files > 5MB)

### Data Analysis
- Automatic parsing of CSV structure
- Numeric column detection and statistical calculation
- Min, max, mean, median calculations
- Support for quoted fields and complex CSV formats

### Visualization
- Bar charts for categorical comparisons
- Line charts for trend analysis
- Interactive Recharts components
- First 20 rows used for chart generation

### PDF Export
- Generate professional PDF reports
- Include tables and insights
- Auto-generated headers and footers

### Authentication
- Google OAuth 2.0 integration
- NextAuth.js session management
- Protected API endpoints

## 🐳 Docker Commands

```bash
# Build all services
docker-compose build

# Start services in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Remove volumes (WARNING: deletes data)
docker-compose down -v
```

## 🗄️ Database Schema

### uploads table
```sql
CREATE TABLE uploads (
  id SERIAL PRIMARY KEY,
  filename VARCHAR(255),
  originalname VARCHAR(255),
  size INTEGER,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXTAUTH_SECRET` | Secret for NextAuth.js session encryption | `your-secret-key-here` |
| `NEXTAUTH_URL` | Base URL for authentication | `http://localhost` |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | From Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret | From Google Cloud Console |
| `DB_USER` | PostgreSQL username | `postgres` |
| `DB_PASSWORD` | PostgreSQL password | `postgres` |
| `DB_NAME` | PostgreSQL database name | `analytics_db` |
| `DB_HOST` | PostgreSQL host | `db` (Docker) or `localhost` |
| `DB_PORT` | PostgreSQL port | `5432` |

## 🚨 Troubleshooting

### Backend cannot connect to database
- Ensure PostgreSQL is running
- Check database credentials in `.env`
- Verify database exists: `createdb analytics_db`

### Frontend cannot reach backend
- Ensure backend is running on port 5000
- Check CORS settings in Express app
- Verify firewall rules

### Google OAuth not working
- Verify credentials in `.env` file
- Check authorized redirect URIs in Google Cloud Console
- Ensure NEXTAUTH_URL matches your domain

### Large file uploads failing
- Increase Express payload limit in backend
- Check disk space for uploads directory
- Consider chunked upload for very large files

## 📈 Future Enhancements

- [ ] Advanced data filtering and sorting
- [ ] Data export to Excel, JSON formats
- [ ] Scheduled analysis reports
- [ ] Data validation rules
- [ ] User collaboration features
- [ ] Advanced statistical models
- [ ] Real-time data streaming support

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

**Asif Talukdar**

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

**Last Updated**: May 3, 2026

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
