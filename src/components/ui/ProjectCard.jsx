import React from 'react';
import { Github, ExternalLink } from 'lucide-react';

function TechTag({ name }) {
  return (
    <span className="text-xs px-3 py-1.5 bg-gradient-to-r from-slate-100 to-slate-50 border border-slate-200 rounded-full text-slate-700 font-medium hover:shadow-md hover:scale-105 transition-all">
      {name}
    </span>
  );
}

export default function ProjectCard({ project, index }) {
  return (
    <article
      className="group relative border border-slate-200 rounded-2xl p-6 bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
      style={{
        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
      }}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-600/0 to-orange-500/0 group-hover:from-amber-600/5 group-hover:to-orange-500/5 transition-all duration-300 rounded-2xl"></div>

      <div className="relative z-10">
        <header className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
            {project.title}
          </h3>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-amber-600 hover:text-amber-700 font-medium hover:scale-110 transition-transform"
          >
            <ExternalLink size={16} />
          </a>
        </header>

        <p className="text-slate-600 leading-relaxed mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((t) => (
            <TechTag key={t} name={t} />
          ))}
        </div>

        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors group/link"
        >
          <Github size={16} />
          <span className="group-hover/link:underline">View Source</span>
        </a>
      </div>
    </article>
  );
}
