import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { references, citationStyles } from '../data';
import type { CitationStyle } from '../types';
import { BookMarked, Plus, Pencil, ExternalLink, Check, Copy } from 'lucide-react';

export function CitationSystem() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [activeRef, setActiveRef] = useState(references[0]);
  const [style, setStyle] = useState<CitationStyle>('APA');
  const [copied, setCopied] = useState(false);

  const copyCitation = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="references" className="py-24 lg:py-32 border-t border-paper-200">
      <div ref={ref} className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className={`reveal ${visible ? 'is-visible' : ''} max-w-3xl mb-16`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-6 bg-ink-300" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-ink-400">Citations</span>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-ink-900 leading-tight">
            Citations that understand
            <br />
            what you're writing.
          </h2>
          <p className="mt-6 text-lg text-ink-500 leading-relaxed font-light">
            Type <code className="font-mono text-sm bg-paper-200 px-1.5 py-0.5 rounded text-ink-700">[12]</code> and
            Field Notes resolves it against your reference library — author, journal, DOI, and formatted citation included.
          </p>
        </div>

        <div className={`reveal reveal-delay-2 ${visible ? 'is-visible' : ''} grid lg:grid-cols-12 gap-6`}>
          {/* Editor snippet with citation trigger */}
          <div className="lg:col-span-5">
            <div className="rounded-xl border border-paper-300/80 bg-paper-50 overflow-hidden shadow-lg shadow-ink-900/5">
              <div className="px-4 py-2.5 border-b border-paper-200 bg-paper-100/50 flex items-center justify-between">
                <span className="text-[11px] font-mono text-ink-400">urban-memory.md</span>
                <span className="text-[10px] font-mono text-ink-300">Line 14</span>
              </div>
              <div className="p-6 font-mono text-[13px] leading-[1.8] text-ink-500">
                <div><span className="md-hash">## </span><span className="md-bold text-ink-700">Introduction</span></div>
                <div className="mt-3">Cities preserve memory through form,</div>
                <div>not merely function. The street corner</div>
                <div>where a market once stood carries its</div>
                <div>history in worn stone.</div>
                <div className="mt-3">
                  According to recent research{' '}
                  <span className="relative inline-block">
                    <span className="text-slate-deep font-bold cursor-pointer bg-slate-blue/10 px-0.5 rounded">
                      [12]
                    </span>
                  </span>
                  <span className="inline-block w-[2px] h-[1.1em] bg-slate-deep align-middle animate-blink -mb-[0.15em] ml-0.5" />
                </div>
              </div>
            </div>

            {/* Citation popover */}
            <div className="mt-4 rounded-xl border border-paper-300/80 bg-paper-50 shadow-xl shadow-ink-900/8 overflow-hidden animate-slide-down">
              <div className="px-5 py-3 border-b border-paper-200 bg-slate-deep/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookMarked className="w-3.5 h-3.5 text-slate-deep" strokeWidth={1.5} />
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-deep">Citation [12]</span>
                </div>
                <span className="text-[10px] font-mono text-ink-300">Resolved</span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg text-ink-900 leading-snug">{activeRef.title}</h3>
                <dl className="mt-4 space-y-2.5 text-[13px]">
                  <div className="flex gap-3">
                    <dt className="w-20 text-ink-400 font-mono text-[11px] uppercase tracking-wide">Author</dt>
                    <dd className="text-ink-700">{activeRef.author}</dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="w-20 text-ink-400 font-mono text-[11px] uppercase tracking-wide">Publisher</dt>
                    <dd className="text-ink-700">{activeRef.publisher}</dd>
                  </div>
                  {activeRef.journal && (
                    <div className="flex gap-3">
                      <dt className="w-20 text-ink-400 font-mono text-[11px] uppercase tracking-wide">Journal</dt>
                      <dd className="text-ink-700">{activeRef.journal}</dd>
                    </div>
                  )}
                  <div className="flex gap-3">
                    <dt className="w-20 text-ink-400 font-mono text-[11px] uppercase tracking-wide">Year</dt>
                    <dd className="text-ink-700">{activeRef.year}</dd>
                  </div>
                  {activeRef.doi && (
                    <div className="flex gap-3">
                      <dt className="w-20 text-ink-400 font-mono text-[11px] uppercase tracking-wide">DOI</dt>
                      <dd className="text-slate-deep font-mono text-[12px]">{activeRef.doi}</dd>
                    </div>
                  )}
                </dl>
                <div className="mt-4 pt-4 border-t border-paper-200">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-ink-400 mb-2">Formatted ({style})</div>
                  <p className="text-[12px] text-ink-600 leading-relaxed bg-paper-100 p-3 rounded font-mono">
                    {citationStyles[style](activeRef)}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <button className="flex items-center gap-1.5 text-[12px] bg-ink-900 text-paper-50 px-3 py-1.5 rounded hover:bg-ink-800 transition-colors">
                    <Plus className="w-3 h-3" strokeWidth={2} /> Insert citation
                  </button>
                  <button className="flex items-center gap-1.5 text-[12px] text-ink-500 hover:text-ink-800 px-3 py-1.5 rounded hover:bg-paper-100 transition-colors">
                    <Pencil className="w-3 h-3" strokeWidth={1.5} /> Edit source
                  </button>
                  <button className="flex items-center gap-1.5 text-[12px] text-ink-500 hover:text-ink-800 px-3 py-1.5 rounded hover:bg-paper-100 transition-colors">
                    <ExternalLink className="w-3 h-3" strokeWidth={1.5} /> Open reference
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Reference Manager sidebar */}
          <div className="lg:col-span-7">
            <ReferenceManager activeRef={activeRef} onActiveChange={setActiveRef} style={style} onStyleChange={setStyle} copied={copied} onCopy={copyCitation} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ReferenceManager({
  activeRef,
  onActiveChange,
  style,
  onStyleChange,
  copied,
  onCopy,
}: {
  activeRef: typeof references[0];
  onActiveChange: (r: typeof references[0]) => void;
  style: CitationStyle;
  onStyleChange: (s: CitationStyle) => void;
  copied: boolean;
  onCopy: () => void;
}) {
  const [query, setQuery] = useState('');
  const filtered = references.filter(
    (r) =>
      r.title.toLowerCase().includes(query.toLowerCase()) ||
      r.author.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="rounded-xl border border-paper-300/80 bg-paper-50 overflow-hidden shadow-lg shadow-ink-900/5 h-full flex flex-col">
      <div className="px-5 py-4 border-b border-paper-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display text-xl text-ink-900">Reference Manager</h3>
          <span className="text-[11px] font-mono text-ink-400">{filtered.length} sources</span>
        </div>
        <div className="relative">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Jane Jacobs…"
            className="w-full bg-paper-100 border border-paper-200 rounded-md px-3 py-2 text-[13px] text-ink-700 placeholder:text-ink-300 outline-none focus:border-slate-blue/40 transition-colors"
          />
        </div>
        <div className="mt-3 flex items-center gap-1">
          {(['APA', 'MLA', 'Chicago', 'IEEE'] as CitationStyle[]).map((s) => (
            <button
              key={s}
              onClick={() => onStyleChange(s)}
              className={`text-[11px] font-mono px-2.5 py-1 rounded transition-colors ${
                style === s ? 'bg-ink-900 text-paper-50' : 'text-ink-400 hover:text-ink-700 hover:bg-paper-100'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto max-h-[520px] editor-scroll divide-y divide-paper-200">
        {filtered.map((ref) => (
          <div
            key={ref.id}
            onClick={() => onActiveChange(ref)}
            className={`p-4 cursor-pointer transition-all ${
              activeRef.id === ref.id ? 'bg-slate-blue/5 border-l-2 border-l-slate-deep' : 'hover:bg-paper-100/50 border-l-2 border-l-transparent'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h4 className="text-[14px] font-medium text-ink-800 leading-snug">{ref.title}</h4>
                <p className="mt-1 text-[12px] text-ink-500">{ref.author}</p>
                <div className="mt-1.5 flex items-center gap-3 text-[11px] text-ink-400">
                  <span className="font-mono">{ref.year}</span>
                  <span>·</span>
                  <span>{ref.publisher}</span>
                  <span className="text-[9px] uppercase font-mono tracking-wider text-ink-300 border border-paper-300 px-1.5 py-0.5 rounded">
                    {ref.type}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1 shrink-0">
                <button
                  onClick={(e) => { e.stopPropagation(); }}
                  className="text-[10px] font-mono text-slate-deep hover:bg-slate-blue/10 px-2 py-1 rounded transition-colors"
                >
                  Cite
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); onCopy(); }}
                  className="text-[10px] font-mono text-ink-400 hover:text-ink-700 hover:bg-paper-100 px-2 py-1 rounded transition-colors flex items-center gap-1"
                >
                  {copied ? <Check className="w-2.5 h-2.5" /> : <Copy className="w-2.5 h-2.5" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); }}
                  className="text-[10px] font-mono text-ink-400 hover:text-ink-700 hover:bg-paper-100 px-2 py-1 rounded transition-colors flex items-center gap-1"
                >
                  <ExternalLink className="w-2.5 h-2.5" />
                  Open
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
