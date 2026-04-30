import { motion, useScroll, useSpring } from 'framer-motion';

import Header from './Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100 antialiased selection:bg-amber-200 selection:text-amber-900">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 to-orange-500 z-[60] origin-left"
        style={{ scaleX }}
      />
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
