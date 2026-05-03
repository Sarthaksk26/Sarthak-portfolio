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
            className="text-4xl sm:text-6xl font-display font-bold bg-gradient-to-r from-slate-900 to-amber-800 dark:from-white dark:to-amber-500 bg-clip-text text-transparent inline-block"
          >
            Experience
          </motion.h2>
        </div>

        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-0 sm:left-12 top-0 bottom-0 w-1 bg-slate-200 dark:bg-slate-800 rounded-full" />
          <div className="absolute left-0 sm:left-12 top-0 bottom-0 w-1 bg-amber-200 dark:bg-amber-900/50 rounded-full" />

          <div className="space-y-12">
            {experiences.map((exp) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="relative pl-8 sm:pl-28"
              >
                {/* Timeline Dot Connector */}
                <div className="absolute left-[-6px] sm:left-[41px] top-10 w-4 h-4 rounded-full bg-amber-600 border-4 border-white dark:border-[#050505] z-20 shadow-lg" />

                <div className="bg-white dark:bg-slate-900/50 rounded-[2.5rem] p-8 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-500 group">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                      <div className="w-16 h-16 flex items-center justify-center bg-amber-100 dark:bg-amber-900/20 rounded-2xl text-amber-600 grayscale group-hover:grayscale-0 transition-all duration-500">
                        {exp.type === 'work' ? <Briefcase size={32} /> : <GraduationCap size={32} />}
                      </div>
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-display font-bold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
                          {exp.company}
                        </h3>
                        <p className="text-lg font-medium text-slate-700 dark:text-slate-300 mt-1">
                          {exp.role}
                        </p>

                        {exp.type === 'work' && (
                          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold uppercase tracking-wider">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            Active Professional
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col lg:items-end gap-2 shrink-0">
                      <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-500 text-sm font-bold shadow-sm">
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-10">
                    {exp.highlights.map((item, i) => (
                      <div key={i} className="flex gap-4 group/item">
                        <span className="text-amber-600 font-bold group-hover/item:translate-x-1 transition-transform">
                          →
                        </span>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 pt-8 border-t border-slate-100 dark:border-slate-800">
                    {exp.tech.map((skill) => (
                      <TechTag key={skill} tag={skill} />
                    ))}
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
