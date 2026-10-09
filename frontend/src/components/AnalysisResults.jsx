import React, { useState } from 'react';
import { 
  CheckCircle, 
  AlertTriangle, 
  HelpCircle, 
  Copy, 
  Check, 
  RotateCcw, 
  ExternalLink, 
  ShieldCheck, 
  TrendingUp, 
  FileCheck2, 
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function AnalysisResults({ result, onReset, originalText }) {
  const [copied, setCopied] = useState(false);
  const [showFeatureWeights, setShowFeatureWeights] = useState(false);

  if (!result) return null;

  const isMisleading = result.is_misleading;
  const probMisleading = result.probabilities?.misleading ?? 0.5;
  const probReliable = result.probabilities?.reliable ?? 0.5;
  const confidencePercent = result.confidence_score;
  const advisory = result.advisory;
  const features = result.features_analysis;

  const handleCopyReport = () => {
    const reportText = `[TruthCheck Analysis Report]
Prediction: ${result.prediction}
Confidence: ${confidencePercent}%
Model Probabilities: Misleading: ${(probMisleading * 100).toFixed(1)}% | Reliable: ${(probReliable * 100).toFixed(1)}%
Advisory Level: ${advisory?.level} (${advisory?.description})
Top Signals: ${
      isMisleading 
        ? features?.top_misleading_signals?.map(s => s.token).slice(0, 5).join(', ') 
        : features?.top_reliable_signals?.map(s => s.token).slice(0, 5).join(', ')
    }
Responsible Note: Algorithmic screening based on 6,306 news benchmark articles. Not absolute proof of truth or falsehood.
Evaluated via TruthCheck (Cyber AI Hackathon 2026 - Team Techie Bloomers T-103)`;

    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div id="results-card" className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* 1. Main Verdict Header Card */}
      <div className={`p-6 sm:p-8 rounded-3xl border transition-all shadow-lg ${
        isMisleading 
          ? 'bg-amber-50/70 border-amber-300/80 shadow-amber-900/5' 
          : 'bg-emerald-50/70 border-emerald-300/80 shadow-emerald-900/5'
      }`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`p-3.5 rounded-2xl flex items-center justify-center text-white ${
              isMisleading ? 'bg-amber-600 shadow-md shadow-amber-600/30' : 'bg-emerald-600 shadow-md shadow-emerald-600/30'
            }`}>
              {isMisleading ? (
                <AlertTriangle className="w-8 h-8 stroke-[2.2]" />
              ) : (
                <CheckCircle className="w-8 h-8 stroke-[2.2]" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Model Prediction
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                  isMisleading 
                    ? 'bg-amber-100 text-amber-900 border-amber-300' 
                    : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                }`}>
                  {advisory?.level || 'Needs Verification'}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-serif mt-1">
                {result.prediction}
              </h3>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
            <button
              onClick={handleCopyReport}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-2xs transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Report!' : 'Copy Summary'}</span>
            </button>
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-2xs transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Analyze Another</span>
            </button>
          </div>
        </div>

        {/* Confidence & Dual Probability Indicator */}
        <div className="mt-8 pt-6 border-t border-slate-200/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-medium text-slate-700 mb-2 gap-1">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-900">Statistical Model Confidence:</span>
              <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 font-mono font-bold text-slate-900">
                {confidencePercent}%
              </span>
              <span className="text-slate-500">(Derived via logistic probability calibration)</span>
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                Misleading: {(probMisleading * 100).toFixed(1)}%
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                Reliable: {(probReliable * 100).toFixed(1)}%
              </span>
            </div>
          </div>

          {/* Visual Dual Probability Bar */}
          <div className="h-4 w-full bg-slate-200 rounded-full overflow-hidden flex shadow-inner">
            <div 
              style={{ width: `${(probMisleading * 100).toFixed(1)}%` }} 
              className="bg-gradient-to-r from-amber-400 to-amber-500 h-full transition-all duration-700 relative"
              title={`Misleading class probability: ${(probMisleading * 100).toFixed(1)}%`}
            />
            <div 
              style={{ width: `${(probReliable * 100).toFixed(1)}%` }} 
              className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-full transition-all duration-700"
              title={`Reliable class probability: ${(probReliable * 100).toFixed(1)}%`}
            />
          </div>

          <p className="text-xs text-slate-500 mt-2 italic">
            * Note: These probabilities reflect similarity to training dataset distributions, not calibrated real-world truth percentages.
          </p>
        </div>
      </div>

      {/* 2. Plain-Language Explanation & Heuristic Advisory */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Info className="w-5 h-5 text-emerald-700" />
          <h4 className="font-bold text-slate-900 text-base">
            Plain-Language Analysis Explanation
          </h4>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed">
          {result.explanation}
        </p>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs text-slate-600 space-y-1">
          <div className="font-semibold text-slate-800 flex items-center gap-1.5">
            <span>Heuristic Advisory Assessment:</span>
            <span className="px-2 py-0.5 rounded bg-white border border-slate-200 font-bold text-slate-900">
              {advisory?.level}
            </span>
          </div>
          <p>{advisory?.description}</p>
        </div>
      </div>

      {/* 3. Explainable Text Features (TF-IDF & Logistic Regression Signals) */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-teal-700" />
            <h4 className="font-bold text-slate-900 text-base">
              Identified Linguistic Text Features
            </h4>
          </div>
          <button
            onClick={() => setShowFeatureWeights(!showFeatureWeights)}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 underline underline-offset-2 cursor-pointer"
          >
            {showFeatureWeights ? "Hide mathematical weights" : "Inspect mathematical weights (TF-IDF × β)"}
          </button>
        </div>

        <p className="text-xs text-slate-500">
          The table below highlights words in your text that actively shifted the model's logistic decision boundary.
          Features with positive coefficients lean toward misleading article patterns, while negative coefficients lean toward reliable reporting patterns.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Misleading Signals */}
          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                Misleading-Leaning Signals (+β)
              </span>
              <span className="text-[10px] font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                {features?.top_misleading_signals?.length || 0} matched
              </span>
            </div>

            {features?.top_misleading_signals && features.top_misleading_signals.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {features.top_misleading_signals.map((sig, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-xs font-medium text-amber-900 border border-amber-300 shadow-2xs"
                  >
                    <span className="font-semibold">"{sig.token}"</span>
                    {showFeatureWeights && (
                      <span className="text-[10px] text-amber-700 font-mono bg-amber-50 px-1 py-0.5 rounded">
                        +{sig.contribution_score}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">No significant misleading-leaning vocabulary detected in input text.</p>
            )}
          </div>

          {/* Reliable Signals */}
          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                Reliable-Leaning Signals (-β)
              </span>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                {features?.top_reliable_signals?.length || 0} matched
              </span>
            </div>

            {features?.top_reliable_signals && features.top_reliable_signals.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {features.top_reliable_signals.map((sig, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-xs font-medium text-emerald-900 border border-emerald-300 shadow-2xs"
                  >
                    <span className="font-semibold">"{sig.token}"</span>
                    {showFeatureWeights && (
                      <span className="text-[10px] text-emerald-700 font-mono bg-emerald-50 px-1 py-0.5 rounded">
                        {sig.contribution_score}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">No significant conventional news vocabulary markers detected in input text.</p>
            )}
          </div>
        </div>
      </div>

      {/* 4. "What Should I Do Next?" Sensible Verification Steps */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <FileCheck2 className="w-5 h-5 text-emerald-700" />
          <h4 className="font-bold text-slate-900 text-base">
            What Should I Do Next? — Recommended Verification Workflow
          </h4>
        </div>

        <p className="text-xs text-slate-600">
          AI predictions are first-pass indicators. Before citing or sharing this claim, follow this rigorous 4-step verification routine:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {result.recommended_steps?.map((step, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-[#FAF9F6] border border-slate-200 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span className="font-semibold text-xs text-slate-900">{step.step}</span>
              </div>
              <p className="text-xs text-slate-600 pl-7">{step.detail}</p>
            </div>
          ))}
        </div>

        {/* Fact check shortcut links */}
        <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
          <span className="text-slate-500 font-medium">Quick verification tools:</span>
          <a
            href="https://toolbox.google.com/factcheck/explorer"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
          >
            <span>Google Fact Check</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://www.snopes.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
          >
            <span>Snopes</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://www.reuters.com/fact-check/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
          >
            <span>Reuters Fact Check</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* 5. Responsible Machine Learning Disclaimer Banner */}
      <div className="p-5 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-slate-800">Responsible AI Screening Disclaimer:</span>
          <p>
            TruthCheck calculates vocabulary similarity based on 6,306 news articles in its benchmark training set. 
            It is an AI assistance tool, not an absolute arbiter of reality. A high confidence score indicates 
            alignment with dataset text patterns, not guaranteed factual truth or intentional falsehood.
          </p>
        </div>
      </div>
    </div>
  );
}
