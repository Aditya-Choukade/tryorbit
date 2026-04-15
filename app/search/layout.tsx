import { Suspense } from "react";
import SearchPage from "./page";

export default function SearchWrapper() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    }>
      <SearchPage />
    </Suspense>
  );
}
