"""
TruthCheck Comprehensive Backend Test Suite
Tests:
1. Health endpoint and metrics verification
2. Empty input validation (400)
3. Short input validation <15 chars (400)
4. Long input validation >10000 chars (400)
5. Non-string input type validation (400)
6. Missing JSON / invalid body validation (400)
7. Reliable news sample analysis (Real prediction)
8. Misleading news sample analysis (Real prediction)
9. Probability sum and mathematical calibration check
10. Feature explainability weight check (TF-IDF * coef)
11. Model-loading error simulation (HTTP 503)
"""

import json
import app as flask_app
from app import app

def run_tests():
    print("==================================================")
    print("TruthCheck Backend Comprehensive Audit Test Suite")
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
    assert acc == 0.9247, f"Expected 0.9247, got {acc}"
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

    # 5. Non-string input type
    res = client.post("/api/analyze", json={"text": 987654})
    assert res.status_code == 400
    assert "Invalid input type" in res.get_json()["error"]
    print(" [PASS] 5. Non-string input type validation (HTTP 400 for integer)")

    # 6. Missing JSON / invalid payload
    res = client.post("/api/analyze", data="plain text not json", content_type="text/plain")
    assert res.status_code == 400
    assert "Invalid request body" in res.get_json()["error"]
    print(" [PASS] 6. Missing / non-JSON payload validation (HTTP 400)")

    # 7. Reliable news sample
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
    print(f" [PASS] 7. Reliable sample analysis: '{data_rel['prediction']}' ({data_rel['confidence_score']}% confidence)")
    print(f"         Reliable signal words: {[s['token'] for s in data_rel['features_analysis']['top_reliable_signals'][:3]]}")

    # 8. Misleading news sample
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
    print(f" [PASS] 8. Misleading sample analysis: '{data_mis['prediction']}' ({data_mis['confidence_score']}% confidence)")
    print(f"         Misleading signal words: {[s['token'] for s in data_mis['features_analysis']['top_misleading_signals'][:3]]}")

    # 9. Probability calibration check
    prob_sum = round(data_mis["probabilities"]["misleading"] + data_mis["probabilities"]["reliable"], 4)
    assert prob_sum == 1.0, f"Expected probabilities to sum to 1.0, got {prob_sum}"
    print(f" [PASS] 9. Probability consistency check: P(Misleading) + P(Reliable) = {prob_sum}")

    # 10. Mathematical explainability verification (TF-IDF * coef = contribution)
    first_signal = data_mis["features_analysis"]["top_misleading_signals"][0]
    calc_contrib = round(first_signal["tfidf_weight"] * first_signal["coefficient"], 4)
    assert first_signal["contribution_score"] == calc_contrib, f"Expected {calc_contrib}, got {first_signal['contribution_score']}"
    print(f" [PASS] 10. Explainable feature calculation verified: token='{first_signal['token']}', tfidf={first_signal['tfidf_weight']}, coef={first_signal['coefficient']} -> contribution={first_signal['contribution_score']}")

    # 11. Model-loading error simulation
    saved_bundle = flask_app.MODEL_BUNDLE
    try:
        flask_app.MODEL_BUNDLE = None  # simulate model unready
        res_err = client.post("/api/analyze", json={"text": "Test sample sentence to analyze."})
        assert res_err.status_code == 503, f"Expected 503 when model unready, got {res_err.status_code}"
        assert "Model not loaded" in res_err.get_json()["error"]
        print(" [PASS] 11. Model unready simulation: Correctly returned HTTP 503 with informative message")
    finally:
        flask_app.MODEL_BUNDLE = saved_bundle  # restore model

    print("\n>>> ALL 11 FUNCTIONAL AUDIT TESTS PASSED SUCCESSFULLY (11/11) <<<")

if __name__ == "__main__":
    run_tests()
