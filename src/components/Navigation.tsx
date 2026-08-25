import { useEffect, useState } from 'react';
import { Feather, Search, User, ArrowRight, X, Menu } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Writing', href: '#editor' },
  { label: 'Library', href: '#library' },
  { label: 'References', href: '#references' },
  { label: 'Labs', href: '#labs' },
  { label: 'Journal', href: '#journal' },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') setSearchOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-paper-50/85 backdrop-blur-xl border-b border-paper-200/70'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <a href="#top" className="flex items-center gap-2 group">
              <Feather className="w-4 h-4 text-ink-700 group-hover:text-ink-900 transition-colors" strokeWidth={1.5} />
              <span className="font-display text-xl text-ink-900 tracking-tight">Field Notes</span>
            </a>
            <nav className="hidden lg:flex items-center gap-7">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[13px] text-ink-500 hover:text-ink-900 transition-colors font-medium tracking-wide"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2 lg:gap-4">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 text-[13px] text-ink-400 hover:text-ink-700 transition-colors px-3 py-1.5 rounded-md hover:bg-paper-100"
            >
              <Search className="w-4 h-4" strokeWidth={1.5} />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline-flex items-center justify-center text-[10px] font-mono text-ink-300 border border-ink-200 rounded px-1.5 h-5">
                ⌘K
              </kbd>
            </button>
            <button className="hidden sm:flex items-center gap-2 text-[13px] text-ink-500 hover:text-ink-900 transition-colors">
              <User className="w-4 h-4" strokeWidth={1.5} />
              <span>Account</span>
            </button>
            <a
              href="#editor"
              className="group flex items-center gap-1.5 bg-ink-900 text-paper-50 text-[13px] font-medium px-4 py-2 rounded-md hover:bg-ink-800 transition-colors"
            >
              Open workspace
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" strokeWidth={1.5} />
            </a>
            <button
              className="lg:hidden p-1.5 -mr-1 text-ink-600"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden border-t border-paper-200 bg-paper-50 px-6 py-4 space-y-3 animate-slide-down">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-sm text-ink-600 hover:text-ink-900 font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {searchOpen && <SearchPalette onClose={() => setSearchOpen(false)} />}
    </>
  );
}

function SearchPalette({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('');
  const results = [
    { title: 'The Architecture of Urban Memory', type: 'Document', hint: 'Research Paper' },
    { title: 'Jane Jacobs — Death and Life of Great American Cities', type: 'Reference', hint: 'Book · 1961' },
    { title: 'Methodology', type: 'Section', hint: 'Urban Memory' },
    { title: 'Urban Mobility Patterns', type: 'Document', hint: 'In Review' },
    { title: 'Focus Mode', type: 'Feature', hint: 'Workspace' },
  ].filter((r) => r.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[15vh] px-4 animate-fade-in">
      <div className="absolute inset-0 bg-ink-900/20 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-xl bg-paper-50 rounded-xl shadow-2xl border border-paper-200 overflow-hidden animate-pop-in">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-paper-200">
          <Search className="w-4 h-4 text-ink-400" strokeWidth={1.5} />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documents, references, sections…"
            className="flex-1 bg-transparent text-sm text-ink-800 placeholder:text-ink-300 outline-none"
          />
          <kbd className="text-[10px] font-mono text-ink-300 border border-ink-200 rounded px-1.5 h-5 flex items-center">
            Esc
          </kbd>
        </div>
        <div className="max-h-80 overflow-y-auto p-2">
          {results.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-ink-400">No results for "{query}"</div>
          ) : (
            results.map((r, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-4 py-2.5 rounded-lg hover:bg-paper-100 cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm text-ink-700 group-hover:text-ink-900">{r.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-ink-400">{r.hint}</span>
                  <span className="text-[10px] font-mono uppercase text-ink-300 border border-paper-300 px-1.5 py-0.5 rounded">
                    {r.type}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
