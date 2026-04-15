"use client";

import { useState, useEffect } from "react";

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

export function useSavedProblems() {
  const [savedProblems, setSavedProblems] = useState<SavedProblem[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("saved_problems");
    if (stored) {
      try {
        setSavedProblems(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse saved problems", e);
      }
    }
  }, []);

  // Toggle saving a problem
  const toggleSave = (problem: any) => {
    const isSaved = savedProblems.some((p) => p.id === problem.id);
    let newSaved;

    if (isSaved) {
      newSaved = savedProblems.filter((p) => p.id !== problem.id);
    } else {
      newSaved = [
        ...savedProblems,
        {
          ...problem,
          savedAt: new Date().toISOString(),
        },
      ];
    }

    setSavedProblems(newSaved);
    localStorage.setItem("saved_problems", JSON.stringify(newSaved));
  };

  const isSaved = (id: string) => savedProblems.some((p) => p.id === id);

  return { savedProblems, toggleSave, isSaved };
}
