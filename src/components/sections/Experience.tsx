import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  type: 'full-time' | 'internship';
  description: string[];
  skills: string[];
  logo?: string;
}

const experiences: Experience[] = [
  {
    id: 'exp-1',
    company: 'Hexaware Technologies',
    role: 'Software Engineer Level 1',
    period: '2024 — Present',
    type: 'full-time',
    description: [
      'Working on enterprise-grade software solutions at scale.',
      'Collaborating with cross-functional teams in an Agile environment.',
      'Continuously learning modern engineering practices and tools.',
    ],
    skills: ['React', 'TypeScript', 'REST APIs', 'Agile', 'Git'],
    logo: '🏢',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-6xl font-display font-bold mb-6 bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent inline-block"
          >
            Experience
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto"
          >
            My professional journey and industry contributions.
          </motion.p>
        </div>

        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-0 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-amber-600/50 via-orange-500/20 to-transparent" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-12"
          >
            {experiences.map((exp) => (
              <motion.div key={exp.id} variants={cardVariants} className="relative pl-8 sm:pl-24">
                {/* Timeline Dot */}
                <div className="absolute left-[-5px] sm:left-[27px] top-8 w-3 h-3 rounded-full bg-amber-600 ring-4 ring-amber-600/20 z-20" />

                <div className="group bg-white dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:border-amber-600/30 transition-all duration-500 relative overflow-hidden">
                  {/* Subtle Background Glow */}
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-600/5 blur-3xl rounded-full group-hover:bg-amber-600/10 transition-colors duration-500" />

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl bg-slate-100 dark:bg-slate-800 w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner">
                        {exp.logo}
                      </div>
                      <div>
                        <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white">
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-bold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
                            {exp.company}
                          </span>
                          {exp.type === 'full-time' && (
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-[10px] text-green-500 font-bold uppercase tracking-wider">
                              <CheckCircle2 size={10} />
                              Open to opportunities
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-start md:items-end gap-1">
                      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm font-medium">
                        <Calendar size={14} className="text-amber-600" />
                        {exp.period}
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 text-xs">
                        <MapPin size={12} />
                        Remote / Mumbai, India
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    {exp.description.map((item, i) => (
                      <div key={i} className="flex gap-3 text-slate-600 dark:text-slate-300">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-600/40 flex-shrink-0" />
                        <p className="text-sm leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-100 dark:border-slate-800">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] px-3 py-1.5 bg-amber-600/5 dark:bg-amber-600/10 border border-amber-600/20 rounded-lg text-amber-600 font-mono tracking-tighter uppercase hover:bg-amber-600 hover:text-white transition-all duration-300 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
