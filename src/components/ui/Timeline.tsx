import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Briefcase, GraduationCap } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  type: 'work' | 'education';
  highlights: string[];
  tech: string[];
}

const TimelineItem = React.memo(({ item, isLeft }: { item: Experience; isLeft: boolean }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const reveal = useScrollReveal();

  return (
    <div
      className={`relative mb-12 md:mb-24 flex justify-start ${isLeft ? 'md:justify-start' : 'md:justify-end'} items-center w-full`}
    >
      {/* Connector Dot */}
      <div className="absolute left-[19px] md:left-1/2 md:-translate-x-1/2 z-20">
        <div
          className={`w-10 h-10 rounded-full border-4 border-black flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)] ${item.type === 'work' ? 'bg-accent' : 'bg-secondary'} animate-glow-pulse`}
          aria-hidden="true"
        >
          {item.type === 'work' ? (
            <Briefcase size={18} className="text-white" />
          ) : (
            <GraduationCap size={18} className="text-white" />
          )}
        </div>
      </div>

      {/* Content Card */}
      <div
        ref={reveal}
        data-reveal={isLeft ? 'left' : 'right'}
        className={`w-[calc(100%-60px)] md:w-[42%] ml-14 md:ml-0 ${isLeft ? 'md:mr-auto' : 'md:ml-auto'}`}
      >
        <div className="glass p-6 sm:p-8 rounded-[2rem] border border-white/10 hover:border-accent/40 transition-all duration-300 shadow-2xl relative overflow-hidden group bounce-hover">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-accent/10 transition-colors" />

          <header className="mb-4">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500 mb-2 block">
              {item.period}
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-1">
              {item.role}
            </h3>
            <p className={`font-medium ${item.type === 'work' ? 'text-accent' : 'text-secondary'}`}>
              {item.company}
            </p>
          </header>

          <div className="flex flex-wrap gap-2 mb-6">
            {item.tech.map((t) => (
              <span
                key={t}
                className="text-[9px] px-2 py-1 bg-white/5 border border-white/10 rounded-md text-slate-400 font-mono"
              >
                {t}
              </span>
            ))}
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            aria-label={`${isExpanded ? 'Hide' : 'Show'} highlights for ${item.role}`}
            className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors group/btn"
          >
            <span>{isExpanded ? 'Show Less' : 'View Highlights'}</span>
            <ChevronDown
              size={14}
              className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            />
          </button>

          <AnimatePresence>
            {isExpanded && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-6 space-y-3 overflow-hidden"
              >
                {item.highlights.map((h, i) => (
                  <li key={i} className="flex gap-3 text-sm text-slate-400 leading-relaxed">
                    <div
                      className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${item.type === 'work' ? 'bg-accent' : 'bg-secondary'}`}
                    />
                    {h}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
});

export const Timeline = React.memo(({ data }: { data: Experience[] }) => {
  return (
    <div className="relative">
      <div className="absolute left-[38px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent via-indigo-500/50 to-secondary" />

      <div className="relative z-10 flex flex-col items-center">
        {data.map((item, index) => (
          <TimelineItem key={item.id} item={item} isLeft={index % 2 === 0} />
        ))}
      </div>
    </div>
  );
});

export default Timeline;
