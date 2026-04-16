"use client";

import { useState, useEffect, useMemo } from "react";
import { createClient } from "@/app/utils/supabase/client";

export interface SavedProblem {
  id: string;
  problem: string;
  industry: string;
  summary: string;
  orbitScore: number;
  scoreLabel: string;
  subreddit: string;
  url: string;
  tags: string[];
  savedAt: string;
}

const STORAGE_KEY = "saved_problems";

export function useSavedProblems() {
  const [savedProblems, setSavedProblems] = useState<SavedProblem[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const supabase = createClient();

  // 1. Initialize user & initial load
  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await syncFromDb(session.user.id);
      } else {
        loadFromLocal();
      }
      setLoading(false);
    };

    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        syncFromDb(session.user.id);
      } else {
        loadFromLocal();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadFromLocal = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setSavedProblems(JSON.parse(stored));
      } catch (e) {
        setSavedProblems([]);
      }
    }
  };

  const syncFromDb = async (userId: string) => {
    const { data, error } = await supabase
      .from('saved_problems')
      .select('created_at, problems(*)')
      .eq('user_id', userId);

    if (error) {
      console.error("DB Sync error:", error);
      return;
    }

    const formatted: SavedProblem[] = (data || []).map((row: any) => ({
      ...row.problems,
      // Map back from snake_case if necessary, or ensure DB/API consistency
      // Our API uses camelCase, but Supabase raw rows are snake_case
      orbitScore: row.problems.orbit_score,
      scoreLabel: row.problems.score_label,
      savedAt: row.created_at
    }));

    setSavedProblems(formatted);
  };

  // 2. Toggle saving a problem
  const toggleSave = async (problem: any) => {
    const isAlreadySaved = savedProblems.some((p) => p.id === problem.id);
    
    if (user) {
      // Sync with DB
      if (isAlreadySaved) {
        const { error } = await supabase
          .from('saved_problems')
          .delete()
          .eq('user_id', user.id)
          .eq('problem_id', problem.id);
        
        if (!error) {
          setSavedProblems(prev => prev.filter(p => p.id !== problem.id));
        }
      } else {
        const { error } = await supabase
          .from('saved_problems')
          .insert({ user_id: user.id, problem_id: problem.id });
        
        if (!error) {
          setSavedProblems(prev => [...prev, { ...problem, savedAt: new Date().toISOString() }]);
        }
      }
    } else {
      // Local only
      let newSaved;
      if (isAlreadySaved) {
        newSaved = savedProblems.filter((p) => p.id !== problem.id);
      } else {
        newSaved = [...savedProblems, { ...problem, savedAt: new Date().toISOString() }];
      }
      setSavedProblems(newSaved);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSaved));
    }
  };

  // O(1) Set constraint for rapid render lookups
  const savedIdsSet = useMemo(() => new Set(savedProblems.map(p => p.id)), [savedProblems]);

  const isSaved = (id: string) => savedIdsSet.has(id);

  return { savedProblems, toggleSave, isSaved, user, loading };
}
