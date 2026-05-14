// Server Component
export function FooterSection() {
  const roadmap = [
    "Transformer Migration (GPT-2 fine-tuning)",
    "Attention Visualization Layer",
    "RAG Integration for context-aware generation",
    "Email Subject Line Predictor",
    "Personalized Fine-Tuning Pipeline",
    "Vector Database Semantic Search",
    "Scalable Inference with ONNX",
    "Multi-dataset Domain Switching",
  ];

  return (
    <footer className="relative py-24 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Roadmap */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-accent opacity-60" />
              <span className="font-mono text-xs text-accent tracking-widest uppercase">
                Future Roadmap
              </span>
            </div>
            <h2 className="font-display text-3xl font-semibold text-text mb-8">
              What Comes Next
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {roadmap.map((item, i) => (
                <div
                  key={item}
                  className="flex items-center gap-4 glass p-4 rounded-sm"
                >
                  <span className="font-mono text-xs text-text-dim w-5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-sans text-sm text-text-dim">{item}</span>
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-border" />
                </div>
              ))}
            </div>
          </div>

          {/* Footer bar */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t border-border">
            <div>
              <div className="font-mono text-sm text-text mb-1">
                Neural Language Model — LSTM v1.0
              </div>
              <div className="font-mono text-xs text-text-dim">
                Built with TensorFlow · FastAPI · Next.js 15 · Trained on Shakespeare's Hamlet
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="font-mono text-xs text-text-dim">API Live</span>
              </div>
              <span className="font-mono text-xs text-text-dim">
                GenAI Engineer Portfolio
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
