-- SQL to create the saved_problems table in Supabase
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS saved_problems (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL, -- Links to auth.users.id
  problem_id  UUID NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  
  -- Prevent saving the same problem multiple times for one user
  UNIQUE(user_id, problem_id)
);

-- Enable Row Level Security (RLS)
ALTER TABLE saved_problems ENABLE ROW LEVEL SECURITY;

-- Policies for user-specific access
CREATE POLICY "Users can view their own saved problems" 
  ON saved_problems FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own saved problems" 
  ON saved_problems FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved problems" 
  ON saved_problems FOR DELETE 
  USING (auth.uid() = user_id);
