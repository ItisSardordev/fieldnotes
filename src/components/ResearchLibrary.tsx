import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { researchDocs } from '../data';
import type { ResearchDoc } from '../types';
import { FileText, BookMarked, StickyNote, FileEdit, Library, Search, ChevronRight, Plus } from 'lucide-react';

const FILTERS = [
  { label: 'All', icon: Library, key: 'all' },
  { label: 'Papers', icon: FileText, key: 'Research Paper' },
  { label: 'Notes', icon: StickyNote, key: 'Notes' },
  { label: 'References', icon: BookMarked, key: 'Reading List' },
  { label: 'Drafts', icon: FileEdit, key: 'drafts' },
];

const STATUS_STYLES: Record<string, string> = {
  Draft: 'text-accent-amber border-accent-amber/30 bg-accent-amber/5',
  'In Review': 'text-slate-deep border-slate-blue/30 bg-slate-blue/5',
  Published: 'text-sage-600 border-sage-400/30 bg-sage-100/50',
  Archived: 'text-ink-400 border-ink-200 bg-paper-100',
};

export function ResearchLibrary() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  const filtered = researchDocs.filter((d) => {
    const matchesFilter = filter === 'all' || (filter === 'drafts' ? d.status === 'Draft' : d.type === filter);
    const matchesQuery = d.title.toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  return (
    <section id="library" className="py-24 lg:py-32 border-t border-paper-200">
      <div ref={ref} className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className={`reveal ${visible ? 'is-visible' : ''} max-w-3xl mb-16`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-6 bg-ink-300" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-ink-400">Research Library</span>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-ink-900 leading-tight">
            Your research, organized
            <br />
            like an archive.
          </h2>
          <p className="mt-6 text-lg text-ink-500 leading-relaxed font-light">
            Projects, papers, notes, references, and drafts — presented as an editorial list,
            not a clutter of cards.
          </p>
        </div>

        <div className={`reveal reveal-delay-2 ${visible ? 'is-visible' : ''} rounded-xl border border-paper-300/80 bg-paper-50 overflow-hidden shadow-xl shadow-ink-900/5`}>
          {/* Header */}
          <div className="px-6 py-5 border-b border-paper-200 bg-paper-100/40">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2">
                <h3 className="font-display text-2xl text-ink-900">My Research</h3>
                <span className="text-[11px] font-mono text-ink-400 mt-1">{filtered.length} documents</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink-300" strokeWidth={1.5} />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search documents…"
                    className="bg-paper-50 border border-paper-200 rounded-md pl-8 pr-3 py-1.5 text-[13px] text-ink-700 placeholder:text-ink-300 outline-none focus:border-slate-blue/40 transition-colors w-48"
                  />
                </div>
                <button className="flex items-center gap-1.5 text-[12px] bg-ink-900 text-paper-50 px-3 py-1.5 rounded-md hover:bg-ink-800 transition-colors">
                  <Plus className="w-3.5 h-3.5" strokeWidth={2} />
                  New
                </button>
              </div>
            </div>
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`flex items-center gap-1.5 text-[12px] px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${
                    filter === f.key
                      ? 'bg-ink-900/8 text-ink-900 font-medium'
                      : 'text-ink-400 hover:text-ink-700 hover:bg-paper-200/60'
                  }`}
                >
                  <f.icon className="w-3.5 h-3.5" strokeWidth={1.5} />
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* List header */}
          <div className="hidden md:grid grid-cols-12 px-6 py-2.5 border-b border-paper-200 text-[10px] font-mono uppercase tracking-wider text-ink-300 bg-paper-100/20">
            <div className="col-span-5">Title</div>
            <div className="col-span-2">Type</div>
            <div className="col-span-2">Edited</div>
            <div className="col-span-1 text-right">Citations</div>
            <div className="col-span-2 text-right">Status</div>
          </div>

          {/* Document rows */}
          <div className="divide-y divide-paper-200">
            {filtered.map((doc) => (
              <DocRow key={doc.id} doc={doc} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="px-6 py-16 text-center">
              <p className="text-sm text-ink-400">No documents found.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function DocRow({ doc }: { doc: ResearchDoc }) {
  return (
    <div className="group grid grid-cols-12 px-6 py-4 hover:bg-paper-100/40 cursor-pointer transition-colors items-center">
      <div className="col-span-12 md:col-span-5">
        <h4 className="text-[14px] font-medium text-ink-800 group-hover:text-ink-900 leading-snug">{doc.title}</h4>
        <p className="text-[11px] text-ink-400 mt-0.5 md:hidden">{doc.type} · {doc.lastEdited}</p>
      </div>
      <div className="hidden md:block col-span-2 text-[12px] text-ink-500">{doc.type}</div>
      <div className="hidden md:block col-span-2 text-[12px] text-ink-400 font-mono">{doc.lastEdited}</div>
      <div className="hidden md:block col-span-1 text-right text-[13px] font-mono text-ink-600">{doc.citations}</div>
      <div className="hidden md:flex col-span-2 justify-end">
        <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded border ${STATUS_STYLES[doc.status]}`}>
          {doc.status}
        </span>
      </div>
      <ChevronRight className="hidden md:block w-4 h-4 text-ink-300 group-hover:text-ink-600 ml-auto transition-colors col-start-12" strokeWidth={1.5} />
    </div>
  );
}
