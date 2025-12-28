import React from 'react';

import Header from './Header';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50 text-slate-900 antialiased">
      <Header />
      <main className="pt-16">{children}</main>
      <footer className="py-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/5 to-orange-500/5"></div>
        <p className="text-sm text-slate-600 relative z-10">
          © {new Date().getFullYear()} Sarthak Kumbhar. Built with passion and curiosity.
        </p>
      </footer>
    </div>
  );
}
