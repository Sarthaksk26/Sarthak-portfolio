import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Mail, ChevronDown, Copy, Check, Github, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import projectsData from '../data/projects.json';
import ProjectCard from '../components/ui/ProjectCard';
import { Project } from '../types/project';
import SEO from '../components/ui/SEO';
import { useMagnetic } from '../hooks/useMagnetic';
import { useScrollReveal } from '../hooks/useScrollReveal';
import ParticleField from '../components/ui/ParticleField';

import ExperienceSection from '@/components/sections/Experience';
import Skills from '@/components/sections/Skills';

const projects = projectsData as Project[];

const GREETING_WORDS = [
  'Frontend Engineer',
  'React Developer',
  'UI Craftsman',
  'Open Source Builder',
];

const FloatingBadge = React.memo(
  ({
    children,
    className,
    delay = 0,
  }: {
    children: React.ReactNode;
    className: string;
    delay?: number;
  }) => (
    <div
      className={`absolute z-20 glass px-4 py-2 rounded-2xl text-xs font-bold text-accent shadow-xl animate-float-slow ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  )
);

export default function Home() {
  const [emailCopied, setEmailCopied] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  const myEmail = 'sarthakkumbhar26@gmail.com';

  const viewWorkRef = useMagnetic<HTMLAnchorElement>(0.2);
  const resumeRef = useMagnetic<HTMLAnchorElement>(0.2);
  const reveal = useScrollReveal();

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % GREETING_WORDS.length);
    }, 2500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(myEmail);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [myEmail]);

  const clientProjects = useMemo(() => projects.filter((p) => p.category === 'client'), []);
  const practiceProjects = useMemo(() => projects.filter((p) => p.category === 'practice'), []);

  return (
    <div className="space-y-20 sm:space-y-32">
      <SEO
        title="Home"
        description="Software Engineer at Hexaware Technologies. Expert in React and modern UI engineering."
      />

      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden"
      >
        <div className="noise-overlay" />
        <ParticleField />

        <FloatingBadge className="top-1/4 right-[10%] sm:right-[15%]" delay={0}>
          React 19
        </FloatingBadge>
        <FloatingBadge className="top-1/2 left-[5%] sm:left-[10%]" delay={2}>
          TypeScript
        </FloatingBadge>
        <FloatingBadge className="bottom-1/4 right-[5%] sm:right-[10%]" delay={4}>
          Open Source
        </FloatingBadge>

        <div className="max-w-5xl relative z-10 space-y-8">
          <div className="h-8 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={GREETING_WORDS[wordIndex]}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="text-accent font-display font-bold tracking-widest uppercase text-sm"
              >
                {GREETING_WORDS[wordIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <h1 className="font-display font-bold leading-tight">
            {['Hi,', "I'm", 'Sarthak', 'Kumbhar'].map((word, i) => (
              <span
                key={i}
                className="inline-block stagger-item text-[clamp(2.5rem,8vw,4.5rem)] mr-[0.3em] bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {word}
              </span>
            ))}
          </h1>

          <p className="text-xl sm:text-2xl text-slate-500 dark:text-slate-400 font-light tracking-wide max-w-2xl mx-auto">
            I build fast, beautiful web experiences
            <span className="inline-block w-[2px] h-[1em] bg-accent ml-1 translate-y-1 cursor-blink" />
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            <a
              ref={viewWorkRef}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              data-cursor="link"
              aria-label="View My Work"
              className="px-8 py-4 bg-gradient-to-r from-accent to-indigo-700 text-white rounded-full font-bold shadow-xl hover:shadow-accent/40 transition-all stagger-item bounce-hover"
              style={{ animationDelay: '400ms' }}
            >
              View My Work
            </a>
            <a
              ref={resumeRef}
              href="/Sarthak_Kumbhar_Frontend_dev.pdf"
              data-cursor="link"
              aria-label="Download Resume"
              className="px-8 py-4 border border-slate-200 dark:border-slate-800 rounded-full font-bold text-slate-800 dark:text-slate-200 shine-sweep stagger-item bounce-hover"
              style={{ animationDelay: '500ms' }}
            >
              Download Resume
            </a>
          </div>
        </div>

        <motion.a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 hover:text-accent transition-colors cursor-pointer"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Explore</span>
          <ChevronDown className="animate-bounce" size={24} />
        </motion.a>
      </section>

      {/* Experience Section */}
      <ExperienceSection />

      {/* Skills Section */}
      <Skills />

      {/* Projects Section */}
      <section id="projects" className="container mx-auto px-4 max-w-7xl scroll-mt-24">
        <div ref={reveal} data-reveal className="text-center mb-24">
          <h2 className="text-4xl sm:text-6xl font-display font-bold mb-6 text-gradient">
            Projects
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            A selection of my professional client work and technical experiments.
          </p>
        </div>

        {/* SUBSECTION A — Real World Projects */}
        <div className="space-y-12 mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-start gap-2"
          >
            <h3 className="text-3xl font-display font-bold text-slate-900 dark:text-white">
              Real World Projects
            </h3>
            <p className="text-slate-500 font-medium">Shipped for real clients and live users</p>
          </motion.div>

          <div className="grid gap-12 grid-cols-1 lg:grid-cols-2">
            {clientProjects.map((p) => (
              <ProjectCard key={p.id} project={p} variant="default" showLiveBadge={true} />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-12">
          <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
          <span className="text-sm text-slate-400 dark:text-slate-600 font-medium tracking-wider uppercase">
            Labs & Experiments
          </span>
          <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
        </div>

        {/* SUBSECTION B — Labs & Experiments */}
        <div className="space-y-12 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-start gap-2"
          >
            <h3 className="text-3xl font-display font-bold text-slate-900 dark:text-white">
              Labs & Experiments
            </h3>
            <p className="text-slate-500 font-medium">
              Practice builds, experiments and fun projects
            </p>
          </motion.div>

          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {practiceProjects.map((p) => (
              <ProjectCard key={p.id} project={p} variant="compact" />
            ))}
          </div>
        </div>

        {/* GitHub CTA */}
        <div className="flex justify-center mt-20">
          <a
            href="https://github.com/Sarthaksk26"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            className="group flex items-center gap-3 px-8 py-4 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full font-bold text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-all hover:scale-105"
          >
            <Github size={20} />
            See More on GitHub
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto px-4 max-w-4xl scroll-mt-24">
        <div
          ref={reveal}
          data-reveal="scale"
          className="glass p-8 sm:p-16 rounded-[3rem] relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-4xl font-display font-bold mb-8 text-gradient">About Me</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              From Electrical Engineering to software development, my path has always been guided by
              curiosity. I taught myself C++ and web development, and now work as a{' '}
              <span className="font-bold text-accent">
                Software Engineer at Hexaware Technologies
              </span>
              . Each step has been about growth — learning new skills, applying them to real-world
              challenges, and preparing for the next stage of my journey as a developer.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-4 max-w-4xl pb-32 text-center">
        <div ref={reveal} data-reveal className="space-y-12">
          <div>
            <h2 className="text-5xl font-display font-bold mb-8 text-gradient">Let's Connect</h2>
            <p className="text-slate-500 text-lg">
              I'm always open to discussing new projects, creative ideas, or opportunities.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href={`mailto:${myEmail}`}
              data-cursor="link"
              aria-label="Send Email"
              className="flex items-center gap-3 px-8 py-4 bg-accent text-white rounded-full font-bold shadow-xl transition-all hover:scale-105"
            >
              <Mail size={24} />
              <span className="sr-only">Email: </span>
              <span>{myEmail}</span>
            </a>

            <button
              onClick={copyEmail}
              data-cursor="link"
              aria-label="Copy Email Address"
              className="flex items-center gap-3 px-8 py-4 glass rounded-full font-bold text-slate-900 dark:text-white transition-all hover:scale-105 hover:bg-accent/10"
            >
              {emailCopied ? <Check className="text-green-500" /> : <Copy />}
              <span>{emailCopied ? 'Copied!' : 'Copy Email'}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
