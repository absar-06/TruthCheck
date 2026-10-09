"""
TruthCheck ML Training Pipeline
Hackathon: Cyber AI Hackathon 2026
Team: Techie Bloomers (T-103) - SRM Institute of Science and Technology
Dataset: McIntire Fake or Real News Benchmark Dataset (6,335 articles)
Model: TF-IDF (1-2 grams) + Logistic Regression Classifier
"""

import os
import json
import joblib
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix,
    classification_report
)

def train_truthcheck_model():
    dataset_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "dataset", "fake_or_real_news.csv")
    output_model_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "model_pipeline.joblib")
    output_metrics_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "model_metrics.json")

    print(f"--> [TruthCheck Pipeline] Loading dataset from: {dataset_path}")
    if not os.path.exists(dataset_path):
        raise FileNotFoundError(f"Dataset not found at {dataset_path}. Please download fake_or_real_news.csv.")

    df = pd.read_csv(dataset_path)
    initial_rows = len(df)
    print(f"--> Loaded raw records: {initial_rows}")

    # Data Cleaning
    # Drop rows missing label or text
    df = df.dropna(subset=['label'])
    
    # Standardize labels: 'FAKE' -> 1 (Misleading), 'REAL' -> 0 (Reliable)
    label_map = {'FAKE': 1, 'REAL': 0}
    df['target'] = df['label'].map(label_map)
    df = df.dropna(subset=['target'])
    df['target'] = df['target'].astype(int)

    # Combine title and text to handle both headline-only and excerpt queries
    df['title'] = df['title'].fillna('')
    df['text'] = df['text'].fillna('')
    df['clean_text'] = (df['title'] + " " + df['text']).str.strip()
    
    # Remove empty or whitespace-only articles
    df = df[df['clean_text'].str.len() > 10]
    
    # Drop exact duplicates
    df = df.drop_duplicates(subset=['clean_text'])
    clean_rows = len(df)
    print(f"--> Cleaned records after deduplication and validation: {clean_rows}")
    print(f"--> Class balance: Reliable (0) = {(df['target'] == 0).sum()}, Misleading (1) = {(df['target'] == 1).sum()}")

    # Train / Test split (80% train, 20% test with stratification)
    X = df['clean_text'].values
    y = df['target'].values

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.20, random_state=42, stratify=y
    )
    print(f"--> Train set size: {len(X_train)} | Test set size: {len(X_test)}")

    # Vectorization: Fit TF-IDF ONLY on training data to avoid data leakage
    print("--> Fitting TF-IDF Vectorizer (max_features=5000, ngram_range=(1,2), english stopwords)...")
    vectorizer = TfidfVectorizer(
        max_features=5000,
        ngram_range=(1, 2),
        stop_words='english',
        sublinear_tf=True,
        min_df=3
    )
    X_train_vec = vectorizer.fit_transform(X_train)
    X_test_vec = vectorizer.transform(X_test)

    # Train Logistic Regression
    print("--> Training Logistic Regression classifier (C=1.0, max_iter=1000)...")
    clf = LogisticRegression(C=1.0, max_iter=1000, random_state=42)
    clf.fit(X_train_vec, y_train)

    # Evaluation on unseen test set
    y_pred = clf.predict(X_test_vec)
    y_prob = clf.predict_proba(X_test_vec)[:, 1]

    accuracy = float(accuracy_score(y_test, y_pred))
    precision = float(precision_score(y_test, y_pred))
    recall = float(recall_score(y_test, y_pred))
    f1 = float(f1_score(y_test, y_pred))
    cm = confusion_matrix(y_test, y_pred).tolist()

    report_dict = classification_report(y_test, y_pred, target_names=["Reliable", "Misleading"], output_dict=True)

    print("\n================ EVALUATION METRICS ================")
    print(f"Accuracy:  {accuracy * 100:.2f}%")
    print(f"Precision: {precision * 100:.2f}%")
    print(f"Recall:    {recall * 100:.2f}%")
    print(f"F1-Score:  {f1 * 100:.2f}%")
    print(f"Confusion Matrix:\nTN={cm[0][0]}, FP={cm[0][1]}\nFN={cm[1][0]}, TP={cm[1][1]}")
    print("===================================================\n")

    # Save artifacts
    metrics_data = {
        "dataset_name": "McIntire Fake/Real News Benchmark",
        "total_samples": int(clean_rows),
        "train_samples": int(len(X_train)),
        "test_samples": int(len(X_test)),
        "accuracy": round(accuracy, 4),
        "precision": round(precision, 4),
        "recall": round(recall, 4),
        "f1_score": round(f1, 4),
        "confusion_matrix": {
            "true_negative": cm[0][0],
            "false_positive": cm[0][1],
            "false_negative": cm[1][0],
            "true_positive": cm[1][1]
        },
        "classification_report": report_dict,
        "algorithm": "Logistic Regression with TF-IDF (1-2 grams)",
        "features_count": int(len(vectorizer.get_feature_names_out()))
    }

    with open(output_metrics_path, "w", encoding="utf-8") as f:
        json.dump(metrics_data, f, indent=2)
    print(f"--> Saved evaluation metrics to: {output_metrics_path}")

    # Save pipeline dictionary
    pipeline_bundle = {
        "vectorizer": vectorizer,
        "classifier": clf,
        "classes": [0, 1],
        "class_labels": {
            0: "More consistent with the reliable class learned from dataset",
            1: "Potentially misleading"
        },
        "metrics_summary": {
            "accuracy": round(accuracy, 4),
            "f1_score": round(f1, 4)
        }
    }

    joblib.dump(pipeline_bundle, output_model_path)
    print(f"--> Model bundle saved successfully to: {output_model_path}")
    return metrics_data

if __name__ == "__main__":
    train_truthcheck_model()
