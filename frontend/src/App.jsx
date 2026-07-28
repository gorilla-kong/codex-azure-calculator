import { useState } from "react";

export default function App() {
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);

  async function calculate(event) {
    event.preventDefault();
    setError("");
    setResult(null);
    setIsCalculating(true);

    try {
      const response = await fetch("/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ x, y })
      });

      const body = await response.json();

      if (!response.ok) {
        throw new Error(body.error || "The calculation failed.");
      }

      setResult(body.result);
    } catch (requestError) {
      setError(requestError.message || "The calculation failed.");
    } finally {
      setIsCalculating(false);
    }
  }

  return (
    <main className="page-shell">
      <section className="calculator-card" aria-labelledby="page-title">
        <p className="eyebrow">Codex → GitHub → Azure</p>
        <h1 id="page-title">Tiny cloud calculator</h1>
        <p className="intro">
          Enter two numbers. A small API microservice will add them.
        </p>

        <form onSubmit={calculate}>
          <div className="input-grid">
            <label>
              First number
              <input
                type="number"
                step="any"
                value={x}
                onChange={(event) => setX(event.target.value)}
                required
              />
            </label>

            <label>
              Second number
              <input
                type="number"
                step="any"
                value={y}
                onChange={(event) => setY(event.target.value)}
                required
              />
            </label>
          </div>

          <button type="submit" disabled={isCalculating}>
            {isCalculating ? "Calculating…" : "Add numbers"}
          </button>
        </form>

        <div className="output" aria-live="polite">
          {result !== null && (
            <p className="result">
              Result: <strong>{result}</strong>
            </p>
          )}
          {error && <p className="error">{error}</p>}
        </div>
      </section>
    </main>
  );
}
