# Team Task Manager

A full-stack web application for managing projects, assigning tasks, and tracking progress with role-based access control.

---

## 🚀 Live Deployment

🔗 Live App: team-task-manager-production-f137.up.railway.app

---

## 🎥 Demo Video

📺 Watch Demo: https://drive.google.com/YOUR-DEMO-VIDEO-LINK](https://drive.google.com/file/d/1FBov2tS56isqW1EkOFg5O5OemTg60z3r/view?usp=sharing

---

## 🚀 Features

### 🔐 Authentication

* Secure Signup/Login using JWT authentication
* Protected routes
* Role-based access system

### 👥 Role-Based Access Control

**Admin can:**

* Create projects
* Assign tasks
* Manage users
* Track project progress

**Member can:**

* View assigned projects
* Update task status
* Track personal task progress

---

### 📂 Project Management

* Create and manage projects
* Add members to projects
* Track progress per project

---

### 📋 Task Tracking

* Assign tasks to team members
* Set due dates
* Update task status:

  * To Do
  * In Progress
  * Done
* Identify overdue tasks

---

### 📊 Dashboard

Displays:

* Assigned tasks
* Project list
* Task progress status
* Overdue tasks

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* React Router DOM
* Axios
* Lucide Icons
* CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JWT (JSON Web Tokens)

---

## ⚙️ REST API Endpoints

### Authentication

POST /api/auth/signup
POST /api/auth/login

### Projects

GET /api/projects
POST /api/projects

### Tasks

POST /api/tasks
PUT /api/tasks/:id
GET /api/tasks

### Dashboard

GET /api/dashboard

---

## ⚙️ Local Setup Instructions

### Clone Repository

git clone https://github.com/YOUR-USERNAME/team-task-manager.git

---

### Backend Setup

cd backend
npm install

Create .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Run backend:

npm run dev

---

### Frontend Setup

cd frontend
npm install

Run frontend:

npm run dev

---

## 🌐 Deployment (Railway)

The application is deployed using Railway with:

* Backend service
* Frontend service
* MongoDB Atlas connection

Live deployment link available above.

---

## 👩‍💻 Role-Based Workflow Example

Admin:
Signup → Login → Create Project → Assign Tasks → Monitor Progress

Member:
Signup → Login → View Assigned Tasks → Update Status

---

## 📌 Assignment Requirement Checklist

✔ Authentication (JWT)
✔ Role-Based Access Control
✔ Project Management
✔ Task Assignment & Status Tracking
✔ Dashboard with Overdue Tasks
✔ REST APIs + MongoDB
✔ Railway Deployment
✔ README Documentation
✔ Demo Video


All implementation logic and integration were completed manually.
