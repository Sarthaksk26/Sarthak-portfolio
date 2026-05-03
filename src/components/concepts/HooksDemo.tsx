import React, { useState, useEffect } from 'react';
import { Save, RefreshCw } from 'lucide-react';

// The custom hook (simulated inside the component for demonstration purposes)
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

export const HooksDemo = () => {
  const [name, setName] = useLocalStorage('demo_name', 'Visitor');
  const [theme, setTheme] = useLocalStorage('demo_theme', 'light');
  
  // To show the actual localStorage state visually
  const [rawStorage, setRawStorage] = useState('');

  useEffect(() => {
    const updateStorageView = () => {
      setRawStorage(JSON.stringify({
        demo_name: window.localStorage.getItem('demo_name'),
        demo_theme: window.localStorage.getItem('demo_theme')
      }, null, 2));
    };
    
    updateStorageView();
    window.addEventListener('storage', updateStorageView);
    return () => window.removeEventListener('storage', updateStorageView);
  }, [name, theme]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Interactive UI */}
      <div className="space-y-6 bg-slate-50 dark:bg-white/5 p-6 rounded-xl border border-slate-200 dark:border-white/10">
        <div className="flex items-center gap-2 mb-4 text-slate-900 dark:text-white font-bold">
          <Save size={18} className="text-accent" />
          Component State
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 bg-white dark:bg-[#0F0F0F] border border-slate-200 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-accent outline-none text-slate-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            App Theme Preference
          </label>
          <div className="flex gap-4">
            <button
              onClick={() => setTheme('light')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${theme === 'light' ? 'bg-slate-200 text-slate-900' : 'bg-transparent text-slate-500 hover:bg-slate-200/50'}`}
            >
              Light
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-transparent text-slate-500 hover:bg-slate-800/50'}`}
            >
              Dark
            </button>
          </div>
        </div>

        <div className="pt-4 mt-4 border-t border-slate-200 dark:border-white/10">
          <p className="text-xs text-slate-500 italic flex items-center gap-2">
            <RefreshCw size={12} />
            Try refreshing the page. The state will persist!
          </p>
        </div>
      </div>

      {/* Behind the scenes code/storage */}
      <div className="flex flex-col rounded-xl border border-slate-200 dark:border-white/10 bg-slate-900 overflow-hidden">
        <div className="bg-slate-800 p-3 text-xs font-mono text-slate-300 flex justify-between items-center border-b border-slate-700">
          <span>Browser LocalStorage</span>
        </div>
        <div className="p-4 flex-1 overflow-auto bg-[#0a0a0a]">
          <pre className="text-sm font-mono text-emerald-400">
            {rawStorage}
          </pre>
        </div>
        
        <div className="bg-slate-800 p-3 text-xs font-mono text-slate-300 border-t border-slate-700">
          <span>Hook Usage</span>
        </div>
        <div className="p-4 bg-[#0a0a0a]">
          <pre className="text-xs font-mono text-blue-400">
{`const [name, setName] = 
  useLocalStorage('demo_name', 'Visitor');

const [theme, setTheme] = 
  useLocalStorage('demo_theme', 'light');`}
          </pre>
        </div>
      </div>
    </div>
  );
};
