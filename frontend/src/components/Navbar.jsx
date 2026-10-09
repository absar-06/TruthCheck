import React, { useState } from 'react';
import { ShieldCheck, Activity, Menu, X, CheckCircle, ExternalLink, Sparkles } from 'lucide-react';

export default function Navbar({ backendStatus, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#FAF9F6]/90 border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Identity */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-md shadow-emerald-700/20 ring-1 ring-emerald-500/30">
              <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
              <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold tracking-tight text-[#0F172A] font-serif">TruthCheck</span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100/80 text-emerald-800 border border-emerald-300/60">
                  T-103
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 tracking-wide">
                Check. Understand. Then Share.
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('analyze')}
              className="text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors"
            >
              Analyze
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors"
            >
              About & Team
            </button>
          </nav>

          {/* Right Header: System Status & Primary CTA */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Live Backend Connection Indicator */}
            <div 
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                backendStatus?.connected 
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                  : 'bg-amber-50 text-amber-800 border-amber-200'
              }`}
              title={backendStatus?.connected ? `Flask ML backend active (Benchmark Accuracy: ${backendStatus?.details?.metrics?.accuracy ? (backendStatus.details.metrics.accuracy * 100).toFixed(2) + '%' : '92.47%'})` : "Flask backend offline"}
            >
              <span className="relative flex h-2 w-2">
                {backendStatus?.connected && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                )}
                <span className={`relative inline-flex rounded-full h-2 w-2 ${backendStatus?.connected ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
              </span>
              <span>{backendStatus?.connected ? `Model Ready (${backendStatus?.details?.metrics?.accuracy ? (backendStatus.details.metrics.accuracy * 100).toFixed(1) + '%' : '92.5%'})` : 'Backend Offline'}</span>
            </div>

            {/* Analyze Button */}
            <button
              onClick={() => scrollToSection('analyze')}
              className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 shadow-sm shadow-emerald-700/20 transition-all cursor-pointer"
            >
              Analyze Content
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-[#FAF9F6] px-4 pt-2 pb-6 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</span>
            <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
              backendStatus?.connected ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}>
              <span className={`h-1.5 w-1.5 rounded-full ${backendStatus?.connected ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
              {backendStatus?.connected ? `ML Model Online (${backendStatus?.details?.metrics?.accuracy ? (backendStatus.details.metrics.accuracy * 100).toFixed(1) + '%' : '92.5%'})` : 'Backend Offline'}
            </span>
          </div>

          <button
            onClick={() => scrollToSection('hero')}
            className="block w-full text-left py-2 text-base font-medium text-slate-700 hover:text-emerald-700"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('analyze')}
            className="block w-full text-left py-2 text-base font-medium text-slate-700 hover:text-emerald-700"
          >
            Analyze Content
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="block w-full text-left py-2 text-base font-medium text-slate-700 hover:text-emerald-700"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection('features')}
            className="block w-full text-left py-2 text-base font-medium text-slate-700 hover:text-emerald-700"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="block w-full text-left py-2 text-base font-medium text-slate-700 hover:text-emerald-700"
          >
            About & Team
          </button>

          <div className="pt-2">
            <button
              onClick={() => scrollToSection('analyze')}
              className="w-full py-2.5 rounded-xl text-center font-semibold text-white bg-emerald-600 hover:bg-emerald-700"
            >
              Analyze Content Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
