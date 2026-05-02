import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

import ScrollProgress from '../ui/ScrollProgress';
import ScrollToTop from '../ui/ScrollToTop';
import Logo from '../ui/Logo';

import Header from './Header';


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen theme-transition text-slate-900 dark:text-slate-100 antialiased selection:bg-accent/30 selection:text-accent">
      <a
        href="#main"
        className="sr-only focus:not-sr-only fixed top-4 left-4 z-[1000] bg-accent text-white px-4 py-2 rounded-lg font-bold"
      >
        Skip to content
      </a>

      <ScrollProgress />
      <Header />

      <main id="main" role="main">
        {children}
      </main>

      <footer className="py-20 border-t border-slate-200 dark:border-white/5 relative overflow-hidden bg-slate-50 dark:bg-[#0F0F0F]">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left flex flex-col items-center md:items-start gap-4">
              <Logo className="h-12 w-auto" />
              <div>
                <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white">
                  Sarthak Kumbhar
                </h2>
                <p className="text-slate-500 text-sm">Frontend Engineer & UI Specialist</p>
              </div>
            </div>

            <div className="flex gap-6">
              {[
                { icon: Github, href: 'https://github.com/Sarthaksk26', label: 'GitHub' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:sarthakkumbhar26@gmail.com', label: 'Email' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-slate-200 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-accent dark:hover:text-white hover:bg-slate-300 dark:hover:bg-accent transition-all"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-600">
              © {new Date().getFullYear()} Sarthak Kumbhar. Built with React 19 & Tailwind 4.
            </p>
            <p className="text-xs text-slate-600 italic">
              Designed for performance and accessibility.
            </p>
          </div>
        </div>
      </footer>

      {/* Reusable UI Components */}
      <ScrollToTop />
    </div>
  );
}
