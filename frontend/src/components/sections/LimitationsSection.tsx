// Server Component
export function LimitationsSection() {
  const limitations = [
    {
      title: "Small Dataset",
      detail:
        "Trained exclusively on one Shakespeare play (~200KB). The model has no knowledge of modern language patterns, idioms, or cross-domain vocabulary.",
    },
    {
      title: "Context Window Ceiling",
      detail:
        "The model processes at most the last ~96 tokens. Any longer prompt is truncated from the front, discarding prior context.",
    },
    {
      title: "Repetitive Generation",
      detail:
        "Without beam search or repetition penalties, greedy decoding often produces repetitive loops — especially at low temperatures.",
    },
    {
      title: "No Semantic Understanding",
      detail:
        "LSTM-based models are statistically predictive, not semantically grounded. Generated text may be grammatically plausible but semantically incoherent.",
    },
    {
      title: "LSTM vs Transformer Gap",
      detail:
        "GPT-2 (117M params, trained on 40GB) demonstrates what scale and attention achieve. This LSTM is a learning artifact, not a production language model.",
    },
    {
      title: "Vocabulary OOV Handling",
      detail:
        "Words not seen during training map to <OOV> token. Modern BPE tokenizers (GPT, BERT) avoid this by splitting unknown words into subwords.",
    },
  ];

  return (
    <section id="limitations" className="relative py-24 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-red-400 opacity-60" />
              <span className="font-mono text-xs text-red-400 tracking-widest uppercase">
                Engineering Honesty
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-text mb-3">
              Known Limitations
            </h2>
            <p className="font-sans text-text-dim max-w-xl">
              An honest assessment of what this model can and cannot do — and why that matters for engineering judgment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {limitations.map(({ title, detail }) => (
              <div
                key={title}
                className="glass p-6 rounded-sm border-l-2 border-l-red-500/30 hover:border-l-red-400/50 transition-colors"
              >
                <div className="font-mono text-sm text-red-400 mb-2">{title}</div>
                <div className="font-sans text-sm text-text-dim leading-relaxed">{detail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
