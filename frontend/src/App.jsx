import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AnalysisWorkspace from './components/AnalysisWorkspace';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import AboutAndLimitations from './components/AboutAndLimitations';
import Footer from './components/Footer';
import { checkBackendHealth } from './services/api';

export default function App() {
  const [backendStatus, setBackendStatus] = useState(null);

  useEffect(() => {
    // Initial health check
    const performCheck = async () => {
      const status = await checkBackendHealth();
      setBackendStatus(status);
    };

    performCheck();

    // Periodic heartbeat every 20 seconds
    const interval = setInterval(performCheck, 20000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#0F172A] font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar backendStatus={backendStatus} />
      <main className="flex-1">
        <Hero />
        <AnalysisWorkspace backendStatus={backendStatus} />
        <HowItWorks />
        <Features />
        <AboutAndLimitations backendStatus={backendStatus} />
      </main>
      <Footer />
    </div>
  );
}
