"""
TruthCheck Comprehensive Backend Test Suite
Tests:
1. Health endpoint and metrics verification
2. Empty input validation (400)
3. Short input validation <15 chars (400)
4. Long input validation >10000 chars (400)
5. Reliable news sample analysis
6. Misleading news sample analysis
7. Model signal explainability calculation
"""

import json
from app import app

def run_tests():
    print("==================================================")
    print("TruthCheck Backend Comprehensive Test Suite")
    print("Hackathon: Cyber AI Hackathon 2026 | Team T-103")
    print("==================================================")
    client = app.test_client()

    # 1. Health check
    res = client.get("/api/health")
    assert res.status_code == 200, f"Health check status: {res.status_code}"
    health = res.get_json()
    assert health["status"] == "healthy"
    assert health["model_loaded"] is True
    assert "metrics" in health
    acc = health["metrics"]["accuracy"]
    print(f" [PASS] 1. Health check: Model loaded = True, Benchmark Accuracy = {acc * 100:.2f}%")

    # 2. Empty input
    res = client.post("/api/analyze", json={"text": ""})
    assert res.status_code == 400
    assert "error" in res.get_json()
    print(" [PASS] 2. Empty input validation (HTTP 400 with helpful message)")

    # 3. Short input (<15 chars)
    res = client.post("/api/analyze", json={"text": "Breaking news!"})
    assert res.status_code == 400
    assert "Text too short" in res.get_json()["error"]
    print(" [PASS] 3. Short input validation (HTTP 400 for <15 characters)")

    # 4. Long input (>10,000 chars)
    long_text = "Breaking analysis: " + ("word " * 2500)
    res = client.post("/api/analyze", json={"text": long_text})
    assert res.status_code == 400
    assert "Text too long" in res.get_json()["error"]
    print(" [PASS] 4. Overly long input validation (HTTP 400 for >10,000 characters)")

    # 5. Reliable news sample
    reliable_text = (
        "U.S. Secretary of State John F. Kerry said Monday that he will stop in Paris later this week, "
        "amid criticism that no top American officials attended Sunday's unity march against terrorism. "
        "Kerry said he expects to arrive in Paris Thursday evening, as he heads home after a week abroad."
    )
    res = client.post("/api/analyze", json={"text": reliable_text})
    assert res.status_code == 200
    data_rel = res.get_json()
    assert data_rel["is_misleading"] is False
    assert data_rel["probabilities"]["reliable"] > 0.70
    assert len(data_rel["features_analysis"]["top_reliable_signals"]) > 0
    print(f" [PASS] 5. Reliable sample analysis: '{data_rel['prediction']}' ({data_rel['confidence_score']}% confidence)")
    print(f"         Reliable signal words: {[s['token'] for s in data_rel['features_analysis']['top_reliable_signals'][:3]]}")

    # 6. Misleading news sample
    misleading_text = (
        "SHOCKING PROOF: Classified documents leak revealing global elites secretly developed "
        "chemical agents to alter DNA. Mainstream media covers up the truth! Share before censors delete!"
    )
    res = client.post("/api/analyze", json={"text": misleading_text})
    assert res.status_code == 200
    data_mis = res.get_json()
    assert data_mis["is_misleading"] is True
    assert data_mis["probabilities"]["misleading"] > 0.70
    assert len(data_mis["features_analysis"]["top_misleading_signals"]) > 0
    print(f" [PASS] 6. Misleading sample analysis: '{data_mis['prediction']}' ({data_mis['confidence_score']}% confidence)")
    print(f"         Misleading signal words: {[s['token'] for s in data_mis['features_analysis']['top_misleading_signals'][:3]]}")

    # 7. Verification advisory structure
    assert "advisory" in data_mis
    assert "recommended_steps" in data_mis
    assert len(data_mis["recommended_steps"]) >= 4
    print(" [PASS] 7. Verification advisory & responsible disclaimer verified")

    print("\n>>> ALL TEST CASES PASSED SUCCESSFULLY (7/7) <<<")

if __name__ == "__main__":
    run_tests()
