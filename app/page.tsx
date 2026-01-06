import { ManualTrigger } from "@/components/ManualTrigger";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4 sm:p-6 md:p-24">
        <div className="w-full max-w-4xl space-y-8 md:space-y-12">
          {/* Header */}
          <div className="space-y-4 md:space-y-6 text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs md:text-sm text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              System Active
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
              Bot Control Center
            </h1>
            
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-zinc-400 leading-relaxed px-4">
              Automated Telegram reports for daily submission tracking.
              Monitor status, trigger manual reports, and manage automation from one central hub.
            </p>
          </div>

          {/* Control Card */}
          <div className="mx-auto w-full max-w-xs sm:max-w-md p-[1px] rounded-3xl bg-gradient-to-b from-white/10 to-transparent animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
            <div className="relative h-full w-full rounded-3xl bg-black/90 backdrop-blur-xl border border-white/5 p-6 md:p-8 text-center shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-3xl pointer-events-none" />
              
              <div className="relative space-y-6">
                 <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                 </div>

                 <div>
                    <h2 className="text-xl font-semibold text-white">Manual Override</h2>
                    <p className="mt-2 text-sm text-zinc-500">
                      Instantly trigger the missing submissions check for yesterday's date.
                    </p>
                 </div>

                 <ManualTrigger />
                 
                 <div className="pt-4 border-t border-white/5">
                    <div className="flex justify-between text-xs text-zinc-600">
                       <span>Last Auto-Run: 09:00 AM</span>
                       <span>Status: Idle</span>
                    </div>
                 </div>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="text-center text-sm text-zinc-600 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
             <p>Powered by Next.js & Telegram Bot API</p>
          </div>
        </div>
      </main>
    </div>
  );
}
