import { useEffect, useState } from "react";

const translations = {
  en: {
    switchLanguage: "Skakel oor na Afrikaans",
    toggleLabel: "Afrikaans",
    documentTitle: "Azure Calculator",
    title: "Tiny cloud calculator",
    intro: "Enter two numbers. A small API microservice will add them.",
    firstNumber: "First number",
    secondNumber: "Second number",
    calculating: "Calculating…",
    addNumbers: "Add numbers",
    result: "Result",
    calculationFailed: "The calculation failed."
  },
  af: {
    switchLanguage: "Switch to English",
    toggleLabel: "English",
    documentTitle: "Azure-rekenaar",
    title: "Klein wolkrekenaar",
    intro: "Voer twee getalle in. ’n Klein API-mikrodiens sal hulle optel.",
    firstNumber: "Eerste getal",
    secondNumber: "Tweede getal",
    calculating: "Bereken tans…",
    addNumbers: "Tel getalle op",
    result: "Antwoord",
    calculationFailed: "Die berekening het misluk."
  }
};

export default function App() {
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [result, setResult] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [language, setLanguage] = useState("en");
  const copy = translations[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = copy.documentTitle;
  }, [copy.documentTitle, language]);

  async function calculate(event) {
    event.preventDefault();
    setHasError(false);
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
        throw new Error(body.error);
      }

      setResult(body.result);
    } catch {
      setHasError(true);
    } finally {
      setIsCalculating(false);
    }
  }

  return (
    <main className="page-shell">
      <section className="calculator-card" aria-labelledby="page-title">
        <div className="card-header">
          <p className="eyebrow">Codex → GitHub → Azure</p>
          <button
            className="language-toggle"
            type="button"
            aria-label={copy.switchLanguage}
            onClick={() => {
              setLanguage((currentLanguage) =>
                currentLanguage === "en" ? "af" : "en"
              );
              setHasError(false);
            }}
          >
            {copy.toggleLabel}
          </button>
        </div>
        <h1 id="page-title">{copy.title}</h1>
        <p className="intro">{copy.intro}</p>

        <form onSubmit={calculate}>
          <div className="input-grid">
            <label>
              {copy.firstNumber}
              <input
                type="number"
                step="any"
                value={x}
                onChange={(event) => setX(event.target.value)}
                required
              />
            </label>

            <label>
              {copy.secondNumber}
              <input
                type="number"
                step="any"
                value={y}
                onChange={(event) => setY(event.target.value)}
                required
              />
            </label>
          </div>

          <button
            className="submit-button"
            type="submit"
            disabled={isCalculating}
          >
            {isCalculating ? copy.calculating : copy.addNumbers}
          </button>
        </form>

        <div className="output" aria-live="polite">
          {result !== null && (
            <p className="result">
              {copy.result}: <strong>{result}</strong>
            </p>
          )}
          {hasError && <p className="error">{copy.calculationFailed}</p>}
        </div>
      </section>
    </main>
  );
}
