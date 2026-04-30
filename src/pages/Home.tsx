import React, { useState } from 'react';
import { Download, Mail, ChevronDown, Copy, Check, Github, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

import projectsData from '../data/projects.json';
import ProjectCard from '../components/ui/ProjectCard';
import { Project } from '../types/project';
import SEO from '../components/ui/SEO';

const projects = projectsData as Project[];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

export default function Home() {
  const [emailCopied, setEmailCopied] = useState(false);
  const myEmail = 'sarthakkumbhar26@gmail.com';
  const githubProfile = 'https://github.com/Sarthaksk26';

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(myEmail);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-20 sm:space-y-32 px-4 sm:px-6 py-12 container mx-auto max-w-7xl">
      <SEO 
        title="Home" 
        description="Software Engineer at Hexaware Technologies. Exploring the intersection of engineering and software." 
      />

      {/* Hero Section */}
      <section className="pt-20 pb-12 min-h-[90vh] flex flex-col justify-center relative overflow-hidden">
        {/* Animated background circles */}
        <div className="absolute top-20 left-10 w-48 h-48 sm:w-72 sm:h-72 bg-amber-200 dark:bg-amber-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-48 h-48 sm:w-72 sm:h-72 bg-orange-200 dark:bg-orange-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-48 h-48 sm:w-72 sm:h-72 bg-yellow-200 dark:bg-yellow-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl relative z-10"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-4 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-full text-amber-700 dark:text-amber-400 text-sm font-medium"
          >
            👋 Welcome to my portfolio
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-amber-800 to-orange-700 dark:from-white dark:via-amber-400 dark:to-orange-500 bg-clip-text text-transparent leading-tight">
            Hi, I'm Sarthak Kumbhar
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed max-w-3xl">
            Curiosity led me from engineering to software — now shaping my path as a
            <span className="text-amber-600 dark:text-amber-400 font-semibold"> developer</span>.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/resume.pdf"
              className="group px-5 sm:px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-500 text-white rounded-xl font-medium hover:shadow-2xl transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <Download size={20} className="group-hover:animate-bounce" />
              Download Resume
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToContact}
              className="px-5 sm:px-6 py-3 border-2 border-slate-300 dark:border-slate-700 rounded-xl font-medium hover:border-amber-600 dark:hover:border-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-all flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto dark:text-slate-300"
            >
              <Mail size={20} />
              Contact Me
            </motion.button>
          </div>
        </motion.div>

        <motion.a
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          href="#projects"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2 text-amber-600 dark:text-amber-400"
        >
          <ChevronDown size={32} />
        </motion.a>
      </section>

      {/* Projects Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        id="projects" 
        className="scroll-mt-24"
      >
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-amber-800 dark:from-white dark:to-amber-500 bg-clip-text text-transparent">
            Selected Projects
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            A collection of my recent work and experiments
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2">
          {projects.map((p, index) => (
            <motion.div key={p.id} variants={itemVariants}>
              <ProjectCard project={p} index={index} />
            </motion.div>
          ))}
        </div>

        <motion.div 
          variants={itemVariants}
          className="mt-8 sm:mt-12 text-center"
        >
          <a
            href={githubProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl text-base sm:text-lg font-medium hover:bg-slate-800 dark:hover:bg-slate-700 hover:shadow-2xl hover:scale-105 transition-all"
          >
            <Github size={24} className="group-hover:rotate-12 transition-transform" />
            <span>See More Work on GitHub</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </motion.section>

      {/* About Section */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        id="about" 
        className="scroll-mt-24"
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-slate-900/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-xl border border-slate-200 dark:border-slate-800 relative overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/10 dark:to-orange-900/10 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-slate-900 to-amber-800 dark:from-white dark:to-amber-500 bg-clip-text text-transparent">
                About Me
              </h2>
              <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
                From Electrical Engineering to software development, my path has always been guided
                by curiosity. I taught myself C++ and web development, and now work as a{' '}
                <span className="font-semibold text-amber-600 dark:text-amber-400">
                  Software Engineer Level 1 at Hexaware Technologies
                </span>
                . Each step has been about growth — learning new skills, applying them to real-world
                challenges, and preparing for the next stage of my journey as a developer.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        id="contact" 
        className="scroll-mt-24 pb-12 sm:pb-20"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-slate-900 to-amber-800 dark:from-white dark:to-amber-500 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-slate-700 dark:text-slate-400 text-base sm:text-lg mb-6 sm:mb-8 px-4">
            I'm always open to discussing new projects, creative ideas, or opportunities.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 px-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={`mailto:${myEmail}`}
              className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-amber-600 to-orange-500 text-white rounded-2xl text-base sm:text-lg font-medium hover:shadow-2xl transition-all"
            >
              <Mail size={20} className="sm:w-6 sm:h-6" />
              <span className="truncate">{myEmail}</span>
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={copyEmail}
              className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 border-2 border-slate-300 dark:border-slate-700 rounded-2xl text-base sm:text-lg font-medium hover:border-amber-600 dark:hover:border-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-all dark:text-slate-300"
            >
              {emailCopied ? (
                <>
                  <Check size={20} className="sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
                  <span className="text-green-600 dark:text-green-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={20} className="sm:w-6 sm:h-6" />
                  <span>Copy Email</span>
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
