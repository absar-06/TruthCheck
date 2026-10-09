# TruthCheck — AI Misinformation Analysis Platform

> **Tagline:** Check. Understand. Then Share.  
> **Hackathon:** Cyber AI Hackathon 2026  
> **Team Name:** Techie Bloomers  
> **Team Number:** T-103  
> **Institute:** SRM Institute of Science and Technology  
> **Domain:** AI, Media, Communication and Society  
> **Project Stage:** Hackathon MVP  

---

## 1. Problem Statement

Modern social networks, private messaging channels, and digital media platforms facilitate the near-instantaneous transmission of unverified, sensationalized, and misleading content. In crisis periods or high-stakes civic events, misleading text circulates far more rapidly than professional fact-checking organizations can debunk it. 

Everyday citizens and students often lack an accessible, instantaneous screening tool that explains **why** a piece of text raises suspicion without relying on proprietary, opaque black-box AI services.

---

## 2. Proposed Solution

**TruthCheck** is an explainable, dataset-grounded NLP text analysis platform built to provide responsible, first-level screening for digital text. 

Rather than declaring absolute "truth" or "falsehood", TruthCheck:
1. Deconstructs input text using Term Frequency–Inverse Document Frequency (TF-IDF) feature weighting.
2. Evaluates the text against a supervised Logistic Regression model trained on 6,306 benchmark news items.
3. Reveals **why** the decision boundary shifted by presenting influential tokens and their mathematical feature contributions ($v_j \times \beta_j$).
4. Guides the user through a structured four-step verification workflow before they decide to share information online.

---

## 3. Target Users

- **Everyday Social Media Readers:** Screen viral forwarded messages or alarming claims before sharing them with friends or family.
- **Students & Researchers:** Learn how natural language processing models identify lexical and syntactic characteristics in media.
- **Digital Literacy Educators:** Demonstrate the mechanics of misinformation and feature explainability in classroom settings.
- **Online Content Moderators & Journalists:** Perform rapid first-pass lexical screening to prioritize claims requiring manual source verification.

---

## 4. Key Features

- **Grounded NLP Analysis:** Evaluates unigrams and bigrams using TF-IDF text vectorization across 5,000 vocabulary features.
- **Explainable Text Features:** Directly computes token contribution scores ($v_j \times \beta_j$) to expose which words influenced the prediction.
- **Dual Probability & Calibrated Confidence:** Displays class distribution percentages alongside a heuristic advisory level.
- **Responsible AI Verification Workflow:** Directs users to verify publisher domains, check wire agencies (Reuters/AP), and search IFCN fact-checkers (Snopes, Google Fact Check).
- **Honest AI Boundaries:** Never claims live web fact-checking or infallible real-world truth verification; transparently presents model limitations.
- **Editorial UI Design:** Light ivory background (`#FAF9F6`), deep navy typography, emerald accent, Inter typography, and fully responsive layouts.

---

## 5. Technology Stack

### Frontend
- **Framework:** React 19 + Vite 8
- **Styling:** Tailwind CSS v4 with custom editorial design tokens
- **Icons:** Lucide React
- **Architecture:** Modular components with live backend health monitoring (`Navbar`, `Hero`, `AnalysisWorkspace`, `AnalysisResults`, `HowItWorks`, `Features`, `AboutAndLimitations`, `Footer`)

### Backend
- **Framework:** Python 3.11 + Flask 3.0.3
- **CORS Handling:** Flask-CORS 4.0.1
- **Machine Learning & NLP:** scikit-learn 1.5.0, pandas 2.2.2, numpy 1.26.4, joblib 1.4.2
- **Serialization:** Joblib compressed pipeline bundle (`model_pipeline.joblib`)

### Dataset
- **Benchmark:** George McIntire Fake/Real News Benchmark Dataset
- **Provenance:** Curated academic dataset hosted by Prof. Lutz Hamel (Dept. of Computer Science and Statistics, University of Rhode Island)
- **Size:** 6,306 deduplicated and validated articles (Balanced: 3,154 Reliable, 3,152 Misleading)

