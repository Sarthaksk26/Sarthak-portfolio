import React from 'react';

import projects from '../data/projects.json';
import ProjectCard from '../components/ui/ProjectCard';

export default function Home() {
  return (
    <div className="space-y-20">
      <section className="pt-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">Hi, I’m Your Name</h1>
          <p className="text-lg text-slate-700 mb-6">
            I build minimal, fast web experiences. I focus on React, performance, and clean design.
          </p>
          <div className="flex gap-3">
            <a href="/resume.pdf" className="px-4 py-2 bg-accent text-white rounded">
              Download Resume
            </a>
            <a href="mailto:you@example.com" className="px-4 py-2 border rounded">
              Contact
            </a>
          </div>
        </div>
      </section>

      <section id="projects">
        <h2 className="text-2xl font-semibold mb-6">Selected Projects</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </section>

      <section id="about">
        <h2 className="text-2xl font-semibold mb-4">About</h2>
        <p className="text-slate-700 max-w-2xl">
          Short bio about you. Keep it concise and focused on what you build and why.
        </p>
      </section>

      <section id="contact">
        <h2 className="text-2xl font-semibold mb-4">Contact</h2>
        <p className="text-slate-700">
          Email me at{' '}
          <a href="mailto:you@example.com" className="text-accent">
            you@example.com
          </a>
        </p>
      </section>
    </div>
  );
}
