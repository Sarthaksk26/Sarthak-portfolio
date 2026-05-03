import React from 'react';
import { motion } from 'framer-motion';
import { Github, GitCommit, GitPullRequest, Star, BookOpen, AlertCircle } from 'lucide-react';

import { useGitHubStats } from '../../hooks/useGitHubStats';
import { useMagnetic } from '../../hooks/useMagnetic';
import { cn } from '../../utils/cn';

const GitHubPulse = () => {
  const { publicRepos, totalStars, topLanguages, recentActivity, loading, error } =
    useGitHubStats('Sarthaksk26');
  const magneticRef = useMagnetic<HTMLAnchorElement>();

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'PushEvent':
        return <GitCommit size={14} className="text-emerald-500" />;
      case 'PullRequestEvent':
        return <GitPullRequest size={14} className="text-blue-500" />;
      case 'CreateEvent':
        return <BookOpen size={14} className="text-purple-500" />;
      case 'WatchEvent':
        return <Star size={14} className="text-yellow-500" />;
      default:
        return <Github size={14} className="text-slate-500" />;
    }
  };

  const formatEventName = (type: string) => {
    return type
      .replace('Event', '')
      .replace(/([A-Z])/g, ' $1')
      .trim();
  };

  return (
    <section id="pulse" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-5xl font-display font-bold mb-6 text-gradient inline-flex items-center gap-4">
              <Github className="text-accent" size={40} />
              GitHub Pulse
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl">
              A live dashboard of my open-source activity, languages, and recent contributions
              pulled directly from GitHub.
            </p>
          </div>

          <a
            ref={magneticRef}
            href="https://github.com/Sarthaksk26"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold hover:scale-105 transition-transform shrink-0"
          >
            Follow on GitHub
          </a>
        </div>

        {loading ? (
          <div className="h-64 glass rounded-[2.5rem] flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="h-64 glass rounded-[2.5rem] flex flex-col items-center justify-center text-red-500 gap-4">
            <AlertCircle size={32} />
            <p>Failed to load GitHub stats. API rate limit might be exceeded.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Stats Overview */}
            <div className="glass p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/10 flex flex-col justify-center">
              <div className="grid grid-cols-2 gap-8 text-center">
                <div className="space-y-2">
                  <div className="text-5xl font-bold text-accent">{publicRepos}</div>
                  <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                    Public Repos
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-5xl font-bold text-yellow-500">{totalStars}</div>
                  <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                    Total Stars
                  </div>
                </div>
              </div>
            </div>

            {/* Language Breakdown */}
            <div className="glass p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/10 lg:col-span-1">
              <h3 className="text-lg font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen size={18} className="text-accent" />
                Top Languages
              </h3>
              <div className="space-y-4">
                {topLanguages.map((lang, index) => (
                  <div key={lang.name} className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-slate-700 dark:text-slate-300">{lang.name}</span>
                      <span className="text-slate-500">{lang.percentage}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.percentage}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className={cn(
                          'h-full rounded-full',
                          index === 0
                            ? 'bg-accent'
                            : index === 1
                              ? 'bg-blue-500'
                              : index === 2
                                ? 'bg-yellow-500'
                                : 'bg-purple-500'
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="glass p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/10 lg:col-span-1">
              <h3 className="text-lg font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-2">
                <GitCommit size={18} className="text-accent" />
                Recent Activity
              </h3>
              <div className="space-y-4">
                {recentActivity.length > 0 ? (
                  recentActivity.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                    >
                      <div className="mt-1 p-2 bg-slate-100 dark:bg-white/5 rounded-lg group-hover:scale-110 transition-transform">
                        {getEventIcon(event.type)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-900 dark:text-white">
                          {formatEventName(event.type)}
                        </div>
                        <div className="text-xs text-slate-500 truncate max-w-[200px]">
                          {event.repo.replace('Sarthaksk26/', '')}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1">{event.date}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500 text-sm">No recent activity found.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GitHubPulse;
