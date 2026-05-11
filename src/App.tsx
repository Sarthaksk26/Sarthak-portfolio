import React, { Suspense, lazy } from 'react';

import Layout from './components/layout/Layout';
import CustomCursor from './components/ui/CustomCursor';
import ErrorBoundary from './components/ui/ErrorBoundary';

const Home = lazy(() => import('./pages/Home'));

export default function App() {
  return (
    <>
      <CustomCursor />
      <Layout>
        <ErrorBoundary>
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center bg-[#0F0F0F]">
                <div className="space-y-4 text-center">
                  <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">
                    Initialising Stack...
                  </p>
                </div>
              </div>
            }
          >
            <Home />
          </Suspense>
        </ErrorBoundary>
      </Layout>
    </>
  );
}
