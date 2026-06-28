import React, { useState, useEffect, useCallback } from 'react';
import { Mail, Copy, Check, Github, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import ExperienceSection from '@/components/sections/Experience';
import TechDNA from '@/components/sections/TechDNA';

import projectsData from '../data/projects.json';
import ProjectCard from '../components/ui/ProjectCard';
import GitHubPulse from '../components/sections/GitHubPulse';
import { Project } from '../types/project';
import SEO from '../components/ui/SEO';
import { useMagnetic } from '../hooks/useMagnetic';
import { useScrollReveal } from '../hooks/useScrollReveal';
import ParticleField from '../components/ui/ParticleField';

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
  // Visitor context available for future use
  // const visitorContext = useVisitorContext();

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

  const clientProjects = (projectsData as Project[]).filter((p) => p.category === 'client');
  const practiceProjects = (projectsData as Project[]).filter((p) => p.category === 'practice');

  return (
    <div className="flex flex-col">
      <SEO
        title="Sarthak"
        description="Frontend Developer specializing in React 19 and TypeScript. Building fast, accessible web experiences. Open to full-time frontend engineering roles."
      />

      <section
        id="hero"
        className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-20"
      >
        <div className="noise-overlay" />
        <ParticleField />

        <FloatingBadge className="hidden sm:block top-1/4 right-[10%] sm:right-[15%]" delay={0}>
          React 19
        </FloatingBadge>
        <FloatingBadge className="hidden sm:block top-1/2 left-[5%] sm:left-[10%]" delay={2}>
          TypeScript
        </FloatingBadge>
        <FloatingBadge className="hidden sm:block bottom-1/4 right-[5%] sm:right-[10%]" delay={4}>
          Open Source
        </FloatingBadge>

        <div className="max-w-5xl relative z-10 space-y-8">
          {/* Personalized Greeting */}
          <div className="flex justify-center items-center gap-2 mb-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-slate-300"
            >
              📍 Based in <strong className="text-white">Navi Mumbai</strong>
            </motion.div>
          </div>

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

          <h1 className="font-display font-bold leading-[1.1] py-4">
            {['Hi,', "I'm", 'Sarthak'].map((word, i) => (
              <span
                key={i}
                className="inline-block stagger-item text-[clamp(2.5rem,8vw,5rem)] mr-[0.3em] bg-gradient-to-r from-accent to-indigo-400 bg-clip-text text-transparent"
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
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto px-4 max-w-4xl scroll-mt-24 py-24">
        <div
          ref={reveal}
          data-reveal="scale"
          className="glass p-8 sm:p-16 rounded-[3rem] relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-4xl font-display font-bold mb-8 text-gradient">About Me</h2>
            <div className="space-y-6 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                My path to software development started a bit differently. I graduated with a degree
                in{' '}
                <span className="font-semibold text-slate-900 dark:text-white">
                  Electrical Engineering
                </span>
                . However, my curiosity naturally pulled me toward writing code, leading me to teach
                myself web development and transition into the tech industry.
              </p>
              <p>
                Today, I work at{' '}
                <span className="font-semibold text-slate-900 dark:text-white">
                  Hexaware Technologies
                </span>{' '}
                as a <span className="font-bold text-accent">Software Engineer Level 1</span>. While
                that is my official title, my daily responsibilities are entirely focused on{' '}
                <span className="font-semibold text-slate-900 dark:text-white">
                  manual testing and frontend UI validation
                </span>
                . This role has been the ultimate crash course in building better software. By
                spending my days isolating complex bugs and analyzing React component states, I have
                learned exactly what causes an application to break under pressure. I know how to
                ensure responsive design correctness and meet strict accessibility standards before
                a product ever goes live.
              </p>
              <p>
                I take this deep understanding of software quality and apply it directly to my own
                development work. Outside of the office, I focus heavily on writing{' '}
                <span className="font-semibold text-slate-900 dark:text-white">
                  clean, performance-first code
                </span>
                . I have built a high-performance React 18 application that achieves a{' '}
                <span className="font-semibold text-slate-900 dark:text-white">
                  95+ Lighthouse score
                </span>
                . I also developed a smart media discovery platform powered by{' '}
                <span className="font-semibold text-slate-900 dark:text-white">
                  Gemini 2.0 Flash
                </span>
                . Recently, I even managed the end-to-end delivery of a fully responsive portfolio
                website for a freelance client.
              </p>
              <p>
                My background gives me a unique edge. I have the logical foundation of an engineer,
                the critical eye of a QA tester, and a genuine passion for modern web development. I
                am now looking to bring this combination of{' '}
                <span className="font-bold text-accent">
                  testing rigor and hands-on coding experience
                </span>{' '}
                to a{' '}
                <span className="font-bold text-accent">full-time frontend engineering role</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <ExperienceSection />

      {/* Projects Section */}
      <section
        id="projects"
        className="container mx-auto px-6 max-w-7xl scroll-mt-24 py-24 overflow-visible"
      >
        <div ref={reveal} data-reveal className="text-center mb-24 relative overflow-visible">
          <h2 className="text-5xl sm:text-7xl font-display font-bold mb-6 text-gradient py-4 leading-[1.2]">
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
      </section>

      {/* GitHub Pulse Section */}
      <GitHubPulse />

      {/* Tech DNA Section */}
      <TechDNA />

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-4 max-w-4xl py-24 text-center">
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
