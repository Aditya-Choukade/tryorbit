"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSavedProblems } from "@/app/hooks/useSavedProblems";
import { createClient } from "@/app/utils/supabase/client";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { savedProblems, user } = useSavedProblems();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const navLinks = [
    { name: "Feed", href: "/dashboard" },
    { name: "Validate Idea", href: "/validate" },
    { name: "Saved", href: "/saved", badge: savedProblems.length },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl flex items-center justify-between px-6 py-3 border-b border-stone-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all">
      <div className="flex flex-1 items-center gap-6 xl:gap-8">
        
        {/* Branding */}
        <Link href="/dashboard" className="flex items-center gap-2 group shrink-0">
          <img src="/orbit-logo.png" alt="Orbit Logo" className="w-6 h-6 object-contain group-hover:rotate-12 transition-transform duration-300" />
          <span className="hidden sm:block text-[17px] font-black tracking-tight text-stone-900 group-hover:text-primary transition-colors">Orbit</span>
        </Link>
        
        <div className="h-5 w-px bg-stone-200 hidden sm:block shrink-0"></div>
        
        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all ${
                  isActive
                    ? "bg-stone-100/80 text-stone-900"
                    : "text-stone-500 hover:bg-stone-50 hover:text-stone-900"
                }`}
              >
                {link.name}
                {link.badge !== undefined && link.badge > 0 && (
                  <span className={`flex items-center justify-center h-4 min-w-[16px] px-1 rounded-full text-[10px] font-bold ${
                    isActive ? "bg-stone-200/80 text-stone-700" : "bg-stone-100 text-stone-400"
                  }`}>
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Search Bar - Next to Nav Links */}
        <div className="hidden lg:flex items-center w-full max-w-sm mr-auto ml-2">
          <form action="/search" className="flex items-center w-full bg-stone-50 hover:bg-stone-100 border border-stone-200/50 rounded-lg px-3 py-1.5 gap-2 transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/40 group">
            <span className="material-symbols-outlined text-stone-400 text-[15px] group-focus-within:text-primary transition-colors">search</span>
            <input name="q" className="bg-transparent border-none focus:ring-0 text-[13px] w-full text-stone-900 placeholder:text-stone-400 tracking-wide" placeholder="Search signals or problems..." type="text"/>
            <div className="hidden xl:flex items-center gap-1 opacity-60">
              <kbd className="bg-white border border-stone-200 shadow-sm rounded px-1.5 py-0.5 text-[10px] font-medium font-sans text-stone-500">⌘</kbd>
              <kbd className="bg-white border border-stone-200 shadow-sm rounded px-1.5 py-0.5 text-[10px] font-medium font-sans text-stone-500">K</kbd>
            </div>
          </form>
        </div>
      </div>

      {/* Right: User Config */}
      <div className="flex items-center justify-end gap-5">
        {user ? (
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex flex-col items-end shrink-0">
              <span className="text-[13px] font-medium text-stone-900 truncate max-w-[150px]">{user.email}</span>
              <span className="text-[10px] font-medium text-emerald-600 flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Connected</span>
            </div>
            <div className="h-6 w-px bg-stone-200 hidden lg:block"></div>
            <button 
              onClick={handleLogout}
              className="group flex items-center justify-center w-8 h-8 rounded-lg hover:bg-red-50 text-stone-400 hover:text-red-500 transition-colors active:scale-95"
              title="Sign Out"
            >
              <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-0.5 transition-transform">logout</span>
            </button>
          </div>
        ) : (
          <Link href="/login" className="flex items-center justify-center bg-stone-900 text-white px-4 py-2 rounded-lg font-medium text-[13px] hover:bg-stone-800 transition-all active:scale-95 shadow-sm">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
