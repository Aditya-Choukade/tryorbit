# 🚀 Orbit — Problem Intelligence Platform

## 🧠 Overview

Orbit is an AI-powered platform that discovers real-world problems from the internet (starting with Reddit) and transforms them into structured, actionable startup opportunities.

Instead of guessing startup ideas, Orbit helps users:

* Discover real problems people are facing
* Understand why those problems exist
* Get AI-powered insights
* Instantly start building solutions

---

## 🎯 Problem Statement

People constantly share complaints and frustrations online (Reddit, Twitter, reviews), but:

* These problems are scattered
* Hard to analyze at scale
* Not structured for founders

As a result:

* Founders struggle to find real problems
* Businesses miss valuable insights

---

## 💡 Solution

Orbit solves this by:

1. Collecting raw user complaints from platforms like Reddit
2. Using AI to extract structured insights
3. Presenting them as "problems worth building for"
4. Enabling users to instantly act on them

---

## ⚙️ Core Features (MVP)

### 1. Orbit Feed (Dashboard)

* Displays a list of trending problems
* Each problem includes:

  * Title
  * Industry
  * Orbit Score
  * Short summary

---

### 2. Problem Detail Page

* Deep dive into a selected problem:

  * Problem summary
  * Real user complaints (from Reddit)
  * Orbit Score
  * AI-generated insights (why this problem exists)
  * Opportunity insight (how to solve it)

---

### 3. Search

* Search problems by:

  * Keywords
  * Industry
* Returns filtered results using the same card UI

---

### 4. Build With AI

* Primary action button: "Build This"
* Redirects user to external builder (e.g., Emergent)
* Passes context:

  * Problem
  * Summary
  * Industry

---

### 5. Waitlist

* Collect user emails for early access
* Used for growth and launch

---

## 🧠 AI System (Core Logic)

### Input:

Raw Reddit post (title + content)

### Output:

Structured object:

{
"problem": "Frequent UPI payment failures",
"industry": "Fintech",
"summary": "Users face repeated payment failures causing frustration",
"tags": ["frustration", "urgent"],
}

---

### AI Responsibilities:

* Detect if the post is a complaint/problem
* Extract the core problem
* Categorize into industry
* Generate short summary
* (Optional) Generate insights

---

## 📊 Orbit Score (Basic Logic)

A simple scoring system to estimate how valuable a problem is.

### Inputs:

* Frequency (how often similar problems appear)
* Engagement (upvotes, comments)
* Sentiment (negative intensity)

### Example:

Score = (mentions + engagement + sentiment weight)

Output:

* 0–50 → Low
* 50–80 → Medium
* 80+ → High Opportunity

---

## 🏗️ System Architecture

### Frontend:

* Next.js (React)
* Tailwind CSS
* Pages:

  * Landing
  * Dashboard (Feed)
  * Problem Detail
  * Search Results

---

### Backend:

* Node.js / Python API

### Responsibilities:

* Fetch Reddit data
* Process data using AI
* Store structured problems
* Serve API to frontend

---

### Database:

Suggested: Supabase / PostgreSQL

#### Table: problems

* id
* problem
* summary
* industry
* source (Reddit)
* score
* tags
* created_at

---

### External Integrations:

* Reddit API (data source)
* OpenAI / Gemini (AI processing)
* Emergent (Build This redirect)

---

## 🔄 Data Flow

1. Fetch Reddit posts
2. Send to AI for processing
3. Receive structured problem
4. Store in database
5. Display in dashboard
6. User clicks → views details → clicks "Build This"

---

## 🧩 User Flow

1. User lands on Orbit
2. Views trending problems
3. Clicks a problem
4. Understands insights
5. Clicks "Build This"
6. Starts building a product

---

## 🎯 Product Philosophy

Orbit is not just a problem listing tool.

It is:
→ A decision-making engine for founders

Core loop:
Discover → Understand → Build

---

## 🚀 MVP Scope (Important)

Keep it simple:

* Only Reddit as source
* Basic AI extraction
* Simple scoring
* Minimal UI

Avoid:

* Over-engineering
* Complex analytics
* Too many features

---

## 📈 Future Scope (Not MVP)

* Multi-platform data (Twitter, reviews)
* Advanced scoring
* Alerts
* Idea validation
* Community features

---

## 🧠 Key Principle

Focus on:

* Real problems
* Clear insights
* Fast action

---

## 🏁 Goal

Help users answer one question:

👉 "What should I build?"

---

## 🔥 Tagline

"Discover problems worth building for"
