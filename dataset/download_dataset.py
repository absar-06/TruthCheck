"""
TruthCheck Dataset Fetcher Utility
Downloads the academic McIntire Fake or Real News Benchmark Dataset.
Dataset Provenance: George McIntire, hosted by Prof. Lutz Hamel (Dept. of Computer Science & Statistics, Univ. of Rhode Island)
"""

import os
import urllib.request

DATASET_URL = "https://raw.githubusercontent.com/lutzhamel/fake-news/master/data/fake_or_real_news.csv"
DATASET_DIR = os.path.dirname(os.path.abspath(__file__))
TARGET_PATH = os.path.join(DATASET_DIR, "fake_or_real_news.csv")

def download_dataset():
    if os.path.exists(TARGET_PATH):
        print(f"[TruthCheck Dataset] Dataset already exists at: {TARGET_PATH}")
        print(f"File size: {os.path.getsize(TARGET_PATH) / (1024 * 1024):.2f} MB")
        return

    print(f"[TruthCheck Dataset] Downloading benchmark dataset from {DATASET_URL}...")
    req = urllib.request.Request(DATASET_URL, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as resp, open(TARGET_PATH, "wb") as f:
        f.write(resp.read())
    print(f"[TruthCheck Dataset] Successfully downloaded and saved to: {TARGET_PATH}")

if __name__ == "__main__":
    download_dataset()
