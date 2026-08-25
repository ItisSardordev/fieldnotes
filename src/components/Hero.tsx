import { ArrowRight, BookOpen } from 'lucide-react';
import { EditorPreview } from './EditorPreview';

export function Hero() {
  return (
    <section id="top" className="relative pt-32 lg:pt-40 pb-20 lg:pb-28 overflow-hidden">
      {/* Subtle paper texture overlay */}
      <div className="absolute inset-0 bg-paper-texture opacity-40 pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-8 animate-fade-in-up">
            <div className="h-px w-8 bg-ink-300" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-ink-400">
              Field Notes / Research Writing
            </span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] text-ink-900 leading-[0.95] tracking-tight animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
            Research deeply.
            <br />
            Write clearly.
          </h1>

          <p className="mt-8 max-w-2xl text-lg lg:text-xl text-ink-500 leading-relaxed font-light animate-fade-in-up" style={{ animationDelay: '0.25s', opacity: 0 }}>
            A Markdown-first writing environment with citations, references, and a
            focus mode that gets completely out of your way.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s', opacity: 0 }}>
            <a
              href="#editor"
              className="group flex items-center gap-2 bg-ink-900 text-paper-50 text-sm font-medium px-6 py-3.5 rounded-md hover:bg-ink-800 transition-all hover:shadow-lg hover:shadow-ink-900/10"
            >
              Start writing
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" strokeWidth={1.5} />
            </a>
            <a
              href="#workspace"
              className="group flex items-center gap-2 text-sm font-medium text-ink-600 hover:text-ink-900 transition-colors px-2 py-3.5"
            >
              <BookOpen className="w-4 h-4 text-ink-400 group-hover:text-ink-700 transition-colors" strokeWidth={1.5} />
              Explore the workspace
              <span className="text-ink-300 group-hover:text-ink-500 transition-colors">→</span>
            </a>
          </div>
        </div>

        <div className="mt-16 lg:mt-24 animate-fade-in-up" style={{ animationDelay: '0.55s', opacity: 0 }}>
          <EditorPreview />
        </div>
      </div>
    </section>
  );
}
