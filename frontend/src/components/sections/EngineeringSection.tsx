// Server Component
export function EngineeringSection() {
  const concepts = [
    {
      term: "Tokenization",
      def: "Converts raw text into integer IDs using a word-index vocabulary built from the training corpus.",
    },
    {
      term: "N-gram Sequences",
      def: "Every line in Hamlet generates progressively longer subsequences, each as a training sample.",
    },
    {
      term: "Sequence Padding",
      def: "All sequences are pre-padded with zeros to match the maximum sequence length.",
    },
    {
      term: "Embedding Layer",
      def: "Learns a 100-dimensional dense vector for each word — capturing semantic proximity.",
    },
    {
      term: "LSTM Memory",
      def: "Gated recurrent units maintain a hidden state across tokens, enabling sequential context modeling.",
    },
    {
      term: "Softmax Output",
      def: "Final layer outputs a probability distribution over the entire vocabulary.",
    },
    {
      term: "Temperature Sampling",
      def: "Divides logits by T before softmax — lower T sharpens distribution, higher T flattens it.",
    },
    {
      term: "Inference Pipeline",
      def: "text → tokenize → pad → model.predict → argmax/sample → decode → word.",
    },
  ];

  const whyTransformers = [
    {
      issue: "Context Limitation",
      detail:
        "LSTMs struggle to retain information across long sequences due to vanishing gradient — transformers use full attention over the entire context window.",
    },
    {
      issue: "Sequential Bottleneck",
      detail:
        "LSTMs process tokens one-by-one; transformers process all tokens in parallel, enabling massive training throughput.",
    },
    {
      issue: "Long-range Dependencies",
      detail:
        "Attention mechanisms assign direct weights between any two tokens regardless of distance — LSTMs decay over distance.",
    },
    {
      issue: "Training Efficiency",
      detail:
        "Self-attention is fully parallelizable on modern GPUs; LSTM training is inherently sequential and slower at scale.",
    },
  ];

  return (
    <section id="engineering" className="relative py-24 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-accent opacity-60" />
              <span className="font-mono text-xs text-accent tracking-widest uppercase">
                Engineering
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-text mb-3">
              What This Project Demonstrates
            </h2>
            <p className="font-sans text-text-dim max-w-xl">
              Core NLP and ML engineering concepts implemented in this system.
            </p>
          </div>

          {/* Concepts grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border mb-20">
            {concepts.map(({ term, def }) => (
              <div key={term} className="bg-bg p-6 hover:bg-surface transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                  <div>
                    <div className="font-mono text-sm text-accent mb-1.5">{term}</div>
                    <div className="font-sans text-sm text-text-dim leading-relaxed">{def}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Why Transformers */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-gold opacity-60" />
              <span className="font-mono text-xs text-gold tracking-widest uppercase">
                The Frontier
              </span>
            </div>
            <h3 className="font-display text-3xl font-semibold text-text mb-3">
              Why Transformers Eventually Replaced LSTMs
            </h3>
            <p className="font-sans text-text-dim mb-8 max-w-2xl">
              Understanding LSTM limitations clarifies what transformer architectures solve — and why the field moved on.
            </p>

            <div className="space-y-4">
              {whyTransformers.map(({ issue, detail }, i) => (
                <div key={issue} className="flex gap-6 glass p-5 rounded-sm group hover:border-gold/30 transition-colors">
                  <div className="font-mono text-xs text-text-dim w-4 shrink-0 pt-1">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <div className="font-mono text-sm text-gold mb-1.5">{issue}</div>
                    <div className="font-sans text-sm text-text-dim leading-relaxed">{detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
