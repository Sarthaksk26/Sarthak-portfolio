import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-lg shadow-lg border-b border-slate-200'
          : 'bg-white/90 backdrop-blur-sm shadow-sm'
      }`}
    >
      <div className="container px-6 py-4 flex items-center justify-between">
        <a
          href="/"
          className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent hover:scale-105 transition-transform"
        >
          Sarthak
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <a
            href="#projects"
            onClick={(e) => scrollToSection(e, 'projects')}
            className="text-slate-600 hover:text-amber-600 transition-colors relative group"
          >
            Projects
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all group-hover:w-full"></span>
          </a>
          <a
            href="#about"
            onClick={(e) => scrollToSection(e, 'about')}
            className="text-slate-600 hover:text-amber-600 transition-colors relative group"
          >
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all group-hover:w-full"></span>
          </a>
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, 'contact')}
            className="text-slate-600 hover:text-amber-600 transition-colors relative group"
          >
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all group-hover:w-full"></span>
          </a>
          <a
            href="/resume.pdf"
            className="ml-4 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-600 to-orange-500 text-white hover:shadow-lg hover:scale-105 transition-all"
          >
            Resume
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 shadow-lg">
          <nav className="container px-6 py-4 flex flex-col space-y-4">
            <a
              href="#projects"
              onClick={(e) => scrollToSection(e, 'projects')}
              className="text-slate-600 hover:text-amber-600 transition-colors py-2"
            >
              Projects
            </a>
            <a
              href="#about"
              onClick={(e) => scrollToSection(e, 'about')}
              className="text-slate-600 hover:text-amber-600 transition-colors py-2"
            >
              About
            </a>
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
              className="text-slate-600 hover:text-amber-600 transition-colors py-2"
            >
              Contact
            </a>
            <a
              href="/resume.pdf"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-600 to-orange-500 text-white text-center"
            >
              Resume
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
