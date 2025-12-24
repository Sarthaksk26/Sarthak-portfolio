import React from 'react';

import Header from './Header';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      <Header />
      <main className="px-6 py-12 container">{children}</main>
      <footer className="py-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Sarthak Kumbhar
      </footer>
    </div>
  );
}
