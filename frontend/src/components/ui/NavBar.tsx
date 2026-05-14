// Server Component — no "use client" needed
export function NavBar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="font-mono text-sm text-accent tracking-widest uppercase">
            NLM / LSTM
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {[
            ["Playground", "#playground"],
            ["Architecture", "#insights"],
            ["Engineering", "#engineering"],
            ["Limitations", "#limitations"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="font-mono text-xs text-text-dim hover:text-accent transition-colors tracking-wider uppercase"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-text-dim">v1.0</span>
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        </div>
      </div>
    </header>
  );
}
