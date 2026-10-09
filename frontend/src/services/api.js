/**
 * TruthCheck API Client Service
 * Handles communication with the Flask backend.
 */

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL !== undefined && import.meta.env.VITE_API_BASE_URL !== '')
  ? import.meta.env.VITE_API_BASE_URL
  : '';

export async function checkBackendHealth() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    
    const response = await fetch(`${API_BASE_URL}/api/health`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      return { 
        connected: false, 
        error: `Server responded with status ${response.status}`,
        details: null 
      };
    }
    const data = await response.json();
    return { 
      connected: true, 
      error: null, 
      details: data 
    };
  } catch (err) {
    return { 
      connected: false, 
      error: err.name === 'AbortError' ? 'Connection timed out' : 'Backend offline or unreachable',
      details: null 
    };
  }
}

export async function analyzeContent(text) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMessage = data?.message || data?.error || `Analysis failed with HTTP ${response.status}`;
      return {
        success: false,
        error: errorMessage,
        status: response.status,
      };
    }

    return {
      success: true,
      data,
    };
  } catch (err) {
    return {
      success: false,
      error: `Could not connect to TruthCheck backend server at ${API_BASE_URL}. Please ensure the Flask backend is running on port 5000.`,
      isNetworkError: true,
    };
  }
}