---

## 6. Machine Learning Methodology

```
[ Raw Claim / Excerpt ]
         │
         ▼
[ Text Cleaning & Normalization ] (whitespace trimming, length validation)
         │
         ▼
[ TF-IDF Vectorization ] (1-2 ngrams, English stopwords filtered, min_df=3, 5000 max features)
         │
         ▼
[ Logistic Regression Classifier ] (C=1.0, L2 regularization, max_iter=1000)
         │
    ┌────┴───────────────────────────────┐
    ▼                                    ▼
[ Probability Calculation ]     [ Feature Explainability ]
P(Misleading) vs P(Reliable)    Contribution = TF-IDF(token) × β(token)
    │                                    │
    └────────────────┬───────────────────┘
                     ▼
[ Heuristic Advisory & Structured Fact-Checking Checklist ]
```

### Data Leakage Prevention
The TF-IDF vectorizer is fitted **strictly on the training partition** ($80\%$ split, 5,044 samples) and transformed onto the test partition ($20\%$ split, 1,262 samples). No test data statistics were exposed during vectorization or model fitting.

---

## 7. Model Evaluation Results (Actual Measured Values)

Evaluated on the independent test set ($N = 1,262$ unseen articles):

| Metric | Measured Value | Description |
| :--- | :---: | :--- |
| **Accuracy** | **92.47%** | Overall correct classifications across all classes |
| **Precision (Misleading)** | **90.24%** | Accuracy of positive misleading alerts (low false alarm rate) |
| **Recall (Misleading)** | **95.25%** | Sensitivity in catching misleading articles |
| **F1-Score (Misleading)** | **92.68%** | Harmonic mean of precision and recall |
| **Macro Average F1** | **92.47%** | Balanced across both classes |

### Confusion Matrix Breakdown (1,262 Samples)
- **True Negatives (Reliable correctly identified):** 566
- **False Positives (Reliable incorrectly flagged as misleading):** 65
- **False Negatives (Misleading incorrectly flagged as reliable):** 30
- **True Positives (Misleading correctly identified):** 601

*Metrics are stored and served live via `/api/health` from `backend/model_metrics.json`.*

---

## 8. Project Structure

```
TruthCheck/
├── .env.example                  # Root environment variable template
├── .gitignore                    # Git ignore file for Python, Node, and artifacts
├── README.md                     # Comprehensive hackathon presentation documentation
│
├── backend/                      # Python Flask Backend & ML Engine
│   ├── app.py                    # Flask REST API server (/api/health, /api/analyze)
│   ├── train.py                  # Reproducible model training pipeline
│   ├── test_api.py               # Complete backend automated test suite
│   ├── requirements.txt          # Python package requirements
│   ├── model_pipeline.joblib     # Trained TF-IDF + Logistic Regression model bundle
│   ├── model_metrics.json        # Measured test evaluation metrics
│   └── venv/                     # Python 3.11 virtual environment
│
├── dataset/                      # Dataset Directory
│   ├── download_dataset.py       # Automated dataset fetcher script
│   └── fake_or_real_news.csv     # McIntire Benchmark Dataset (6,306 articles, 29.3 MB)
│
└── frontend/                     # React + Vite Frontend
    ├── .env                      # Local environment configuration (VITE_API_BASE_URL)
    ├── .env.example              # Frontend environment template
    ├── package.json              # NPM dependencies & scripts
    ├── vite.config.js            # Vite configuration with Tailwind CSS plugin
    ├── index.html                # App shell with Inter font and brand favicon
    └── src/
        ├── main.jsx              # React DOM entrypoint
        ├── index.css             # Tailwind design tokens & custom styling
        ├── App.jsx               # Main container with heartbeat polling
        ├── services/
        │   └── api.js            # API client service with timeouts & error handling
        └── components/
            ├── Navbar.jsx        # Navigation, brand identity & live server status
            ├── Hero.jsx          # Headline, CTAs & interactive pipeline visualizer
            ├── AnalysisWorkspace.jsx # Text input, character counter & quick presets
            ├── AnalysisResults.jsx   # Results card, confidence bar & token signals
            ├── HowItWorks.jsx    # 4-step workflow cards
            ├── Features.jsx      # Platform capabilities & responsible boundaries
            ├── AboutAndLimitations.jsx # Problem, audience, metrics & team credits
            └── Footer.jsx        # Tagline, links, disclaimer & institutional attribution
```

