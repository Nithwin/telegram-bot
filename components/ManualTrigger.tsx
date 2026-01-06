"use client";

import { useState } from "react";

export function ManualTrigger() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleTrigger = async () => {
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/api/cron");
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Failed to trigger report");

      setStatus({
        success: true,
        message: data.message || "Report generated successfully!",
      });
    } catch (error: any) {
      setStatus({
        success: false,
        message: error.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={handleTrigger}
        disabled={loading}
        className={`group relative flex h-12 items-center justify-center gap-2 rounded-full px-8 py-3 font-semibold text-white transition-all 
          ${loading ? 'bg-zinc-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20 active:scale-95'}
        `}
      >
        {loading ? (
           <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
        ) : (
          <span>Run Manual Report</span>
        )}
      </button>

      {status && (
        <div
          className={`mt-4 rounded-lg px-4 py-2 text-sm font-medium animate-in fade-in slide-in-from-top-2
            ${status.success ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}
          `}
        >
          {status.message}
        </div>
      )}
    </div>
  );
}
