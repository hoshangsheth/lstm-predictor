// Server Component — static render
export function ModelInsights() {
  const stats = [
    { label: "Vocabulary Size", value: "~4,800", desc: "Unique tokens learned from Hamlet" },
    { label: "Sequence Length", value: "Up to 97", desc: "Max input tokens per inference" },
    { label: "Embedding Dim", value: "100", desc: "Dense vector space for each token" },
    { label: "LSTM Units", value: "100 + 50", desc: "Two stacked LSTM layers" },
    { label: "Dropout Rate", value: "0.3", desc: "Applied after each LSTM layer" },
    { label: "Optimizer", value: "Adam", desc: "Adaptive gradient descent" },
    { label: "Loss Function", value: "Cat. CE", desc: "Categorical cross-entropy" },
    { label: "Training Epochs", value: "50", desc: "With early stopping on val loss" },
  ];

  return (
    <section id="insights" className="relative py-24 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-gold opacity-60" />
              <span className="font-mono text-xs text-gold tracking-widest uppercase">
                Model Architecture
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-text mb-3">
              Inside the Network
            </h2>
            <p className="font-sans text-text-dim max-w-xl">
              Key architectural parameters and training configuration of the deployed model.
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border mb-16">
            {stats.map(({ label, value, desc }) => (
              <div key={label} className="bg-bg p-6 hover:bg-surface transition-colors group">
                <div className="font-mono text-2xl text-accent mb-1 group-hover:text-glow transition-all">
                  {value}
                </div>
                <div className="font-mono text-xs text-text uppercase tracking-wider mb-2">
                  {label}
                </div>
                <div className="font-sans text-xs text-text-dim">{desc}</div>
              </div>
            ))}
          </div>

          {/* Architecture diagram — text-based */}
          <div className="glass rounded-sm p-8">
            <div className="font-mono text-xs text-text-dim uppercase tracking-wider mb-6">
              Model Architecture
            </div>
            <div className="flex flex-col items-center gap-0">
              {[
                { name: "Input", detail: "shape: (96,)", color: "border-text-dim text-text-dim" },
                null,
                { name: "Embedding", detail: "vocab × 100", color: "border-gold text-gold" },
                null,
                { name: "LSTM", detail: "units: 100, return_sequences=True", color: "border-accent text-accent" },
                null,
                { name: "Dropout", detail: "rate: 0.3", color: "border-muted text-text-dim" },
                null,
                { name: "LSTM", detail: "units: 50", color: "border-accent text-accent" },
                null,
                { name: "Dropout", detail: "rate: 0.3", color: "border-muted text-text-dim" },
                null,
                { name: "Dense + Softmax", detail: "output: vocab_size", color: "border-green-400 text-green-400" },
              ].map((layer, i) =>
                layer === null ? (
                  <div key={i} className="h-6 w-px bg-border relative">
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 border-r border-b border-text-dim rotate-45" />
                  </div>
                ) : (
                  <div
                    key={i}
                    className={`border ${layer.color} px-6 py-3 text-center w-full max-w-md`}
                  >
                    <div className={`font-mono text-sm font-bold ${layer.color.split(" ")[1]}`}>
                      {layer.name}
                    </div>
                    <div className="font-mono text-xs text-text-dim mt-0.5">{layer.detail}</div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
