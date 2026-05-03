// Mapping skills from previous Skills.tsx into orbital rings

export type RingTier = 'inner' | 'middle' | 'outer';

export interface TechOrb {
  name: string;
  ring: RingTier;
  color: string;
  usage: string;
}

export const techStack: TechOrb[] = [
  // Inner Ring (Core Mastery - 5 items)
  { name: 'React', ring: 'inner', color: '#61DAFB', usage: '5+ Projects' },
  { name: 'TypeScript', ring: 'inner', color: '#3178C6', usage: '4+ Projects' },
  { name: 'JavaScript', ring: 'inner', color: '#F7DF1E', usage: 'Core Language' },
  { name: 'Tailwind CSS', ring: 'inner', color: '#06B6D4', usage: 'All UI Styling' },
  { name: 'HTML/CSS', ring: 'inner', color: '#E34F26', usage: 'Fundamental' },

  // Middle Ring (Backend & Secondary - 6 items)
  { name: 'Node.js', ring: 'middle', color: '#339933', usage: '2 Projects' },
  { name: 'Express.js', ring: 'middle', color: '#888888', usage: 'REST APIs' },
  { name: 'MongoDB', ring: 'middle', color: '#47A248', usage: 'Database' },
  { name: 'REST APIs', ring: 'middle', color: '#FF6C37', usage: 'Integration' },
  { name: 'Vite', ring: 'middle', color: '#646CFF', usage: 'Build Tool' },
  { name: 'C++', ring: 'middle', color: '#00599C', usage: 'DSA & Logic' },

  // Outer Ring (Tools & Ecosystem - 7 items)
  { name: 'Git', ring: 'outer', color: '#F05032', usage: 'Version Control' },
  { name: 'GitHub', ring: 'outer', color: '#181717', usage: 'CI/CD & Hosting' },
  { name: 'Figma', ring: 'outer', color: '#F24E1E', usage: 'UI Prototyping' },
  { name: 'Linux', ring: 'outer', color: '#FCC624', usage: 'OS & Server' },
  { name: 'Python', ring: 'outer', color: '#3776AB', usage: 'Scripting' },
  { name: 'Framer Motion', ring: 'outer', color: '#0055FF', usage: 'Animations' },
  { name: 'Vercel', ring: 'outer', color: '#000000', usage: 'Deployments' },
];