---

## 9. Quickstart & Installation Instructions

### Prerequisites
- **Node.js:** v18 or higher (v24.16 installed)
- **Python:** 3.10 or 3.11 (Python 3.11.9 configured)
- **Git**

---

### Step 1: Clone and Set Up the Backend

1. Open a terminal in the project root:
   ```bash
   cd "e:\Truth Check\backend"
   ```

2. Activate the existing virtual environment (or create one):
   ```powershell
   # Windows PowerShell
   .\venv\Scripts\Activate.ps1
   ```

3. Install backend dependencies (already installed in venv):
   ```bash
   pip install -r requirements.txt
   ```

4. *(Optional — already trained)* Retrain the model anytime:
   ```bash
   python train.py
   ```

5. Run the automated backend test suite:
   ```bash
   python test_api.py
   ```

6. Start the Flask API server:
   ```bash
   python app.py
   ```
   *The server starts on `http://127.0.0.1:5000`.*

---

### Step 2: Set Up and Run the Frontend

1. Open a second terminal window:
   ```bash
   cd "e:\Truth Check\frontend"
   ```

2. Install npm packages (already installed):
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The application will be live at `http://localhost:5173`.*

---

## 10. API Endpoints

### `GET /api/health`
Checks backend availability, model bundle state, and returns evaluation metrics.

**Response:**
```json
{
  "status": "healthy",
  "service": "TruthCheck AI Misinformation Analysis Engine",
  "team": "Techie Bloomers (T-103)",
  "hackathon": "Cyber AI Hackathon 2026",
  "model_loaded": true,
  "metrics": {
    "accuracy": 0.9247,
    "precision": 0.9024,
    "recall": 0.9525,
    "f1_score": 0.9268,
    "total_samples": 6306
  }
}
```

### `POST /api/analyze`
Submits text for linguistic analysis and explainable feature extraction.

**Request Body:**
```json
{
  "text": "U.S. Secretary of State John F. Kerry said Monday that he will stop in Paris later this week..."
}
```

**Response:**
```json
{
  "prediction": "More consistent with the reliable class learned from dataset",
  "predicted_class": 0,
  "is_misleading": false,
  "confidence_score": 92.7,
  "probabilities": {
    "misleading": 0.073,
    "reliable": 0.927
  },
  "advisory": {
    "level": "Low Advisory",
    "badge_color": "emerald",
    "description": "The linguistic structure is more aligned with standard reporting patterns..."
  },
  "explanation": "The text utilizes reporting markers such as \"said\", \"paris\", \"week\"...",
  "features_analysis": {
    "top_misleading_signals": [...],
    "top_reliable_signals": [...]
  },
  "recommended_steps": [...]
}
```

---

## 11. Three-Minute Judge Demonstration Script

Follow this structured flow during the hackathon evaluation:

### Minute 0:00 – 0:45 | Introduction & Problem Context
1. **Open the browser** at `http://localhost:5173`.
2. **State the mission:**  
   *"Respected judges, we are Team Techie Bloomers (T-103) from SRM Institute of Science and Technology presenting TruthCheck. Our tagline is 'Check. Understand. Then Share.' In the era of algorithmic viral content, citizens need a fast, explainable first-tier screening tool that doesn't just give an opaque yes/no answer, but shows why a claim triggers suspicion."*
3. **Show the live status indicator** in the navbar:
   - Green pulsating dot: *"Our Flask NLP engine is live, serving a model with 92.5% tested accuracy on 6,306 benchmark articles."*

