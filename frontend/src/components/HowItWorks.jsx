import React from 'react';
import { ClipboardEdit, Sparkles, Cpu, CheckCheck, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: ClipboardEdit,
      title: "Paste Claim or Excerpt",
      tag: "Input Ingestion",
      description: "Users submit a headline, social media post, or article excerpt into the workspace. The text is checked for minimum length and stripped of extraneous whitespace."
    },
    {
      number: "02",
      icon: Sparkles,
      title: "Clean & Vectorize Text",
      tag: "NLP Preprocessing",
      description: "The text is tokenized into unigrams and bigrams. English stopwords are filtered, and Term Frequency-Inverse Document Frequency (TF-IDF) weights are computed across 5,000 features."
    },
    {
      number: "03",
      icon: Cpu,
      title: "Evaluate with ML Classifier",
      tag: "Supervised Learning",
      description: "A Logistic Regression classifier trained on 6,306 benchmark news items evaluates the linear decision boundary to determine class probability (Reliable vs Potentially Misleading)."
    },
    {
      number: "04",
      icon: CheckCheck,
      title: "Review Signals & Verify",
      tag: "Responsible Verification",
      description: "The user reviews contributing token signals, understands why the model flagged specific words, and follows our 4-step checklist to verify with primary sources and IFCN fact-checkers."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Methodology & Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] font-serif mt-3">
            A Transparent Four-Step Screening Process
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            TruthCheck demystifies machine learning. Rather than acting as a black box, 
            every step from ingestion to explainable feature extraction is open and transparent.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index}
                className="relative p-6 rounded-3xl bg-[#FAF9F6] border border-slate-200/90 hover:border-emerald-300 transition-all shadow-sm hover:shadow-md flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-extrabold font-mono text-emerald-700/60 group-hover:text-emerald-700 transition-colors">
                      {step.number}
                    </span>
                    <div className="p-2.5 rounded-2xl bg-white border border-slate-200 text-emerald-700 shadow-2xs group-hover:bg-emerald-600 group-hover:text-white transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {step.tag}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-1 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-semibold text-emerald-700">
                  <span>Step {index + 1} of 4</span>
                  <span className="text-slate-300">&rarr;</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
