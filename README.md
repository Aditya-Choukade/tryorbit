# 🚀 Orbit — Problem Intelligence Platform

## 🧠 Overview

Orbit is an AI-powered platform that discovers real-world problems from the internet (starting with Reddit) and transforms them into structured, actionable startup opportunities.

Instead of guessing startup ideas, Orbit helps users:
* Discover real problems people are facing
* Understand why those problems exist
* Get AI-powered insights
* Instantly start building solutions

---

## 🛠️ Tech Stack

* **Frontend:** Next.js 14, Tailwind CSS, TypeScript
* **Backend:** Node.js, Express.js (REST API)
* **AI Processing:** GitHub Models API (Llama/Gemini)
* **Database:** Supabase (PostgreSQL)

---

## 🚀 Getting Started (Local Setup)

This project is structured as a monorepo containing both the Next.js frontend and the Node.js backend.

### 1. Clone the Repository
```bash
git clone https://github.com/Aditya-Choukade/tryorbit.git
cd tryorbit
```

### 2. Database Setup (Supabase)
1. Create a new project on [Supabase](https://supabase.com/).
2. Navigate to the **SQL Editor** in your Supabase dashboard.
3. Copy and run the SQL schema found in `backend/schema.sql` to create the `problems` table and its indices.
4. Copy and run the SQL schema found in `backend/saved_problems.sql` to create the `saved_problems` bookmarks table.

### 3. Backend Setup
Open your terminal and navigate to the backend folder:
```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory:
```bash
touch .env
```
Populate the backend `.env` file:
```env
# Get from GitHub Developer Settings -> Personal Access Tokens
GITHUB_TOKEN=your_github_pat_token

# Get from Supabase Dashboard -> Project Settings -> API
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_service_role_key

# Used for frontend-backend authentication and ports
PORT=8000
INTERNAL_CRON_SECRET=orbit-cron-secret-2024-xK9mP
```

Start the backend server:
```bash
npm run dev
```
*(The backend will run on `http://localhost:8000`)*

### 4. Frontend Setup
Open a **new** terminal window and navigate to the project root (where the Next.js app lives):
```bash
# Assuming you are in the tryorbit root folder
npm install
```

Create a `.env.local` file inside the root directory:
```bash
touch .env.local
```
Populate the `.env.local` file:
```env
# Get from Supabase Dashboard -> Project Settings -> API
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# System config
BACKEND_URL=http://localhost:8000
INTERNAL_CRON_SECRET=orbit-cron-secret-2024-xK9mP
```

Start the frontend development server:
```bash
npm run dev
```
*(The frontend will run on `http://localhost:3000`)*

---

## 💡 How it Works

1. **Extraction**: The backend continuously scrapes business-related Subreddits (like `/r/SaaS`, `/r/Entrepreneur`, etc.)
2. **AI Processing**: Raw complaints are piped through an LLM to extract the core pain point, target industry, root cause, and "Orbit Score".
3. **Curation**: The fully structured JSON is saved deterministically to Supabase.
4. **Validation**: Founders can browse the Orbit feed, filter by industry, read real user verbatims, save problems, and click "Build This" to immediately start creating a solution for an actively validated market gap.

---

## 🤝 Contributing & Pushing Updates

If you are developing both the frontend and backend, remember that they live in the same repository.

**To push your updates to GitHub:**
```bash
# From the root directory (tryorbit)
git add .
git commit -m "feat: your update message"
git push origin main
```
