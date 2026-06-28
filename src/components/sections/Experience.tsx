import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, GraduationCap } from 'lucide-react';

import TechTag from '@/components/ui/TechTag';

import experiencesData from '../../data/experience.json';

interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  type: string;
  highlights: string[];
  tech: string[];
}

const experiences = experiencesData as Experience[];

const ExperienceSection: React.FC = () => {
  return (
    <section id="journey" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-6xl font-display font-bold bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent inline-block"
          >
            Experience
          </motion.h2>
        </div>

        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-4 sm:left-12 top-0 bottom-0 w-px bg-slate-800/50 rounded-full" />
          <div className="absolute left-4 sm:left-12 top-0 bottom-0 w-px bg-accent/30 rounded-full" />

          <div className="space-y-12">
            {experiences.map((exp) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="relative pl-12 sm:pl-28"
              >
                {/* Timeline Dot Connector */}
                <div className="absolute left-[12px] sm:left-[44px] top-10 w-2 h-2 rounded-full bg-accent z-20 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />

                <div className="glass rounded-[2rem] p-5 sm:p-10 border border-white/5 shadow-2xl hover:border-accent/30 transition-all duration-500 group">
                  <div className="flex flex-col gap-4">
                    {/* Header Row: Company & Period */}
                    <div className="grid grid-cols-[1fr_auto] items-start gap-3 sm:gap-6 pb-4 border-b border-white/5">
                      <div className="flex flex-col gap-1">
                        <h3 className="text-lg sm:text-2xl font-display font-bold text-white group-hover:text-accent transition-colors leading-tight">
                          {exp.company}
                        </h3>
                        <p className="text-xs sm:text-base font-medium text-slate-400">
                          {exp.role}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="inline-block px-2 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 text-[10px] sm:text-xs font-bold tracking-wider whitespace-nowrap">
                          {exp.period}
                        </span>
                        {exp.type === 'work' && (
                          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20">
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                            </span>
                            Active
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-3 mt-4">
                      {exp.highlights.map((item, i) => (
                        <div key={i} className="flex gap-3 group/item">
                          <span className="text-accent font-bold group-hover/item:translate-x-1 transition-transform flex-shrink-0">
                            →
                          </span>
                          <p className="text-slate-400 leading-relaxed text-xs sm:text-base">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 pt-6 mt-4 border-t border-white/5">
                      {exp.tech.map((skill) => (
                        <TechTag key={skill} tag={skill} />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
