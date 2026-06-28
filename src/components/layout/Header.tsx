import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X, ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { useActiveSection } from '../../hooks/useActiveSection';
import Logo from '../ui/Logo';
import { cn } from '../../utils/cn';

const NAV_LINKS = [
  { name: 'Home', href: 'hero' },
  { name: 'Journey', href: 'journey' },
  { name: 'Projects', href: 'projects' },
  { name: 'Pulse', href: 'pulse' },
  { name: 'Skills', href: 'tech-dna' },
  { name: 'About', href: 'about' },
  { name: 'Contact', href: 'contact' },
];

const SOCIAL_LINKS = [
  { icon: Github, href: 'https://github.com/Sarthaksk26', label: 'GitHub' },
  {
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/sarthak-kumbhar-6a2669309',
    label: 'LinkedIn',
  },
  { icon: Mail, href: 'mailto:sarthakkumbhar26@gmail.com', label: 'Email' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const sectionIds = React.useMemo(() => NAV_LINKS.map((link) => link.href), []);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-[800] transition-all duration-500',
          isScrolled
            ? 'py-3 bg-white/90 dark:bg-[#0F0F0F]/90 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 shadow-sm'
            : 'py-6 bg-transparent'
        )}
      >
        <div className="container mx-auto px-6 flex items-center justify-between max-w-[1200px]">
          {/* Logo Monogram */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="group cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Logo className="h-10 sm:h-12 w-auto transition-transform group-hover:scale-105" />
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-8 text-sm font-bold uppercase tracking-widest">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="relative group"
                >
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className={cn(
                      'transition-colors duration-300',
                      activeSection === link.href
                        ? 'text-accent'
                        : 'text-slate-500 dark:text-slate-400 dark:hover:text-white hover:text-slate-900'
                    )}
                  >
                    {link.name}
                  </button>
                  {/* Sliding Underline */}
                  {activeSection === link.href && (
                    <motion.div
                      layoutId="activeUnderline"
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-accent rounded-full"
                    />
                  )}
                </motion.li>
              ))}
            </ul>

            <div className="flex items-center gap-4 border-l border-slate-200 dark:border-white/10 pl-8">
              {/* Hire Me CTA */}
              <button
                onClick={() => scrollToSection('contact')}
                className="group px-6 py-2.5 bg-gradient-to-r from-accent to-indigo-700 text-white rounded-full text-sm font-bold shadow-lg shadow-accent/20 flex items-center gap-2 hover:shadow-accent/40 transition-all border border-accent/50"
              >
                Hire Me
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
            aria-label="Open navigation menu"
            className="lg:hidden w-10 h-10 flex items-center justify-center text-slate-900 dark:text-white"
          >
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* Full-screen Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            id="mobile-nav"
            className="fixed inset-0 z-[999] bg-white/95 dark:bg-[#0F0F0F]/95 backdrop-blur-2xl flex flex-col items-center justify-center p-12"
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center text-slate-900 dark:text-white bg-slate-100 dark:bg-white/5 rounded-full"
            >
              <X size={32} />
            </button>

            <ul className="flex flex-col items-center gap-8 mb-16">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-4xl sm:text-5xl font-display font-bold text-slate-900 dark:text-white hover:text-accent transition-colors"
                  >
                    {link.name}
                  </button>
                </motion.li>
              ))}
            </ul>

            {/* Social Links Row */}
            <div className="flex gap-8">
              {SOCIAL_LINKS.map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="w-12 h-12 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-accent dark:hover:text-white hover:bg-slate-200 dark:hover:bg-accent transition-all"
                >
                  <social.icon size={24} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
