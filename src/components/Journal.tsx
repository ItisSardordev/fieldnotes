import { useReveal } from '../hooks/useReveal';
import { journalEntries } from '../data';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const TAG_STYLES: Record<string, string> = {
  Essay: 'text-slate-deep border-slate-blue/30 bg-slate-blue/5',
  'Research Note': 'text-sage-600 border-sage-400/30 bg-sage-100/50',
  'Field Report': 'text-accent-amber border-accent-amber/30 bg-accent-amber/5',
  'Reading List': 'text-accent-rust border-accent-rust/30 bg-accent-rust/5',
};

export function Journal() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="journal" className="py-24 lg:py-32 border-t border-paper-200">
      <div ref={ref} className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className={`reveal ${visible ? 'is-visible' : ''} flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16`}>
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-6 bg-ink-300" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-ink-400">Journal</span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-ink-900 leading-tight">
              A public commons
              <br />
              for research writing.
            </h2>
            <p className="mt-6 text-lg text-ink-500 leading-relaxed font-light">
              Researchers publish essays, field reports, reading lists, and notes —
              presented with the typographic care of an editorial magazine.
            </p>
          </div>
          <a href="#journal" className="group flex items-center gap-2 text-[13px] font-medium text-ink-600 hover:text-ink-900 transition-colors shrink-0">
            Browse all essays
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" strokeWidth={1.5} />
          </a>
        </div>

        <div className={`reveal reveal-delay-2 ${visible ? 'is-visible' : ''} grid lg:grid-cols-2 gap-8 lg:gap-12`}>
          {/* Featured article */}
          <article className="group cursor-pointer">
            <div className="aspect-[16/10] rounded-lg overflow-hidden bg-paper-200 mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-deep via-ink-700 to-ink-900" />
              <div className="absolute inset-0 bg-paper-texture opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center p-12">
                <p className="font-display text-2xl text-paper-100/80 text-center leading-snug italic">
                  "A meditation on how the privatization of urban corridors reshapes collective memory"
                </p>
              </div>
              <span className={`absolute top-4 left-4 text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded border ${TAG_STYLES['Essay']}`}>
                Essay
              </span>
            </div>
            <div className="text-[11px] font-mono text-ink-400 mb-3">
              {journalEntries[0].date} · {journalEntries[0].readTime} read
            </div>
            <h3 className="font-display text-3xl text-ink-900 leading-tight group-hover:text-ink-700 transition-colors">
              {journalEntries[0].title}
            </h3>
            <p className="mt-4 text-[15px] text-ink-500 leading-relaxed">
              {journalEntries[0].excerpt}
            </p>
            <div className="mt-4 flex items-center gap-2 text-[13px] text-ink-600 group-hover:text-ink-900 transition-colors">
              <span>{journalEntries[0].author}</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
            </div>
          </article>

          {/* Article list */}
          <div className="space-y-px">
            {journalEntries.slice(1).map((entry) => (
              <article key={entry.id} className="group cursor-pointer py-6 border-b border-paper-200 last:border-0 first:pt-0">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border ${TAG_STYLES[entry.tag]}`}>
                    {entry.tag}
                  </span>
                  <span className="text-[11px] font-mono text-ink-400">{entry.date} · {entry.readTime}</span>
                </div>
                <h3 className="font-display text-xl text-ink-900 leading-snug group-hover:text-ink-700 transition-colors">
                  {entry.title}
                </h3>
                <p className="mt-2 text-[13px] text-ink-500 leading-relaxed line-clamp-2">{entry.excerpt}</p>
                <div className="mt-2 text-[12px] text-ink-400">{entry.author}</div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
