import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

import { useTheme } from '../../hooks/useTheme';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Prevent body scroll when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-lg border-b border-slate-200 dark:border-slate-800'
            : 'bg-white/50 dark:bg-slate-900/50 backdrop-blur-md'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between max-w-7xl">
          <a
            href="/"
            className="text-lg sm:text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent hover:scale-105 transition-transform"
          >
            Sarthak
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 text-sm font-medium">
            <a
              href="#projects"
              onClick={(e) => scrollToSection(e, 'projects')}
              className="text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-500 transition-colors relative group"
            >
              Projects
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all group-hover:w-full"></span>
            </a>
            <a
              href="#about"
              onClick={(e) => scrollToSection(e, 'about')}
              className="text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-500 transition-colors relative group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all group-hover:w-full"></span>
            </a>
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
              className="text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-500 transition-colors relative group"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all group-hover:w-full"></span>
            </a>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <a
              href="/resume.pdf"
              className="ml-4 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-600 to-orange-500 text-white hover:shadow-lg hover:scale-105 transition-all text-sm"
            >
              Resume
            </a>
          </nav>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors z-50 relative"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-slate-900 shadow-2xl z-40 md:hidden transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="flex flex-col p-6 pt-24 space-y-6">
          <a
            href="#projects"
            onClick={(e) => scrollToSection(e, 'projects')}
            className="text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-500 transition-colors py-2 text-lg font-medium"
          >
            Projects
          </a>
          <a
            href="#about"
            onClick={(e) => scrollToSection(e, 'about')}
            className="text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-500 transition-colors py-2 text-lg font-medium"
          >
            About
          </a>
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, 'contact')}
            className="text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-500 transition-colors py-2 text-lg font-medium"
          >
            Contact
          </a>
          <a
            href="/resume.pdf"
            className="px-4 py-3 rounded-lg bg-gradient-to-r from-amber-600 to-orange-500 text-white text-center font-medium hover:shadow-lg transition-all"
          >
            Resume
          </a>
        </nav>
      </div>
    </>
  );
}
