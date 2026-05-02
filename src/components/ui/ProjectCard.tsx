import React, { useRef, useState } from 'react';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';

import { Project } from '../../types/project';

import TechTag from './TechTag';

interface ProjectCardProps {
  project: Project & { featured?: boolean };
  variant?: 'default' | 'compact';
  showLiveBadge?: boolean;
}

const ProjectCard = React.memo(
  ({ project, variant = 'default', showLiveBadge }: ProjectCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState('perspective(800px) rotateX(0deg) rotateY(0deg)');

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || window.matchMedia('(pointer: coarse)').matches) return;

      const { left, top, width, height } = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      const rotateX = (y - 0.5) * -16; // max ±8deg
      const rotateY = (x - 0.5) * 16; // max ±8deg

      setTransform(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
    };

    const handleMouseLeave = () => {
      setTransform('perspective(800px) rotateX(0deg) rotateY(0deg)');
    };

    const isCompact = variant === 'compact';
    const displayedTech = isCompact ? project.tech.slice(0, 3) : project.tech;
    const techOverflow = project.tech.length - displayedTech.length;

    const fallbackImage = `https://placehold.co/800x450/f59e0b/ffffff?text=${encodeURIComponent(project.title)}`;
    const imageUrl = project.image || fallbackImage;

    return (
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative transition-all duration-300 h-full"
        style={{ transform, transformStyle: 'preserve-3d' }}
      >
        <article
          className={`h-full glass ${isCompact ? 'p-4' : 'p-6 sm:p-10'} rounded-[2.5rem] border border-slate-200 dark:border-white/10 hover:border-accent/40 transition-all duration-500 relative z-10 overflow-hidden flex flex-col shadow-2xl group/card`}
        >
          {/* Shine Sweep */}
          <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] pointer-events-none" />

          {/* Project Image */}
          <div
            className={`relative mb-6 overflow-hidden rounded-2xl ${isCompact ? 'aspect-[16/9]' : 'aspect-video'}`}
          >
            <img
              src={imageUrl}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />

            {showLiveBadge && (
              <div className="absolute top-4 left-4 z-20 bg-green-500/90 text-white rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm shadow-lg flex items-center gap-1.5 animate-fade-slide-up">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Live
              </div>
            )}
          </div>

          {/* Content Wrapper */}
          <div className="relative z-10 flex flex-col h-full">
            <header className="mb-4 flex justify-between items-start">
              <div className="w-full">
                <span className="inline-block px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-[10px] font-bold text-accent uppercase tracking-widest mb-3">
                  {project.category}
                </span>
                <h3
                  className={`font-display font-bold text-slate-900 dark:text-white group-hover:text-accent transition-colors ${isCompact ? 'text-lg' : 'text-2xl sm:text-3xl'}`}
                >
                  {project.title}
                </h3>
              </div>
            </header>

            <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-6 line-clamp-2 text-sm">
              {project.description}
            </p>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {displayedTech.map((t) => (
                <TechTag key={t} tag={t} />
              ))}
              {techOverflow > 0 && (
                <span className="text-[10px] px-3 py-1.5 bg-slate-100 dark:bg-white/5 rounded-lg text-slate-500 font-mono tracking-tighter uppercase">
                  +{techOverflow} more
                </span>
              )}
            </div>

            {/* Bottom Bar with Links */}
            <div className="mt-auto pt-6 border-t border-slate-200 dark:border-white/5 flex items-center justify-between">
              <div className="flex gap-4">
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:scale-115 transition-all duration-300"
                  aria-label={`View GitHub Repository of ${project.title}`}
                >
                  <Github size={20} />
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:scale-115 transition-all duration-300"
                  aria-label={`View Live Demo of ${project.title}`}
                >
                  <ExternalLink size={20} />
                </a>
              </div>

              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-bold text-accent uppercase tracking-widest flex items-center gap-2 group/btn"
              >
                Explore Project
                <ArrowRight
                  size={14}
                  className="group-hover/btn:translate-x-1 transition-transform"
                />
              </a>
            </div>
          </div>
        </article>

        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-accent/10 to-secondary/5 -z-10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    );
  }
);

export default ProjectCard;
