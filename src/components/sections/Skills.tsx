import React from 'react';
import { motion } from 'framer-motion';

interface Skill {
  name: string;
  level: number; // 1-5
}

interface SkillGroup {
  category: string;
  icon: string;
  skills: Skill[];
}

const skillsData: SkillGroup[] = [
  {
    category: 'Frontend',
    icon: '🎨',
    skills: [
      { name: 'React', level: 5 },
      { name: 'TypeScript', level: 4 },
      { name: 'Tailwind CSS', level: 4 },
      { name: 'Vite', level: 4 },
      { name: 'HTML/CSS', level: 5 },
    ],
  },
  {
    category: 'Backend',
    icon: '⚙️',
    skills: [
      { name: 'Node.js', level: 3 },
      { name: 'Express.js', level: 3 },
      { name: 'MongoDB', level: 3 },
      { name: 'REST APIs', level: 4 },
    ],
  },
  {
    category: 'Tools',
    icon: '🛠️',
    skills: [
      { name: 'Git', level: 4 },
      { name: 'GitHub', level: 4 },
      { name: 'Figma', level: 3 },
      { name: 'Linux', level: 3 },
    ],
  },
  {
    category: 'Languages',
    icon: '💻',
    skills: [
      { name: 'JavaScript', level: 5 },
      { name: 'C++', level: 3 },
      { name: 'Python', level: 2 },
    ],
  },
];

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-6xl font-display font-bold mb-6 bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent inline-block"
          >
            Skills & Technologies
          </motion.h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            My technical toolkit for building high-performance web applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillsData.map((group, groupIdx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: groupIdx * 0.1 }}
              className="bg-white dark:bg-slate-900/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="text-2xl">{group.icon}</span>
                <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white">
                  {group.category}
                </h3>
              </div>

              <div className="space-y-6">
                {group.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {skill.name}
                      </span>
                      <span className="text-xs text-slate-400">{skill.level}/5</span>
                    </div>
                    <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(skill.level / 5) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
