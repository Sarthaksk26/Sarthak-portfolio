import { Github, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

import { Project } from '../../types/project';

interface TechTagProps {
  name: string;
}

function TechTag({ name }: TechTagProps) {
  return (
    <span className="text-xs px-3 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-slate-700 dark:text-slate-300 font-medium hover:border-amber-600 dark:hover:border-amber-500 transition-all">
      {name}
    </span>
  );
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.article
      whileHover={{ y: -8 }}
      className="group relative border border-slate-200 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden"
    >
      {/* Project Image */}
      <div className="aspect-video w-full overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div className="flex gap-3">
             <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors"
            >
              <ExternalLink size={20} />
            </a>
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors"
            >
              <Github size={20} />
            </a>
          </div>
        </div>
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
          src={project.image || `https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop`}
          alt={project.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="p-6 relative z-20">
        <header className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            {project.title}
          </h3>
        </header>

        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <TechTag key={t} name={t} />
          ))}
        </div>
      </div>
    </motion.article>
  );
}
