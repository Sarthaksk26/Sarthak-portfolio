import React, { useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';

import { cn } from '../../utils/cn';

type Task = { id: string; name: string; type: 'sync' | 'async' | 'micro' };

export const EventLoopDemo = () => {
  const [callStack, setCallStack] = useState<Task[]>([]);
  const [webApi, setWebApi] = useState<Task[]>([]);
  const [taskQueue, setTaskQueue] = useState<Task[]>([]);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const reset = () => {
    setCallStack([]);
    setWebApi([]);
    setTaskQueue([]);
    setConsoleOutput([]);
    setIsRunning(false);
  };

  const runSimulation = async () => {
    if (isRunning) return;
    setIsRunning(true);
    reset();

    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

    // Simulation steps:
    // 1. console.log('Start')
    setCallStack([{ id: '1', name: "console.log('Start')", type: 'sync' }]);
    await delay(800);
    setConsoleOutput(p => [...p, 'Start']);
    setCallStack([]);
    await delay(400);

    // 2. setTimeout(() => console.log('Timeout'), 0)
    setCallStack([{ id: '2', name: "setTimeout(cb, 0)", type: 'async' }]);
    await delay(800);
    setCallStack([]);
    setWebApi([{ id: 'cb1', name: "cb: log('Timeout')", type: 'async' }]);
    await delay(800);
    setWebApi([]);
    setTaskQueue([{ id: 'cb1', name: "cb: log('Timeout')", type: 'async' }]);
    await delay(400);

    // 3. Promise.resolve().then(() => console.log('Promise'))
    setCallStack([{ id: '3', name: "Promise.then(cb)", type: 'micro' }]);
    await delay(800);
    setCallStack([]);
    // Skipping microtask queue for visual simplicity, executing it immediately before next macrotask
    setCallStack([{ id: 'cb2', name: "cb: log('Promise')", type: 'micro' }]);
    await delay(800);
    setConsoleOutput(p => [...p, 'Promise']);
    setCallStack([]);
    await delay(400);

    // 4. console.log('End')
    setCallStack([{ id: '4', name: "console.log('End')", type: 'sync' }]);
    await delay(800);
    setConsoleOutput(p => [...p, 'End']);
    setCallStack([]);
    await delay(400);

    // 5. Event loop moves Task Queue to Call Stack
    const task = { id: 'cb1', name: "cb: log('Timeout')", type: 'async' };
    setTaskQueue([]);
    setCallStack([task]);
    await delay(800);
    setConsoleOutput(p => [...p, 'Timeout']);
    setCallStack([]);

    setIsRunning(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Code Area */}
      <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-900 overflow-hidden flex flex-col">
        <div className="bg-slate-800 p-3 text-xs font-mono text-slate-300 border-b border-slate-700 flex justify-between items-center">
          <span>index.js</span>
          <button 
            onClick={isRunning ? reset : runSimulation}
            className={cn(
              "flex items-center gap-1 px-3 py-1 rounded bg-accent text-white hover:bg-accent/80 transition-colors",
              isRunning && "bg-slate-600 hover:bg-slate-500"
            )}
          >
            {isRunning ? <RotateCcw size={14} /> : <Play size={14} />}
            {isRunning ? "Reset" : "Run Code"}
          </button>
        </div>
        <div className="p-4 bg-[#0a0a0a] font-mono text-sm leading-relaxed flex-1">
          <div className="text-white">console.log(<span className="text-emerald-400">'Start'</span>);</div>
          <br/>
          <div className="text-blue-400">setTimeout(<span className="text-white">() =&gt;</span> {'{'}</div>
          <div className="pl-4 text-white">console.log(<span className="text-emerald-400">'Timeout'</span>);</div>
          <div className="text-blue-400">{'}'}, <span className="text-purple-400">0</span>);</div>
          <br/>
          <div className="text-yellow-400">Promise.resolve().then(<span className="text-white">() =&gt;</span> {'{'}</div>
          <div className="pl-4 text-white">console.log(<span className="text-emerald-400">'Promise'</span>);</div>
          <div className="text-yellow-400">{'}'});</div>
          <br/>
          <div className="text-white">console.log(<span className="text-emerald-400">'End'</span>);</div>
        </div>
      </div>

      {/* Visualizer Areas */}
      <div className="lg:col-span-2 grid grid-cols-2 gap-4">
        {/* Call Stack */}
        <div className="border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-white/5 p-4 flex flex-col">
          <h4 className="text-sm font-bold text-slate-500 mb-4 text-center uppercase tracking-widest">Call Stack</h4>
          <div className="flex-1 flex flex-col-reverse gap-2 border-x-2 border-b-2 border-slate-300 dark:border-slate-700 p-2 min-h-[150px]">
            {callStack.map(t => (
              <div key={t.id} className="bg-accent text-white p-2 rounded text-center text-sm font-mono animate-fade-slide-up shadow-md">
                {t.name}
              </div>
            ))}
          </div>
        </div>

        {/* Web APIs */}
        <div className="border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-white/5 p-4 flex flex-col">
          <h4 className="text-sm font-bold text-slate-500 mb-4 text-center uppercase tracking-widest">Web APIs</h4>
          <div className="flex-1 border-2 border-dashed border-slate-300 dark:border-slate-700 p-2 min-h-[150px] rounded-lg flex flex-col gap-2">
            {webApi.map(t => (
              <div key={t.id} className="bg-blue-500 text-white p-2 rounded text-center text-sm font-mono animate-fade-in">
                {t.name}
              </div>
            ))}
          </div>
        </div>

        {/* Task Queue */}
        <div className="border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-white/5 p-4 flex flex-col col-span-2">
          <h4 className="text-sm font-bold text-slate-500 mb-4 text-center uppercase tracking-widest">Task Queue</h4>
          <div className="flex gap-2 border-2 border-slate-300 dark:border-slate-700 p-2 min-h-[60px] rounded-lg overflow-x-auto">
            {taskQueue.map(t => (
              <div key={t.id} className="bg-purple-500 text-white p-2 rounded text-center text-sm font-mono animate-fade-in whitespace-nowrap">
                {t.name}
              </div>
            ))}
          </div>
        </div>

        {/* Console Output */}
        <div className="col-span-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-900 overflow-hidden mt-2">
          <div className="bg-slate-800 p-2 text-xs font-mono text-slate-300 border-b border-slate-700">
            Console
          </div>
          <div className="p-3 bg-[#0a0a0a] font-mono text-sm min-h-[80px]">
            {consoleOutput.map((log, i) => (
              <div key={i} className="text-slate-300">&gt; {log}</div>
            ))}
            {!consoleOutput.length && <span className="text-slate-600 italic">Waiting for output...</span>}
          </div>
        </div>
      </div>
    </div>
  );
};
