import Link from "next/link";

export default function Page() {
  return (
    <div className="clean-canvas text-[#2D2926] font-body selection:bg-primary selection:text-white">
      {/* eslint-disable @next/next/no-img-element */}
      {/* TopAppBar */}
<nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4 rounded-full mt-6 mx-auto w-[90%] max-w-7xl bg-white/70 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(141,123,104,0.1)] border border-outline-variant/30">
<Link href="/" className="flex items-center gap-2 text-2xl font-black tracking-tighter text-stone-900">
  <img src="/orbit-logo.png" alt="Orbit Logo" className="w-6 h-6 object-contain" />
  Orbit
</Link>
<div className="flex items-center gap-6">
<span className="text-stone-500 font-label text-[10px] uppercase tracking-[0.3em] font-bold">Step 1 of 3</span>
<span className="material-symbols-outlined text-stone-500 hover:text-stone-900 cursor-pointer" data-icon="account_circle">account_circle</span>
</div>
</nav>
{/* Main Content Canvas */}
<main className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden pt-20">
{/* Subtle Glow Backgrounds */}
<div className="absolute inset-0 glow-overlay-light pointer-events-none"></div>
<div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-primary/5 blur-[120px] pointer-events-none"></div>
<div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none"></div>
{/* Hero Content Section */}
<div className="relative z-10 w-full max-w-6xl flex flex-col items-center text-center">
{/* Metadata Label */}
<div className="mb-8 flex items-center gap-3">
<span className="h-[1px] w-12 bg-primary"></span>
<span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary">Onboarding Step 1</span>
<span className="h-[1px] w-12 bg-primary"></span>
</div>
{/* Main Headline */}
<h1 className="font-headline font-black text-6xl md:text-[6.5rem] leading-[0.9] tracking-tighter orbit-gradient-text-light max-w-5xl mb-8">
            Let's build your <span className="font-light italic font-serif text-[#2D2926]/90">next</span> billion-dollar idea.
        </h1>
{/* Subtext */}
<p className="text-stone-500 text-lg md:text-2xl font-light max-w-2xl leading-relaxed mb-12">
            Orbit personalizes your discovery engine based on your expertise and interests.
        </p>
{/* CTA Container */}
<div className="flex flex-col items-center gap-6">
<Link href="/onboarding/interests" className="inline-flex group relative bg-[#FF7F6A] text-white px-12 py-6 rounded-full font-black text-xl tracking-tight transition-all active:scale-95 shadow-[0_20px_50px_rgba(255,127,106,0.3)] hover:shadow-[0_25px_60px_rgba(255,127,106,0.4)]">
                Start Onboarding
            </Link>
<div className="flex items-center gap-2 text-stone-400 font-label text-[10px] uppercase tracking-[0.3em] font-bold">
<span>Takes less than 2 minutes</span>
<span className="material-symbols-outlined text-[14px]" data-icon="bolt" style={{ fontVariationSettings: "\'FILL\' 1" }}>bolt</span>
</div>
</div>
</div>
{/* Floating Decorative Elements */}
<div className="absolute bottom-20 left-12 hidden lg:block max-w-[280px]">
<div className="bg-white/80 backdrop-blur-md p-8 rounded-xl border border-white/50 editorial-shadow">
<div className="flex items-center gap-4 mb-4">
<div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
<span className="material-symbols-outlined text-white text-xl" data-icon="insights">insights</span>
</div>
<div className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#2D2926]">Market Orbit</div>
</div>
<div className="h-2 w-full bg-stone-200 rounded-full mb-2 overflow-hidden">
<div className="h-full w-[85%] bg-primary rounded-full"></div>
</div>
<div className="text-[10px] text-stone-500 uppercase tracking-widest font-medium">85% Match for your profile</div>
</div>
</div>
<div className="absolute top-40 right-12 hidden lg:block">
<div className="bg-white/40 backdrop-blur-md p-2 rounded-2xl border border-white/60 editorial-shadow rotate-3 overflow-hidden">
<img className="w-64 h-48 object-cover rounded-xl opacity-90 grayscale-[0.2] hover:grayscale-0 transition-all duration-700" data-alt="close up of ethereal glowing data structures and nodes in 3D space with cinematic lighting and soft purple and blue hues" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_QVHZsUA6kFk_wV0Dgy_Thy0JLR-7Br1mnQ_7-Q8DnF0pXmnn-VEQ-N0Yr6UG1R15UCvCKGJP7SD6vJIKhq2OhrmwHO-L4-oN44YQ_RDFmbHeOEbHYWdZYqz2VlQZxGj3KSUb_q_CO7DIfvTzSUNAUPqSZ3zxOSBh-kAPniUZahj-FMTCve3ll7szurEql2vohN1okpsX0-p3Ov3r5KKwlSn66jEhaLOWvLVg3ZjJTXTtuxZH-hkaAAEc8F6aDqabYUx6XF_E87o"/>
</div>
</div>
</main>
    </div>
  );
}
