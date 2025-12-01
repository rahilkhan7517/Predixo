"use client";
import { useState } from "react";

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function getPrediction() {
    if (!keyword.trim()) return;

    setLoading(true);
    setResult("");

    const res = await fetch("/api/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keyword }),
    });

    const data = await res.json();
    setResult(data.prediction);
    setLoading(false);
  }

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>PREDIXO</h1>
      <p>Your AI Forecasting Assistant</p>

      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Enter any topic (e.g., gold price, stocks, fashion)"
        style={{
          padding: "10px",
          width: "300px",
          marginTop: "20px",
          fontSize: "16px",
        }}
      />

      <br /><br />

      <button
        onClick={getPrediction}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        {loading ? "Predicting..." : "Predict"}
      </button>

      {result && (
        <div style={{ marginTop: "30px", width: "60%", margin: "auto" }}>
          <h3>Prediction Result:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
