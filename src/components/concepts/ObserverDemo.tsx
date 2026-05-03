import React, { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';

import { cn } from '../../utils/cn';

export const ObserverDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleBoxes, setVisibleBoxes] = useState<number[]>([]);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const options = {
      root: containerRef.current,
      rootMargin: '0px',
      threshold: 0.5, // 50% of the item must be visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const targetId = Number(entry.target.getAttribute('data-id'));
        
        if (entry.isIntersecting) {
          setVisibleBoxes((prev) => [...new Set([...prev, targetId])]);
          setLogs((prev) => [`Box ${targetId} entered viewport`, ...prev].slice(0, 5));
        } else {
          setVisibleBoxes((prev) => prev.filter((id) => id !== targetId));
          setLogs((prev) => [`Box ${targetId} left viewport`, ...prev].slice(0, 5));
        }
      });
    }, options);

    const elements = document.querySelectorAll('.observer-box');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[400px]">
      {/* Scrollable Container */}
      <div 
        ref={containerRef}
        className="relative overflow-y-auto rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-4 space-y-32 snap-y snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: 'thin' }}
      >
        <div className="text-center text-slate-400 text-sm py-4">Scroll down ↓</div>
        
        {[1, 2, 3, 4, 5].map((id) => {
          const isVisible = visibleBoxes.includes(id);
          return (
            <div
              key={id}
              data-id={id}
              className={cn(
                "observer-box h-32 rounded-xl flex items-center justify-center font-display font-bold text-2xl transition-all duration-700 snap-center shadow-lg",
                isVisible 
                  ? "bg-accent text-white scale-100 opacity-100" 
                  : "bg-slate-200 dark:bg-slate-800 text-slate-400 scale-90 opacity-50"
              )}
            >
              Box {id}
            </div>
          );
        })}
        
        <div className="h-10"></div>
      </div>

      {/* Logs View */}
      <div className="flex flex-col rounded-xl border border-slate-200 dark:border-white/10 bg-slate-900 overflow-hidden">
        <div className="bg-slate-800 p-3 text-xs font-mono text-slate-300 flex justify-between items-center border-b border-slate-700">
          <span>IntersectionObserver Log</span>
          <span className="flex items-center gap-1 text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Active
          </span>
        </div>
        <div className="p-4 flex-1 overflow-y-auto space-y-2 font-mono text-sm">
          {logs.map((log, i) => (
            <div 
              key={i} 
              className={cn(
                "flex items-center gap-2 transition-all",
                i === 0 ? "text-white" : "text-slate-500",
                log.includes('entered') ? "text-emerald-400" : ""
              )}
            >
              {log.includes('entered') ? <Check size={14} /> : <span className="w-3.5" />}
              {log}
            </div>
          ))}
          {logs.length === 0 && (
            <div className="text-slate-600">Waiting for scroll events...</div>
          )}
        </div>
      </div>
    </div>
  );
};
