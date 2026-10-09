import React from 'react';
import { 
  FileSearch, 
  Layers, 
  BarChart3, 
  Smile, 
  Compass, 
  ShieldAlert 
} from 'lucide-react';

export default function Features() {
  const featuresList = [
    {
      icon: FileSearch,
      title: "Basic NLP-Based Text Analysis",
      description: "Uses TF-IDF unigram and bigram extraction combined with a supervised Logistic Regression model to identify textual patterns learned from verified news benchmarks."
    },
    {
      icon: Layers,
      title: "Explainable Text Features",
      description: "Directly calculates how individual tokens shift the model's logistic decision score (TF-IDF weight × model coefficient), avoiding black-box mystification."
    },
    {
      icon: BarChart3,
      title: "Clear Result Presentation",
      description: "Presents predictions alongside dual-class probability bars, heuristic advisory indicators, and transparent confidence percentages without sensationalism."
    },
    {
      icon: Smile,
      title: "Beginner-Friendly Interface",
      description: "Clean, responsive editorial typography designed for everyday readers, students, and educators without requiring any machine learning background."
    },
    {
      icon: Compass,
      title: "Responsible Verification Guidance",
      description: "Provides structured four-step advice on verifying original sources, consulting IFCN fact-checkers, and checking publication timelines before sharing."
    },
    {
      icon: ShieldAlert,
      title: "Honest AI Boundaries",
      description: "Does not fabricate false certainty. Transparently discloses model limitations, dataset scope, and potential false positives/negatives."
    }
  ];

  return (
    <section id="features" className="py-20 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Platform Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] font-serif mt-3">
            Built for Explainability & Responsible Use
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            TruthCheck focuses on grounded, defensible text analysis. We intentionally prioritize 
            transparency and user digital literacy over exaggerated autonomous claims.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuresList.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Responsible Boundaries Callout */}
        <div className="mt-12 p-6 rounded-3xl bg-emerald-950 text-emerald-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
          <div className="space-y-1">
            <span className="text-xs font-bold tracking-wider text-emerald-400 uppercase">Integrity Commitment</span>
            <h4 className="text-lg font-bold text-white">TruthCheck Does Not Claim Automated Truth Determination</h4>
            <p className="text-xs text-emerald-200/80 max-w-3xl">
              Our platform analyzes writing style against historical datasets. We do not claim live internet scraping, automated web debunking, or infallibility. Critical thinking and primary source inspection remain indispensable.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-800 text-emerald-200 text-xs font-semibold shrink-0 border border-emerald-700">
            MVP Stage
          </span>
        </div>
      </div>
    </section>
  );
}