### Minute 0:45 – 1:45 | Live Analysis Demo (Reliable vs Misleading)
1. **Scroll to Content Analysis Workspace:**
2. **Demo 1 — Misleading Viral Claim:**
   - Click the preset: **"Viral Conspiracy Claim"**.
   - Text populates: *"SHOCKING PROOF: Classified documents leak revealing global elites secretly developed chemical mind control agents..."*
   - Click **"Analyze Content"**.
   - **Show the result:**
     - Prediction: *"Potentially misleading"* with 95.6% model probability.
     - Highlight the **Linguistic Text Features**: Point out tokens like `"share"`, `"mainstream"`, `"mainstream media"`, `"shocking"`.
     - Explain: *"Notice how our model computes the exact contribution score ($v_j \times \beta_j$). It flags sensational urgency markers that heavily correlate with viral hoaxes."*
3. **Demo 2 — Reliable Wire Report:**
   - Click **"Diplomatic Wire Report"**.
   - Text populates: *"U.S. Secretary of State John F. Kerry said Monday that he will stop in Paris later this week..."*
   - Click **"Analyze Content"**.
   - **Show the result:**
     - Prediction shifts immediately to *"More consistent with the reliable class learned from dataset"* (92.7% reliable).
     - Point out the calm, declarative signal words: `"said"`, `"paris"`, `"week"`, `"monday"`.

### Minute 1:45 – 2:30 | Responsible AI & Verification Workflow
1. **Highlight the "What Should I Do Next?" section:**
   - Show the 4 actionable verification steps (Domain authenticity, wire cross-referencing, IFCN database query, context check).
2. **Highlight the Responsible AI Disclaimer:**
   - Emphasize: *"We explicitly teach users that machine learning is a screening filter, not an infallible judge of truth. Statistical style alone does not replace primary journalistic verification."*
3. **Click "Copy Summary"**:
   - Show the toast confirming the formatted analysis report was copied to the clipboard.

### Minute 2:30 – 3:00 | Architecture & Team Wrap-Up
1. **Scroll to the Evaluation & Team Section:**
   - Review the measured metrics: 92.47% Accuracy, 90.24% Precision, 95.25% Recall, 92.68% F1-score.
   - Mention the team responsibilities:
     - **Absar Khan F:** Team Lead & AI/ML / Backend.
     - **Girish:** Frontend & UI/UX.
     - **Promoth:** Dataset Preparation & Testing.
2. **Closing:**  
   *"TruthCheck provides practical, explainable, and responsible digital media defense. Thank you, and we welcome your questions!"*

---

## 12. Known Limitations & Future Roadmap

### Limitations
1. **Lexical Stylistic Bias:** The model evaluates language and style; factual inaccuracies written in neutral, dry wire-service prose may evade style-based detection.
2. **Temporal Boundaries:** The model operates offline on historical news patterns and does not scrape live internet feeds during inference.
3. **Parody & Satire:** Satirical outlets (e.g., The Onion) often intentionally adopt credible journalistic style, which may cause ambiguous scores.

### Future Roadmap
- Integration with Google Fact Check Tools API for real-time claim matching.
- Multilingual support for regional Indian languages (Tamil, Hindi, Telugu).
- Browser extension for on-the-fly highlighting on social media platforms.

---

## 13. Team Details

**Cyber AI Hackathon 2026 — Team Techie Bloomers (T-103)**  
*SRM Institute of Science and Technology*

- **Absar Khan F** — *Team Lead and AI/ML & Backend*  
  Lead architecture, TF-IDF vectorization, Logistic Regression classifier, Flask API, explainability mathematics, integration testing.
- **Girish** — *Frontend and UI/UX*  
  Editorial design direction, typography system, React components, interactive pipeline visualizer, accessibility contrast.
- **Promoth** — *Dataset Preparation, Testing and Documentation*  
  Benchmark dataset curation, deduplication, test case execution, and hackathon presentation documentation.
