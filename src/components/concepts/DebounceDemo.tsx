import React, { useState, useEffect, useRef } from 'react';

export const DebounceDemo = () => {
  const [rawText, setRawText] = useState('');
  const [rawCount, setRawCount] = useState(0);
  
  const [debouncedText, setDebouncedText] = useState('');
  const [debounceCount, setDebounceCount] = useState(0);
  
  const [throttledText, setThrottledText] = useState('');
  const [throttleCount, setThrottleCount] = useState(0);

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedText(rawText);
      if (rawText !== '') setDebounceCount(c => c + 1);
    }, 500);
    return () => clearTimeout(handler);
  }, [rawText]);

  // Throttle logic
  const lastRan = useRef(Date.now());
  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= 1000) {
        setThrottledText(rawText);
        if (rawText !== '') setThrottleCount(c => c + 1);
        lastRan.current = Date.now();
      }
    }, 1000 - (Date.now() - lastRan.current));
    return () => clearTimeout(handler);
  }, [rawText]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRawText(e.target.value);
    setRawCount(c => c + 1);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Type continuously to see the difference
        </label>
        <input
          type="text"
          value={rawText}
          onChange={handleChange}
          placeholder="Start typing..."
          className="w-full px-4 py-3 bg-white dark:bg-[#0F0F0F] border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all text-slate-900 dark:text-white"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Raw Events</div>
          <div className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-2">{rawCount}</div>
          <div className="text-sm text-slate-600 dark:text-slate-400 truncate">"{rawText}"</div>
          <div className="mt-2 text-[10px] text-slate-400">Updates on every keystroke</div>
        </div>
        
        <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20">
          <div className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-1">Debounced (500ms)</div>
          <div className="text-3xl font-display font-bold text-indigo-600 dark:text-indigo-400 mb-2">{debounceCount}</div>
          <div className="text-sm text-indigo-700 dark:text-indigo-300 truncate">"{debouncedText}"</div>
          <div className="mt-2 text-[10px] text-indigo-400/80">Updates 500ms after you STOP typing</div>
        </div>

        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
          <div className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-1">Throttled (1000ms)</div>
          <div className="text-3xl font-display font-bold text-emerald-600 dark:text-emerald-400 mb-2">{throttleCount}</div>
          <div className="text-sm text-emerald-700 dark:text-emerald-300 truncate">"{throttledText}"</div>
          <div className="mt-2 text-[10px] text-emerald-400/80">Updates exactly every 1 second</div>
        </div>
      </div>
    </div>
  );
};
