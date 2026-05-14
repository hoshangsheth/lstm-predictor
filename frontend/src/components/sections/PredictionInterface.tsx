"use client";

import { useState, useCallback, useRef } from "react";
import { predictNextWord, generateText } from "@/lib/api";
import type {
  PredictResponse,
  GenerateResponse,
  TemperatureMode,
  WordProbability,
} from "@/types";
import { TEMPERATURE_VALUES } from "@/types";
import { cn } from "@/lib/utils";

const EXAMPLE_PROMPTS = [
  "To be or not to be",
  "The lady doth protest",
  "Something is rotten in the state of",
  "What a piece of work is",
];

export function PredictionInterface() {
  const [inputText, setInputText] = useState("");
  const [mode, setMode] = useState<TemperatureMode>("balanced");
  const [genLength, setGenLength] = useState(10);
  const [predictResult, setPredictResult] = useState<PredictResponse | null>(null);
  const [genResult, setGenResult] = useState<GenerateResponse | null>(null);
  const [loadingPredict, setLoadingPredict] = useState(false);
  const [loadingGenerate, setLoadingGenerate] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedPredict, setCopiedPredict] = useState(false);
  const [copiedGen, setCopiedGen] = useState(false);
  const [displayedWords, setDisplayedWords] = useState<string[]>([]);
  const genIntervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const temperature = TEMPERATURE_VALUES[mode];

  const handlePredict = useCallback(async () => {
    if (!inputText.trim()) return;
    setLoadingPredict(true);
    setError(null);
    setPredictResult(null);
    try {
      const result = await predictNextWord(inputText, temperature);
      setPredictResult(result);
    } catch {
      setError("Failed to reach the model API. Make sure the backend is running.");
    } finally {
      setLoadingPredict(false);
    }
  }, [inputText, temperature]);

  const handleGenerate = useCallback(async () => {
    if (!inputText.trim()) return;
    setLoadingGenerate(true);
    setError(null);
    setGenResult(null);
    setDisplayedWords([]);
    if (genIntervalRef.current) clearInterval(genIntervalRef.current);

    try {
      const result = await generateText(inputText, genLength, temperature);
      setGenResult(result);
      // Animate word-by-word reveal
      let i = 0;
      genIntervalRef.current = setInterval(() => {
        i++;
        setDisplayedWords(result.generated_words.slice(0, i));
        if (i >= result.generated_words.length) {
          clearInterval(genIntervalRef.current!);
        }
      }, 120);
    } catch {
      setError("Generation failed. Please try again.");
    } finally {
      setLoadingGenerate(false);
    }
  }, [inputText, genLength, temperature]);

  const copyToClipboard = async (text: string, which: "predict" | "gen") => {
    await navigator.clipboard.writeText(text);
    if (which === "predict") {
      setCopiedPredict(true);
      setTimeout(() => setCopiedPredict(false), 2000);
    } else {
      setCopiedGen(true);
      setTimeout(() => setCopiedGen(false), 2000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") handlePredict();
  };

  return (
    <div className="container mx-auto px-6 py-24">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-accent opacity-60" />
            <span className="font-mono text-xs text-accent tracking-widest uppercase">
              Playground
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-text mb-3">
            Inference Engine
          </h2>
          <p className="font-sans text-text-dim">
            Enter a text sequence to predict the next word or generate a continuation.
          </p>
        </div>

        {/* Temperature control */}
        <div className="glass rounded-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs text-text-dim uppercase tracking-wider">
              Sampling Temperature
            </span>
            <span className="font-mono text-xs text-accent">
              T = {temperature}
            </span>
          </div>

          <div className="flex gap-2 mb-4">
            {(["conservative", "balanced", "creative"] as TemperatureMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={cn(
                  "flex-1 py-2 font-mono text-xs uppercase tracking-wider transition-all",
                  mode === m
                    ? "bg-accent text-bg font-bold"
                    : "border border-border text-text-dim hover:border-accent hover:text-accent"
                )}
              >
                {m}
              </button>
            ))}
          </div>

          <p className="font-mono text-xs text-text-dim">
            {mode === "conservative"
              ? "Low temperature — picks the most likely words. Coherent but predictable."
              : mode === "balanced"
              ? "Default temperature — balanced between coherence and variety."
              : "High temperature — more random, creative, and occasionally surprising."}
          </p>
        </div>

        {/* Input area */}
        <div className="glass rounded-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs text-text-dim uppercase tracking-wider">
              Seed Text
            </span>
            <span className="font-mono text-xs text-text-dim">⌘↵ to predict</span>
          </div>

          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter a sequence of words..."
            rows={3}
            className="w-full bg-transparent font-mono text-sm text-text placeholder:text-text-dim/40 resize-none outline-none border-b border-border pb-3 mb-4 focus:border-accent transition-colors"
          />

          {/* Example prompts */}
          <div className="flex flex-wrap gap-2 mb-5">
            {EXAMPLE_PROMPTS.map((p) => (
              <button
                key={p}
                onClick={() => setInputText(p)}
                className="font-mono text-xs text-text-dim border border-border px-3 py-1 hover:border-accent hover:text-accent transition-colors"
              >
                {p.length > 28 ? p.slice(0, 28) + "…" : p}
              </button>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 items-center">
            <button
              onClick={handlePredict}
              disabled={loadingPredict || !inputText.trim()}
              className={cn(
                "flex items-center gap-2 font-mono text-sm px-5 py-2.5 uppercase tracking-wider transition-all",
                "bg-accent text-bg font-bold hover:bg-accent-dim disabled:opacity-40 disabled:cursor-not-allowed",
                loadingPredict && "animate-pulse"
              )}
            >
              {loadingPredict ? (
                <>
                  <span className="inline-block w-3 h-3 border border-bg border-t-transparent rounded-full animate-spin" />
                  Thinking...
                </>
              ) : (
                "Predict Next Word"
              )}
            </button>

            {/* Generate length selector + button */}
            <div className="flex gap-0">
              {[5, 10, 20].map((n) => (
                <button
                  key={n}
                  onClick={() => setGenLength(n)}
                  className={cn(
                    "font-mono text-xs px-3 py-2.5 border transition-all",
                    genLength === n
                      ? "border-accent text-accent bg-accent/10"
                      : "border-border text-text-dim hover:border-accent"
                  )}
                >
                  {n}w
                </button>
              ))}
            </div>
            <button
              onClick={handleGenerate}
              disabled={loadingGenerate || !inputText.trim()}
              className={cn(
                "flex items-center gap-2 font-mono text-sm px-5 py-2.5 uppercase tracking-wider border transition-all",
                "border-accent text-accent hover:bg-accent/10 disabled:opacity-40 disabled:cursor-not-allowed",
                loadingGenerate && "animate-pulse"
              )}
            >
              {loadingGenerate ? (
                <>
                  <span className="inline-block w-3 h-3 border border-accent border-t-transparent rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Continuation"
              )}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="glass border border-red-500/30 rounded-sm p-4 mb-6 font-mono text-sm text-red-400">
            ⚠ {error}
          </div>
        )}

        {/* Prediction result */}
        {predictResult && (
          <div className="glass rounded-sm p-6 mb-6 glow-accent animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-xs text-accent uppercase tracking-wider">
                Prediction Result
              </span>
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-text-dim">
                  {predictResult.latency_ms}ms
                </span>
                <button
                  onClick={() => copyToClipboard(predictResult.predicted_word, "predict")}
                  className="font-mono text-xs text-text-dim hover:text-accent transition-colors"
                >
                  {copiedPredict ? "✓ Copied" : "Copy"}
                </button>
              </div>
            </div>

            {/* Big predicted word */}
            <div className="flex items-baseline gap-4 mb-8">
              <span className="font-display text-6xl text-accent text-glow font-semibold">
                "{predictResult.predicted_word}"
              </span>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-xs text-text-dim">confidence</span>
                <span className="font-mono text-2xl text-text">
                  {(predictResult.confidence * 100).toFixed(1)}%
                </span>
              </div>
            </div>

            {/* Top 5 probability bars */}
            <div>
              <span className="font-mono text-xs text-text-dim uppercase tracking-wider mb-3 block">
                Top Predictions
              </span>
              <div className="space-y-3">
                {predictResult.top_predictions.map((item: WordProbability, i: number) => (
                  <div key={i} className="flex items-center gap-4">
                    <span
                      className={cn(
                        "font-mono text-sm w-28 shrink-0",
                        i === 0 ? "text-accent font-bold" : "text-text"
                      )}
                    >
                      {item.word}
                    </span>
                    <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full fill-bar transition-all",
                          i === 0 ? "bg-accent" : "bg-muted"
                        )}
                        style={
                          { "--fill-width": `${(item.probability * 100).toFixed(1)}%` } as React.CSSProperties
                        }
                      />
                    </div>
                    <span className="font-mono text-xs text-text-dim w-12 text-right">
                      {(item.probability * 100).toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Generation result */}
        {genResult && (
          <div className="glass rounded-sm p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs text-accent uppercase tracking-wider">
                Generated Continuation
              </span>
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-text-dim">
                  {genResult.latency_ms}ms
                </span>
                <button
                  onClick={() => copyToClipboard(genResult.full_text, "gen")}
                  className="font-mono text-xs text-text-dim hover:text-accent transition-colors"
                >
                  {copiedGen ? "✓ Copied" : "Copy"}
                </button>
              </div>
            </div>

            <p className="font-display text-xl md:text-2xl text-text leading-relaxed">
              <span className="text-text-dim">{genResult.seed_text} </span>
              {displayedWords.map((word, i) => (
                <span
                  key={i}
                  className="text-accent animate-fade-in"
                  style={{ animationDelay: `${i * 0.05}s`, animationFillMode: "both" }}
                >
                  {word}{" "}
                </span>
              ))}
              {displayedWords.length < genResult.generated_words.length && (
                <span className="inline-block w-1 h-5 bg-accent animate-pulse align-middle" />
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
