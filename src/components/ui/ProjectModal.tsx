import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { Project } from '../../types/project';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const prevProjectIdRef = useRef<string | null>(null);

  useEffect(() => {
    const currentProjectId = project?.id ?? null;
    if (prevProjectIdRef.current !== currentProjectId) {
      setContent('');
      prevProjectIdRef.current = currentProjectId;
    }
  }, [project?.id]);

  useEffect(() => {
    if (!project?.readmeUrl) return;

    const controller = new AbortController();

    const fetchReadme = async () => {
      setLoading(true);
      try {
        const response = await fetch(project.readmeUrl!, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error('Failed to fetch README');
        setContent(await response.text());
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
        setContent(
          '> Failed to load project details. Please visit the GitHub repository directly.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReadme();
    return () => controller.abort();
  }, [project]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm cursor-pointer"
          />

          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 bottom-4 top-20 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-4xl z-50 flex flex-col glass border border-slate-200/50 dark:border-white/10 rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200/50 dark:border-white/5 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
              <div className="flex items-center gap-4 overflow-hidden">
                <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white truncate">
                  {project.title}
                </h2>
                <div className="hidden sm:flex gap-2">
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-slate-100 dark:bg-white/5 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors text-slate-600 dark:text-slate-300"
                    title="View Source"
                  >
                    <Github size={18} />
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-slate-100 dark:bg-white/5 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors text-slate-600 dark:text-slate-300"
                      title="View Live Site"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-full transition-colors text-slate-500 dark:text-slate-400"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-10 custom-scrollbar bg-slate-50/50 dark:bg-slate-950/50">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-slate-500">
                  <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
                  <p className="animate-pulse font-medium tracking-wide">Loading Details...</p>
                </div>
              ) : (
                <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-accent hover:prose-a:text-accent/80 prose-img:rounded-xl prose-img:shadow-lg prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
