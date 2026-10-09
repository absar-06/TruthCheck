import React from 'react';
import { 
  Users, 
  AlertTriangle, 
  BarChart, 
  CheckCircle2, 
  HelpCircle, 
  Award,
  GraduationCap,
  Scale
} from 'lucide-react';

export default function AboutAndLimitations({ backendStatus }) {
  const metrics = backendStatus?.details?.metrics || {
    accuracy: 0.9247,
    precision: 0.9024,
    recall: 0.9525,
    f1_score: 0.9268,
    total_samples: 6306,
    train_samples: 5044,
    test_samples: 1262,
    confusion_matrix: {
      true_negative: 566,
      false_positive: 65,
      false_negative: 30,
      true_positive: 601
    }
  };

  const teamMembers = [
    {
      name: "Absar Khan F",
      role: "Team Lead & AI/ML / Backend",
      responsibilities: "Designed ML training pipeline, TF-IDF vectorizer, Logistic Regression classifier, Flask REST API endpoints, explainability coefficient math, and integration testing."
    },
    {
      name: "Girish",
      role: "Frontend & UI/UX Design",
      responsibilities: "Designed editorial interface design system, React & Tailwind component hierarchy, responsive layouts, interactive pipeline visualizer, and accessibility contrast."
    },
    {
      name: "Promoth",
      role: "Dataset Preparation & Testing",
      responsibilities: "Curated and validated benchmark dataset provenance, cleaned duplicates, conducted test case evaluations, and developed project documentation."
    }
  ];

  return (
    <section id="about" className="py-20 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            About TruthCheck & Academic Transparency
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] font-serif mt-3">
            Why We Built TruthCheck & Where It Fits
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Misinformation spreads faster than corrections can be published. 
            TruthCheck was developed as an educational, first-tier screening tool for the Cyber AI Hackathon 2026.
          </p>
        </div>

        {/* The Problem & Who It Helps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-7 rounded-3xl bg-[#FAF9F6] border border-slate-200 space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-serif">
              The Misinformation Problem
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Modern digital communication platforms facilitate the instantaneous transmission of sensational, 
              fabricated, or out-of-context text. Manual fact-checking organizations face exponential bottlenecks. 
              TruthCheck offers a fast, client-accessible first-tier filter that alerts users to characteristic 
              vocabulary markers so they pause, think, and verify before amplifying falsehoods.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-[#FAF9F6] border border-slate-200 space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-serif">
              Who TruthCheck Helps
            </h3>
            <ul className="text-xs sm:text-sm text-slate-600 space-y-2.5">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Everyday Social Media Users:</strong> Screen viral messages before forwarding on messaging apps.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Students & Researchers:</strong> Learn how NLP models identify lexical style differences in media.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Digital Literacy Educators:</strong> Teach critical verification habits using an explainable, open AI platform.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Real Model Benchmark Evaluation Card */}
        <div className="p-8 rounded-3xl bg-[#FAF9F6] border border-slate-200/90 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-200 gap-2">
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-100/70 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Measured Model Performance
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-2 font-serif">
                Supervised Model Evaluation Metrics (Unseen Test Set)
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-mono">
              Dataset: McIntire Benchmark (6,306 Verified Articles)
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center space-y-1">
              <span className="text-xs text-slate-500 font-medium">Test Accuracy</span>
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-mono">
                {(metrics.accuracy * 100).toFixed(2)}%
              </p>
              <span className="text-[10px] text-slate-400">Overall correctness</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center space-y-1">
              <span className="text-xs text-slate-500 font-medium">Precision (Misleading)</span>
              <p className="text-2xl sm:text-3xl font-extrabold text-teal-700 font-mono">
                {(metrics.precision * 100).toFixed(2)}%
              </p>
              <span className="text-[10px] text-slate-400">Low false alarm rate</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center space-y-1">
              <span className="text-xs text-slate-500 font-medium">Recall (Misleading)</span>
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-mono">
                {(metrics.recall * 100).toFixed(2)}%
              </p>
              <span className="text-[10px] text-slate-400">High sensitivity</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center space-y-1">
              <span className="text-xs text-slate-500 font-medium">F1-Score</span>
              <p className="text-2xl sm:text-3xl font-extrabold text-teal-700 font-mono">
                {(metrics.f1_score * 100).toFixed(2)}%
              </p>
              <span className="text-[10px] text-slate-400">Harmonic balance</span>
            </div>
          </div>

          {/* Confusion Matrix Breakdown */}
          {metrics.confusion_matrix && (
            <div className="mt-6 p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-0.5">
                <span className="font-bold text-slate-800">Test Set Confusion Matrix (1,262 Samples):</span>
                <p className="text-slate-500">True Negative: {metrics.confusion_matrix.true_negative} | False Positive: {metrics.confusion_matrix.false_positive} | False Negative: {metrics.confusion_matrix.false_negative} | True Positive: {metrics.confusion_matrix.true_positive}</p>
              </div>
              <span className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-medium text-[11px] border border-emerald-200 shrink-0">
                Verified on Stratified 20% Split
              </span>
            </div>
          )}
        </div>

        {/* Genuine Limitations */}
        <div className="p-8 rounded-3xl bg-amber-50/50 border border-amber-200/90 space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-700" />
            <h3 className="text-lg font-bold text-amber-950 font-serif">
              Known Limitations & Academic Constraints
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-amber-900/90 leading-relaxed pt-2">
            <div className="space-y-1.5 p-4 rounded-2xl bg-white/80 border border-amber-200">
              <span className="font-bold text-amber-950">1. Lexical Patterns ≠ Factual Truth</span>
              <p>
                The model assesses linguistic syntax, vocabulary choice, and emotional tone. A fabricated story written in calm, declarative wire-service prose may not be caught by style classification alone.
              </p>
            </div>

            <div className="space-y-1.5 p-4 rounded-2xl bg-white/80 border border-amber-200">
              <span className="font-bold text-amber-950">2. No Live Web Fact-Checking</span>
              <p>
                TruthCheck operates on offline trained model weights. It does not scrape live news feeds or browse real-time search engines during inference.
              </p>
            </div>

            <div className="space-y-1.5 p-4 rounded-2xl bg-white/80 border border-amber-200">
              <span className="font-bold text-amber-950">3. Satire & Sarcasm Vulnerability</span>
              <p>
                Satirical publications often deliberately mirror legitimate journalistic style for parody, which can cause ambiguous classification scores.
              </p>
            </div>
          </div>
        </div>

        {/* Hackathon Team Credits */}
        <div className="p-8 rounded-3xl bg-[#FAF9F6] border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-200 gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Hackathon Submission Details
              </span>
              <h3 className="text-xl font-bold text-slate-900 font-serif mt-1">
                Team Techie Bloomers (T-103)
              </h3>
            </div>
            <div className="text-left sm:text-right">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                Cyber AI Hackathon 2026
              </span>
              <p className="text-xs text-slate-500 mt-1">SRM Institute of Science and Technology</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-700 text-white font-bold text-xs flex items-center justify-center">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{member.name}</h4>
                    <span className="text-[11px] font-semibold text-emerald-700">{member.role}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  {member.responsibilities}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
