# 🚀 Task Manager Web Application

A full-stack task management web application built using **Next.js**, **Flask**, **Supabase**, and **Google OAuth**.  
This application allows users to create tasks, assign tasks to other users, and send real-time email notifications using Gmail integration.

---

# ✨ Features

## 🔐 Authentication
- Google OAuth Login
- Secure user authentication using Supabase Auth

## 📝 Task Management
- Create tasks
- View all created tasks
- Assign tasks to other users
- Mark tasks as completed

## 📧 Email Notifications
- Email notification when a task is created
- Email notification when a task is completed
- Gmail SMTP integration using Flask backend

## 🗄️ Database
- Supabase PostgreSQL database
- Row Level Security (RLS) enabled

---

# 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| Next.js | Frontend |
| TypeScript | Frontend Development |
| Tailwind CSS | UI Styling |
| Flask | Backend API |
| Supabase | Database & Authentication |
| Gmail SMTP | Email Notifications |
| Vercel | Frontend Deployment |
| Render | Backend Deployment |

---

# 📂 Project Structure

```bash
task-manager/
│
├── app/                 # Next.js App Router
├── components/          # Reusable UI Components
├── lib/                 # Supabase Client
├── backend/             # Flask Backend
│   ├── app.py
│   ├── gmail_service.py
│   └── .env
│
├── public/
├── .gitignore
├── package.json
└── README.md
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager
```

---

# 🔹 Frontend Setup

## Install Dependencies

```bash
npm install
```

## Run Frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:3000
```

---

# 🔹 Backend Setup

## Move to Backend Folder

```bash
cd backend
```

## Create Virtual Environment

```bash
python -m venv .venv
```

## Activate Virtual Environment

### Windows

```bash
.venv\Scripts\activate
```

### Mac/Linux

```bash
source .venv/bin/activate
```

---

## Install Python Dependencies

```bash
pip install flask flask-cors python-dotenv
```

---

## Run Flask Server

```bash
python app.py
```

Backend runs on:

```bash
http://127.0.0.1:5000
```

---

# 🔐 Environment Variables

Create a `.env` file inside the `backend` folder:

```env
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

Create a `.env.local` file in the root folder:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

# 📧 Email Notification Flow

```text
Task Created
      ↓
Assigned User Receives Email
      ↓
Task Completed
      ↓
Completion Email Sent
```

---

# 🌐 Deployment

## Frontend Deployment
- Deploy using **Vercel**

## Backend Deployment
- Deploy using **Render**

## Database
- Hosted on **Supabase**

---

# 📸 Core Functionalities

✅ Google Login  
✅ Task Creation  
✅ Task Assignment  
✅ Email Notifications  
✅ Task Completion  
✅ Supabase Integration  
✅ Flask API Integration  

---

# 👨‍💻 Author

### Ujjwal Roy

Full Stack Developer with strong interest in backend development and scalable web applications.

---

# 📜 License

This project is developed for educational and assignment purposes.
