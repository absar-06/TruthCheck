import React, { useState } from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Search, 
  Binary, 
  Cpu, 
  CheckCircle2, 
  AlertTriangle, 
  FileText,
  Sparkles,
  Info
} from 'lucide-react';

export default function Hero({ onStartAnalysis }) {
  const [activeStep, setActiveStep] = useState(2);

  const pipelineSteps = [
    {
      id: 0,
      title: "1. Paste Text",
      short: "Ingestion",
      desc: "Headline, social post, or news excerpt",
      icon: FileText,
      badge: "Raw Input"
    },
    {
      id: 1,
      title: "2. Clean & Vectorize",
      short: "TF-IDF Extraction",
      desc: "Tokenizes 1-2 n-grams & calculates vocabulary weights",
      icon: Binary,
      badge: "5,000 N-Grams"
    },
    {
      id: 2,
      title: "3. ML Inference",
      short: "Logistic Classifier",
      desc: "Evaluates statistical decision boundary trained on 6,306 articles",
      icon: Cpu,
      badge: "Supervised Model"
    },
    {
      id: 3,
      title: "4. Explain & Verify",
      short: "Explainable Output",
      desc: "Extracts token signals & recommends primary-source fact-checking",
      icon: CheckCircle2,
      badge: "Responsible AI"
    }
  ];

  return (
    <section id="hero" className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Background radial gradient accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-100/40 via-teal-50/20 to-transparent pointer-events-none -z-10 rounded-b-[4rem]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Screening pill badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/90 shadow-sm mb-6">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>AI-assisted first-level screening</span>
            <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
            <span className="text-emerald-700 font-medium">Cyber AI Hackathon 2026</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#0F172A] font-serif leading-[1.15]">
            Before you believe it. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-900 bg-clip-text text-transparent">
              Before you share it.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            TruthCheck uses a trained machine-learning model to examine online claims, 
            reveal lexical signals learned from historical news patterns, and help you 
            decide when critical secondary verification is needed.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                const el = document.getElementById('analyze');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 shadow-md shadow-emerald-700/25 transition-all cursor-pointer"
            >
              <span>Start Analysis</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('how-it-works');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-sm transition-all cursor-pointer"
            >
              How it works
            </button>
          </div>

          {/* Responsible advisory note */}
          <div className="mt-6 inline-flex items-center gap-2 text-xs text-slate-500">
            <Info className="w-3.5 h-3.5 text-slate-400" />
            <span>Designed for educational screening; statistical signals are not definitive proofs of truth or falsehood.</span>
          </div>
        </div>

        {/* Custom Visual: Information Moving Through Analysis Process */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="p-6 sm:p-8 rounded-3xl bg-white/80 border border-slate-200/90 shadow-xl shadow-slate-200/50 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-100 gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  Interactive Pipeline Architecture
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-2">
                  How Information Flows Through TruthCheck
                </h3>
              </div>
              <p className="text-xs text-slate-500 max-w-xs sm:text-right">
                Click any stage below to inspect the transformation pipeline.
              </p>
            </div>

            {/* Pipeline Stage Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              {pipelineSteps.map((step) => {
                const Icon = step.icon;
                const isSelected = activeStep === step.id;
                return (
                  <div
                    key={step.id}
                    onClick={() => setActiveStep(step.id)}
                    className={`cursor-pointer p-4 rounded-2xl border transition-all ${
                      isSelected
                        ? 'bg-gradient-to-b from-emerald-50/70 to-teal-50/40 border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                        : 'bg-slate-50/60 border-slate-200 hover:border-slate-300 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className={`p-2 rounded-xl ${isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-200/70 text-slate-600'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-emerald-200/70 text-emerald-900' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {step.badge}
                      </span>
                    </div>
                    <h4 className="font-semibold text-sm text-slate-900 mt-3">{step.title}</h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{step.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Detailed Active Step Inspector */}
            <div className="mt-6 p-5 rounded-2xl bg-[#FAF9F6] border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-emerald-700 tracking-wider uppercase">Active Stage Inspection</span>
                <p className="text-sm font-semibold text-slate-800">
                  {pipelineSteps[activeStep].title}: <span className="font-normal text-slate-600">{pipelineSteps[activeStep].desc}</span>
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Supervised Model Ready
                </span>
                <button
                  onClick={() => {
                    const el = document.getElementById('analyze');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 underline underline-offset-4 cursor-pointer"
                >
                  Try an example &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
