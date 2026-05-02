import React, { useEffect, useState, useRef } from 'react';

interface SkillBarProps {
  name: string;
  level: number;
  category: string;
  icon: string;
  index: number;
}

const SkillBar = React.memo(({ name, level, category, icon, index }: SkillBarProps) => {
  const [width, setWidth] = useState(0);
  const [count, setCount] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            setWidth(level);

            const duration = 1500;
            const startTime = performance.now();

            const animateCount = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easedProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic

              setCount(Math.floor(easedProgress * level));

              if (progress < 1) {
                requestAnimationFrame(animateCount);
              }
            };
            requestAnimationFrame(animateCount);
          }, index * 100);

          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (barRef.current) observer.observe(barRef.current);
    return () => observer.disconnect();
  }, [level, index]);

  const getColor = () => {
    switch (category) {
      case 'Frontend':
        return 'from-indigo-500 to-indigo-600';
      case 'Backend':
        return 'from-amber-500 to-amber-600';
      case 'Tools':
        return 'from-teal-500 to-teal-600';
      default:
        return 'from-slate-500 to-slate-600';
    }
  };

  const getTextColor = () => {
    switch (category) {
      case 'Frontend':
        return 'text-indigo-400';
      case 'Backend':
        return 'text-amber-400';
      case 'Tools':
        return 'text-teal-400';
      default:
        return 'text-slate-400';
    }
  };

  return (
    <div ref={barRef} className="space-y-3 mb-6">
      <div className="flex items-center justify-between text-sm font-bold uppercase tracking-widest">
        <div className="flex items-center gap-3">
          <span className="text-xl" aria-hidden="true">
            {icon}
          </span>
          <span className="text-slate-900 dark:text-white">{name}</span>
        </div>
        <span className={getTextColor()} aria-label={`${count} percent`}>
          {count}%
        </span>
      </div>

      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
        <div
          className={`h-full bg-gradient-to-r ${getColor()} rounded-full transition-all duration-[1500ms] ease-out shadow-[0_0_15px_rgba(99,102,241,0.3)]`}
          style={{ width: `${width}%` }}
          role="progressbar"
          aria-valuenow={count}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
});

export default SkillBar;
