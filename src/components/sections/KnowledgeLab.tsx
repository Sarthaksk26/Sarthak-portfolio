import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Github, ExternalLink } from 'lucide-react';
import { concepts } from '../../data/concepts';
import { cn } from '../../utils/cn';

// Import Demos
import { DebounceDemo } from '../concepts/DebounceDemo';
import { ObserverDemo } from '../concepts/ObserverDemo';
import { HooksDemo } from '../concepts/HooksDemo';
import { EventLoopDemo } from '../concepts/EventLoopDemo';

export const KnowledgeLab = () => {
  const [activeTab, setActiveTab] = useState(concepts[0].id);

  const renderActiveDemo = () => {
    switch (activeTab) {
      case 'debounce-throttle': return <DebounceDemo />;
      case 'intersection-observer': return <ObserverDemo />;
      case 'custom-hooks': return <HooksDemo />;
      case 'event-loop': return <EventLoopDemo />;
      default: return null;
    }
  };

  const activeConcept = concepts.find(c => c.id === activeTab);

  return (
    <section id="knowledge-lab" className="py-32 relative overflow-hidden bg-slate-50 dark:bg-black/20">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-5xl font-display font-bold mb-6 text-gradient inline-flex items-center gap-4 justify-center">
            <Lightbulb className="text-accent" size={40} />
            Knowledge Lab
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            A living sandbox of core web development concepts. Because building UIs is great, but understanding what happens under the hood is what makes a senior engineer.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Tabs */}
          <div className="lg:w-1/4 flex flex-col gap-2">
            {concepts.map((concept) => {
              const Icon = concept.icon;
              const isActive = activeTab === concept.id;
              
              return (
                <button
                  key={concept.id}
                  onClick={() => setActiveTab(concept.id)}
                  className={cn(
                    "flex items-center gap-3 p-4 rounded-2xl text-left transition-all duration-300 relative overflow-hidden group",
                    isActive 
                      ? "bg-accent text-white shadow-lg shadow-accent/20" 
                      : "glass hover:bg-white/10 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300"
                  )}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="activeTabBg" 
                      className="absolute inset-0 bg-white/10" 
                    />
                  )}
                  <Icon size={20} className={cn("shrink-0", isActive ? "text-white" : "text-accent")} />
                  <span className="font-bold relative z-10">{concept.title}</span>
                </button>
              );
            })}
          </div>

          {/* Content Area */}
          <div className="lg:w-3/4 glass rounded-[2.5rem] p-6 sm:p-10 border border-slate-200 dark:border-white/10 flex flex-col min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col"
              >
                {activeConcept && (
                  <div className="mb-8">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-3xl font-display font-bold text-slate-900 dark:text-white flex items-center gap-3">
                        <activeConcept.icon className="text-accent" size={32} />
                        {activeConcept.title}
                      </h3>
                      {activeConcept.githubUrl && (
                        <a 
                          href={activeConcept.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm font-bold bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-900 dark:text-white px-4 py-2 rounded-full transition-colors"
                        >
                          <Github size={16} />
                          <span className="hidden sm:inline">View Source</span>
                        </a>
                      )}
                    </div>
                    
                    <p className="text-slate-600 dark:text-slate-300 mb-4">
                      {activeConcept.description}
                    </p>
                    
                    <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 flex gap-4">
                      <Lightbulb className="text-accent shrink-0 mt-1" size={20} />
                      <p className="text-sm text-slate-700 dark:text-slate-300 italic">
                        {activeConcept.analogy}
                      </p>
                    </div>
                  </div>
                )}
                
                {/* The Interactive Demo */}
                <div className="flex-1 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/5 bg-white dark:bg-black/20 p-6">
                  {renderActiveDemo()}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KnowledgeLab;
