import React, { Suspense, lazy } from 'react';

import Layout from './components/layout/Layout';

const Home = lazy(() => import('./pages/Home'));

export default function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-600">Loading...</p>
            </div>
          </div>
        }
      >
        <Home />
      </Suspense>
    </Layout>
  );
}
