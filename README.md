# Team Task Manager

A full-stack web application for managing projects, assigning tasks, and tracking progress with role-based access control.

## 🚀 Features
- **Authentication**: Secure Signup and Login using JWT.
- **Role-Based Access**: 
  - **Admin**: Can create projects, add tasks, and manage users.
  - **Member**: Can view projects they are part of and update task statuses.
- **Project Management**: Create and manage projects.
- **Task Tracking**: Assign tasks, set due dates, and update statuses (To Do, In Progress, Done).
- **Dashboard**: View all your projects and tasks in an intuitive UI.

## 🛠️ Tech Stack
- **Frontend**: React (Vite), React Router DOM, Axios, Lucide React (Vanilla CSS for aesthetic styling).
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose).

## ⚙️ Local Setup

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd team-task-manager
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory with:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
   Run the backend:
   ```bash
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```
   Run the frontend:
   ```bash
   npm run dev
   ```

## 🌐 Deployment (Railway)

### Option 1: Deploying as Two Services
1. Connect your GitHub repo to Railway.
2. **Backend Service**:
   - Create a new service -> GitHub Repo.
   - Set Root Directory to `/backend`.
   - Add Environment Variables (`MONGO_URI`, `JWT_SECRET`, `PORT`).
3. **Frontend Service**:
   - Create a new service -> GitHub Repo.
   - Set Root Directory to `/frontend`.
   - In frontend's `package.json`, ensure the build command is `npm run build`.
   - Update API URLs in frontend to point to your new Railway backend URL instead of `http://localhost:5000`.

### Option 2: Deploying as a Monolith (Express serving React)
1. Build the React app: `cd frontend && npm run build`.
2. Move `frontend/dist` to `backend/public`.
3. In `backend/server.js`, add:
   ```javascript
   const path = require('path');
   app.use(express.static(path.join(__dirname, 'public')));
   app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
   ```
4. Deploy the `backend` folder to Railway.

## 📸 Screenshots
*(Add your screenshots or demo video link here)*
