import React, { useState } from 'react';
import { 
  Send, 
  Trash2, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  Lock, 
  HelpCircle, 
  RefreshCw,
  FileText
} from 'lucide-react';
import { analyzeContent } from '../services/api';
import AnalysisResults from './AnalysisResults';

export default function AnalysisWorkspace({ backendStatus }) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);

  const MAX_CHARS = 2500;
  const MIN_CHARS = 15;

  const examplePresets = [
    {
      title: "Diplomatic Wire Report",
      category: "Reliable Pattern",
      badgeColor: "emerald",
      text: "U.S. Secretary of State John F. Kerry said Monday that he will stop in Paris later this week, amid criticism that no top American officials attended Sunday's unity march against terrorism. Kerry said he expects to arrive in Paris Thursday evening, as he heads home after a week abroad."
    },
    {
      title: "Viral Conspiracy Claim",
      category: "Misleading Pattern",
      badgeColor: "amber",
      text: "SHOCKING PROOF: Classified documents leak revealing global elites secretly developed chemical mind control agents. Mainstream media is desperately trying to censor this viral video before it destroys them! Share this urgently before it is deleted!"
    },
    {
      title: "Secret Miracle Health Cure",
      category: "Sensationalized",
      badgeColor: "amber",
      text: "Doctors are STUNNED! Ancient miracle fruit extract completely eradicates all stages of illness in just 48 hours without prescription medication. Big pharma is bribing officials to keep this secret from reaching the public."
    },
    {
      title: "Federal Economic Update",
      category: "Reliable Pattern",
      badgeColor: "emerald",
      text: "The Federal Reserve released its quarterly economic summary on Wednesday, indicating steady labor market resilience alongside controlled price stabilization. Committee officials reaffirmed plans to adjust fiscal targets based on forthcoming quarterly reports."
    }
  ];

  const handleSelectExample = (text) => {
    setInputText(text);
    setErrorMsg(null);
    setAnalysisResult(null);
  };

  const handleClear = () => {
    setInputText('');
    setErrorMsg(null);
    setAnalysisResult(null);
  };

  const handleAnalyze = async () => {
    const trimmed = inputText.trim();
    if (!trimmed) {
      setErrorMsg("Please paste or type text before analyzing.");
      return;
    }
    if (trimmed.length < MIN_CHARS) {
      setErrorMsg(`Text is too short (${trimmed.length} characters). Please enter at least ${MIN_CHARS} characters for reliable lexical analysis.`);
      return;
    }
    if (trimmed.length > MAX_CHARS) {
      setErrorMsg(`Text exceeds the maximum limit of ${MAX_CHARS} characters.`);
      return;
    }

    setErrorMsg(null);
    setIsLoading(true);
    setLoadingStep(1);

    // Multi-stage visual progress for realistic feedback
    const timer1 = setTimeout(() => setLoadingStep(2), 250);
    const timer2 = setTimeout(() => setLoadingStep(3), 500);

    try {
      const resp = await analyzeContent(trimmed);
      clearTimeout(timer1);
      clearTimeout(timer2);

      if (!resp.success) {
        setErrorMsg(resp.error || "An unexpected error occurred during analysis.");
        setAnalysisResult(null);
      } else {
        setAnalysisResult(resp.data);
        // Smooth scroll to results
        setTimeout(() => {
          const el = document.getElementById('results-card');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    } catch (err) {
      setErrorMsg("Failed to communicate with analysis server.");
    } finally {
      setIsLoading(false);
      setLoadingStep(0);
    }
  };

  const handleKeyDown = (e) => {
    // Ctrl+Enter or Cmd+Enter to submit
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleAnalyze();
    }
  };

  return (
    <section id="analyze" className="py-16 md:py-24 bg-[#FAF9F6]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Content Analysis Workspace
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] font-serif mt-3">
            Examine Claims & News Excerpts
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Paste a suspicious headline, article fragment, or social post below to evaluate 
            linguistic similarity against verified news classification benchmarks.
          </p>
        </div>

        {/* Backend offline warning banner if disconnected */}
        {backendStatus && !backendStatus.connected && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200/90 text-amber-900 text-xs flex items-center justify-between gap-3 shadow-sm">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>
                <strong>Flask Backend Offline:</strong> Start the Python API with <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">python backend/app.py</code> on port 5000 to enable real model inference.
              </span>
            </div>
            <span className="px-2 py-0.5 rounded bg-amber-200/80 font-semibold text-[10px] shrink-0">
              Offline
            </span>
          </div>
        )}

        {/* Example Presets Selector */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-emerald-700" />
              Quick Benchmark Presets:
            </span>
            <span className="text-[11px] text-slate-500">Click any preset to test</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {examplePresets.map((preset, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSelectExample(preset.text)}
                className="text-left p-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-emerald-300 text-xs transition-all shadow-2xs group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-slate-800 group-hover:text-emerald-800">
                    {preset.title}
                  </span>
                  <span className={`text-[10px] font-semibold px-2 py-0.2 rounded-full ${
                    preset.badgeColor === 'emerald' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {preset.category}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-1 italic">
                  "{preset.text}"
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Main Text Input Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/40 relative">
          <label htmlFor="claim-textarea" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Target Claim or Article Excerpt
          </label>

          <div className="relative">
            <textarea
              id="claim-textarea"
              rows={6}
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                if (errorMsg) setErrorMsg(null);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Paste a news headline, social media post, forwarded rumor, or article excerpt here to examine with TruthCheck (minimum 15 characters)..."
              maxLength={MAX_CHARS}
              className="w-full p-4 rounded-2xl bg-[#FAF9F6] border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-slate-900 placeholder:text-slate-400 text-sm leading-relaxed transition-all resize-y outline-hidden font-sans"
            />
          </div>

          {/* Character Counter & Privacy Note */}
          <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-500 gap-2">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>Please do not enter passwords, credit cards, or sensitive personal information.</span>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto font-mono text-xs">
              <span className={inputText.length > MAX_CHARS * 0.9 ? 'text-amber-700 font-bold' : 'text-slate-500'}>
                {inputText.length} / {MAX_CHARS} chars
              </span>
              <span className="text-slate-300">|</span>
              <span>{inputText.trim() ? inputText.trim().split(/\s+/).length : 0} words</span>
            </div>
          </div>

          {/* Validation Error Message */}
          {errorMsg && (
            <div className="mt-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Validation Notice: </span>
                <span>{errorMsg}</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="hidden sm:inline-block text-[11px] text-slate-400">
              Pro-tip: Press <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded text-slate-600 font-mono">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded text-slate-600 font-mono">Enter</kbd> to analyze
            </span>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={handleClear}
                disabled={isLoading || !inputText}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>

              <button
                type="button"
                onClick={handleAnalyze}
                disabled={isLoading || !inputText.trim()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 shadow-md shadow-emerald-700/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Analyze Content</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Loading Indicator with Animated Step Transitions */}
          {isLoading && (
            <div className="mt-6 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 space-y-2 animate-in fade-in duration-200">
              <div className="flex items-center justify-between font-semibold">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
                  Processing linguistic tokens with trained model...
                </span>
                <span className="font-mono text-[11px] text-emerald-700">Pipeline active</span>
              </div>
              <div className="w-full bg-emerald-200/60 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-600 h-full transition-all duration-300"
                  style={{ width: `${loadingStep * 33}%` }}
                />
              </div>
              <p className="text-[11px] text-emerald-700 italic">
                Step {loadingStep} of 3: {
                  loadingStep === 1 ? 'Extracting TF-IDF 1-2 n-grams...' :
                  loadingStep === 2 ? 'Evaluating Logistic Regression decision boundary...' :
                  'Calculating token explainability and verification advisory...'
                }
              </p>
            </div>
          )}
        </div>

        {/* Results Component (Rendered conditionally on success) */}
        {analysisResult && (
          <AnalysisResults 
            result={analysisResult} 
            onReset={handleClear}
            originalText={inputText}
          />
        )}
      </div>
    </section>
  );
}
