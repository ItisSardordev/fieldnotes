import { Feather, ArrowRight } from 'lucide-react';

const FOOTER_LINKS = {
  Product: ['Writing', 'Library', 'References', 'Labs', 'Journal', 'Pricing'],
  Company: ['About', 'Manifesto', 'Careers', 'Press'],
  Resources: ['Documentation', 'Markdown Guide', 'Citation Styles', 'Community', 'Changelog'],
  Legal: ['Privacy', 'Terms', 'Security', 'Accessibility'],
};

export function Footer() {
  return (
    <footer className="border-t border-paper-200 bg-ink-900 text-paper-200 relative overflow-hidden">
      <div className="absolute inset-0 bg-paper-texture opacity-[0.02] pointer-events-none" />

      {/* CTA band */}
      <div className="relative border-b border-paper-300/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 lg:py-24 text-center">
          <h2 className="font-display text-4xl lg:text-6xl text-paper-50 leading-tight text-balance">
            Research deeply. Write clearly.
          </h2>
          <p className="mt-6 text-lg text-paper-300/60 leading-relaxed font-light max-w-xl mx-auto">
            Open a workspace and start writing in under a minute. No setup, no friction —
            just you, your references, and the page.
          </p>
          <a
            href="#top"
            className="mt-10 inline-flex items-center gap-2 bg-paper-50 text-ink-900 text-sm font-medium px-6 py-3.5 rounded-md hover:bg-paper-100 transition-all group"
          >
            Start writing
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" strokeWidth={1.5} />
          </a>
        </div>
      </div>

      {/* Links */}
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 py-16">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-4">
            <a href="#top" className="flex items-center gap-2 mb-4">
              <Feather className="w-4 h-4 text-paper-300" strokeWidth={1.5} />
              <span className="font-display text-xl text-paper-50 tracking-tight">Field Notes</span>
            </a>
            <p className="text-[13px] text-paper-300/50 leading-relaxed max-w-xs">
              A Markdown-first writing environment for researchers, built around citations,
              references, and uninterrupted focus.
            </p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
              <div key={heading}>
                <h4 className="text-[10px] font-mono uppercase tracking-wider text-paper-300/40 mb-4">{heading}</h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-[13px] text-paper-300/70 hover:text-paper-50 transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-paper-300/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] font-mono text-paper-300/40">
            © 2026 Field Notes. Built for research.
          </p>
          <div className="flex items-center gap-6 text-[11px] font-mono text-paper-300/40">
            <span>Markdown-first</span>
            <span className="text-paper-300/20">·</span>
            <span>Citation-aware</span>
            <span className="text-paper-300/20">·</span>
            <span>Distraction-free</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
