import React, { useState } from 'react';
import { Download, Mail, ChevronDown, Copy, Check, Github, ArrowRight } from 'lucide-react';

import projects from '../data/projects.json';
import ProjectCard from '../components/ui/ProjectCard';

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
    <div className="space-y-32 px-6 py-12 container">
      {/* Hero Section */}
      <section className="pt-20 pb-12 min-h-screen flex flex-col justify-center relative">
        {/* Animated background circles */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="max-w-4xl relative z-10" style={{ animation: 'fadeIn 1s ease-out' }}>
          <div className="inline-block mb-4 px-4 py-2 bg-amber-100 border border-amber-200 rounded-full text-amber-700 text-sm font-medium">
            👋 Welcome to my portfolio
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-amber-800 to-orange-700 bg-clip-text text-transparent leading-tight">
            Hi, I'm Sarthak Kumbhar
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 mb-8 leading-relaxed max-w-3xl">
            Curiosity led me from engineering to software — now shaping my path as a
            <span className="text-amber-600 font-semibold"> developer</span>.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="/resume.pdf"
              className="group px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-500 text-white rounded-xl font-medium hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2"
            >
              <Download size={20} className="group-hover:animate-bounce" />
              Download Resume
            </a>
            <button
              onClick={scrollToContact}
              className="px-6 py-3 border-2 border-slate-300 rounded-xl font-medium hover:border-amber-600 hover:bg-amber-50 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Mail size={20} />
              Contact Me
            </button>
          </div>
        </div>

        <a
          href="#projects"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-amber-600"
        >
          <ChevronDown size={32} />
        </a>
      </section>

      {/* Projects Section */}
      <section id="projects" className="scroll-mt-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-amber-800 bg-clip-text text-transparent">
            Selected Projects
          </h2>
          <p className="text-slate-600 text-lg">A collection of my recent work and experiments</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {projects.map((p, index) => (
            <ProjectCard key={p.id} project={p} index={index} />
          ))}
        </div>

        {/* See More Work Button */}
        <div className="mt-12 text-center">
          <a
            href={githubProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl text-lg font-medium hover:bg-slate-800 hover:shadow-2xl hover:scale-105 transition-all"
          >
            <Github size={24} className="group-hover:rotate-12 transition-transform" />
            <span>See More Work on GitHub</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>

            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-amber-800 bg-clip-text text-transparent">
                About Me
              </h2>
              <p className="text-slate-700 text-lg leading-relaxed">
                From Electrical Engineering to software development, my path has always been guided
                by curiosity. I taught myself C++ and web development, and now work as a{' '}
                <span className="font-semibold text-amber-600">
                  Software Engineer Level 1 at Hexaware Technologies
                </span>
                . Each step has been about growth — learning new skills, applying them to real-world
                challenges, and preparing for the next stage of my journey as a developer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="scroll-mt-24 pb-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-amber-800 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-slate-700 text-lg mb-8">
            I'm always open to discussing new projects, creative ideas, or opportunities.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`mailto:${myEmail}`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-500 text-white rounded-2xl text-lg font-medium hover:shadow-2xl hover:scale-105 transition-all"
            >
              <Mail size={24} />
              <span>{myEmail}</span>
            </a>

            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-3 px-8 py-4 border-2 border-slate-300 rounded-2xl text-lg font-medium hover:border-amber-600 hover:bg-amber-50 transition-all hover:scale-105"
            >
              {emailCopied ? (
                <>
                  <Check size={24} className="text-green-600" />
                  <span className="text-green-600">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={24} />
                  <span>Copy Email</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
