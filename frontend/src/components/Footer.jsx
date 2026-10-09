import React from 'react';
import { ShieldCheck, Heart, Award } from 'lucide-react';

export default function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0F172A] text-slate-400 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md">
                <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white font-serif">TruthCheck</span>
                <p className="text-xs text-emerald-400 font-medium">Check. Understand. Then Share.</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              An explainable machine learning platform engineered for first-pass misinformation screening, 
              linguistic feature transparency, and responsible media literacy.
            </p>

            <div className="pt-2 text-xs text-slate-500 space-y-1">
              <p><strong className="text-slate-300">Hackathon:</strong> Cyber AI Hackathon 2026</p>
              <p><strong className="text-slate-300">Team:</strong> Techie Bloomers (T-103)</p>
              <p><strong className="text-slate-300">Institute:</strong> SRM Institute of Science and Technology</p>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => scrollTo('hero')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('analyze')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Analyze Content
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('how-it-works')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('features')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Platform Features
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('about')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  About & Evaluation
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: External Fact Checkers */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Fact-Checking Resources</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="https://toolbox.google.com/factcheck/explorer" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                  Google Fact Check Explorer
                </a>
              </li>
              <li>
                <a href="https://www.snopes.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                  Snopes.com
                </a>
              </li>
              <li>
                <a href="https://www.reuters.com/fact-check/" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                  Reuters Fact Check
                </a>
              </li>
              <li>
                <a href="https://www.factcheck.org" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                  FactCheck.org
                </a>
              </li>
              <li>
                <a href="https://www.politifact.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                  PolitiFact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Responsible Use Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p className="max-w-2xl text-[11px] leading-relaxed">
            <strong>Responsible Use Notice:</strong> TruthCheck provides heuristic linguistic pattern screening powered by a supervised TF-IDF + Logistic Regression model. It is designed for educational exploration and media literacy awareness, and does not replace primary journalistic verification or certified institutional fact-checking.
          </p>

          <p className="text-[11px] shrink-0">
            &copy; 2026 Techie Bloomers (T-103). SRM IST.
          </p>
        </div>
      </div>
    </footer>
  );
}
