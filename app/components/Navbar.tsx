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
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl flex justify-between items-center px-6 py-3 border-b border-outline shadow-sm transition-all">
      <div className="flex items-center gap-8">
        <Link href="/dashboard" className="flex items-center gap-2 group">
          <img src="/orbit-logo.png" alt="Orbit Logo" className="w-6 h-6 object-contain group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-xl font-black tracking-tighter text-slate-900 group-hover:text-primary transition-colors">Orbit</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${
                  isActive
                    ? "text-primary font-bold border-primary"
                    : "text-slate-500 font-medium hover:text-primary border-transparent"
                } text-sm font-['Inter'] relative py-1 border-b-2 transition-all flex items-center gap-1.5`}
              >
                {link.name}
                {link.badge && link.badge > 0 ? (
                  <span className={`text-[9px] px-1.5 rounded-full font-black ${isActive ? 'bg-primary/20 text-primary' : 'bg-primary/10 text-primary'}`}>
                    {link.badge}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex-1 max-w-xl px-8 relative">
        <form action="/search" className="flex items-center bg-surface-container rounded-2xl px-4 py-2 gap-3 transition-all focus-within:ring-2 focus-within:ring-primary/20 border border-transparent focus-within:border-primary/20 focus-within:bg-white group">
          <span className="material-symbols-outlined text-on-surface-variant text-xl group-focus-within:text-primary transition-colors">search</span>
          <input name="q" className="bg-transparent border-none focus:ring-0 text-xs w-full font-medium" placeholder="Search signals..." type="text"/>
        </form>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-4">
            <div className="hidden lg:block text-right">
              <p className="text-[10px] font-black tracking-widest text-on-surface-variant uppercase opacity-40">Active Pulse</p>
              <p className="text-[11px] font-bold text-on-surface truncate max-w-[120px]">{user.email}</p>
            </div>
            <button 
              onClick={handleLogout}
              className="bg-surface-container text-on-surface px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-50 hover:text-red-600 transition-all border border-outline-variant"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <Link href="/login" className="bg-on-surface text-surface px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-primary transition-all active:scale-95 shadow-lg shadow-black/5">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
