import React from "react";

export default function Header() {
  return (
    <header className="border-b">
      <div className="container px-6 py-4 flex items-center justify-between">
        <a href="/" className="text-lg font-semibold">Your Name</a>
        <nav className="space-x-4 text-sm">
          <a href="#projects" className="text-slate-600 hover:text-slate-900">Projects</a>
          <a href="#about" className="text-slate-600 hover:text-slate-900">About</a>
          <a href="#contact" className="text-slate-600 hover:text-slate-900">Contact</a>
          <a href="/resume.pdf" className="ml-4 inline-block px-3 py-1 rounded bg-accent text-white text-sm">Resume</a>
        </nav>
      </div>
    </header>
  );
}