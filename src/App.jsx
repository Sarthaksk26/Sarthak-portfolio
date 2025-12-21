import React, { Suspense, lazy } from "react";

import Layout from "./components/layout/Layout.jsx";
// import Home from "./pages/Home.jsx"
const Home = lazy(() => import("./pages/Home"));

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<div className="p-8 text-center">Loading…</div>}>
        <Home />
      </Suspense>
    </Layout>
  );
}
