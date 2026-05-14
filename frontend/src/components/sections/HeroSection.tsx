// Server Component — pure static render, zero JS
export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent opacity-[0.03] blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-gold opacity-[0.025] blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 py-24 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8 animate-fade-in">
            <div className="h-px w-12 bg-accent opacity-60" />
            <span className="font-mono text-xs text-accent tracking-[0.3em] uppercase opacity-80">
              Sequence Modeling · LSTM · NLP
            </span>
          </div>

          {/* Main title */}
          <h1
            className="font-display text-6xl md:text-8xl font-semibold leading-[0.9] mb-6 animate-fade-in"
            style={{ animationDelay: "0.1s", animationFillMode: "both" }}
          >
            <span className="text-text">Interactive</span>
            <br />
            <span className="text-text">Neural</span>
            <br />
            <span
              className="text-accent text-glow"
              style={{ fontStyle: "italic" }}
            >
              Language Model
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="font-sans text-lg md:text-xl text-text-dim max-w-2xl leading-relaxed mb-12 animate-fade-in"
            style={{ animationDelay: "0.2s", animationFillMode: "both" }}
          >
            LSTM-based next word prediction system trained on sequential text
            data — Shakespeare's Hamlet. Explore inference pipelines,
            temperature sampling, and sequence generation in real-time.
          </p>

          {/* Stats bar */}
          <div
            className="flex flex-wrap gap-8 mb-12 animate-fade-in"
            style={{ animationDelay: "0.3s", animationFillMode: "both" }}
          >
            {[
              { label: "Architecture", value: "LSTM" },
              { label: "Dataset", value: "Hamlet" },
              { label: "Vocab Size", value: "~4,800" },
              { label: "Framework", value: "TensorFlow" },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-1">
                <span className="font-mono text-xs text-text-dim uppercase tracking-wider">
                  {label}
                </span>
                <span className="font-mono text-sm text-accent">{value}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            className="flex flex-wrap gap-4 animate-fade-in"
            style={{ animationDelay: "0.4s", animationFillMode: "both" }}
          >
            <a
              href="#playground"
              className="inline-flex items-center gap-2 bg-accent text-bg font-mono text-sm px-6 py-3 hover:bg-accent-dim transition-colors font-bold tracking-wider uppercase glow-accent"
            >
              <span>Launch Playground</span>
              <span>→</span>
            </a>
            <a
              href="#engineering"
              className="inline-flex items-center gap-2 border border-border text-text-dim font-mono text-sm px-6 py-3 hover:border-accent hover:text-accent transition-colors tracking-wider uppercase"
            >
              View Architecture
            </a>
          </div>

          {/* Terminal preview */}
          <div
            className="mt-20 glass rounded-sm p-5 max-w-lg animate-fade-in"
            style={{ animationDelay: "0.5s", animationFillMode: "both" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 opacity-70" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 opacity-70" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 opacity-70" />
              <span className="font-mono text-xs text-text-dim ml-2">
                lstm_inference.py
              </span>
            </div>
            <div className="font-mono text-xs space-y-1.5">
              <div>
                <span className="text-text-dim">&gt;&gt;&gt; </span>
                <span className="text-accent">predict</span>
                <span className="text-text">(</span>
                <span className="text-gold">"To be or not to be"</span>
                <span className="text-text">)</span>
              </div>
              <div className="text-text-dim pl-4">
                # tokenize → pad → inference → softmax
              </div>
              <div>
                <span className="text-text-dim">&gt;&gt;&gt; </span>
                <span className="text-text">predicted: </span>
                <span className="text-green-400 font-bold">"that"</span>
                <span className="text-text-dim"> [conf: 0.847]</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent" />
    </section>
  );
}
