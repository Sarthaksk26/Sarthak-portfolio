import { Code2, MonitorPlay, Zap, Database, Cpu, Layout, FileJson, LucideIcon } from 'lucide-react';

export type TechGradient = {
  from: string;
  to: string;
  icon: LucideIcon;
  label: string;
};

// A mapping of tech tags to a unique gradient and icon identity
export const getTechIdentity = (tech: string[]): TechGradient => {
  const t = tech.map((tag) => tag.toLowerCase());

  if (t.includes('react') || t.includes('next.js')) {
    return {
      from: 'from-indigo-500',
      to: 'to-violet-600',
      icon: MonitorPlay,
      label: 'React / UI',
    };
  }
  if (t.includes('node.js') || t.includes('express')) {
    return {
      from: 'from-emerald-500',
      to: 'to-teal-600',
      icon: Database,
      label: 'Backend',
    };
  }
  if (t.includes('typescript') || t.includes('ts')) {
    return {
      from: 'from-blue-500',
      to: 'to-cyan-600',
      icon: Code2,
      label: 'TypeScript',
    };
  }
  if (t.includes('vanilla js') || t.includes('javascript') || t.includes('js')) {
    return {
      from: 'from-amber-400',
      to: 'to-orange-500',
      icon: FileJson,
      label: 'JavaScript',
    };
  }
  if (t.includes('tailwind') || t.includes('css')) {
    return {
      from: 'from-sky-400',
      to: 'to-blue-500',
      icon: Layout,
      label: 'Styling',
    };
  }
  if (t.includes('vite') || t.includes('framer motion')) {
    return {
      from: 'from-fuchsia-500',
      to: 'to-pink-600',
      icon: Zap,
      label: 'Modern Tooling',
    };
  }

  // Fallback pattern
  return {
    from: 'from-slate-600',
    to: 'to-slate-800',
    icon: Cpu,
    label: 'Software',
  };
};
