import { useState, useEffect } from 'react';
import { useReveal } from '../hooks/useReveal';
import { ArrowRight } from 'lucide-react';

const FULL_MD = `## Methodology

The study examines three districts over a
twelve-month period, combining spatial
analysis with oral history interviews.

According to recent research [12], cognitive
maps are shaped by repeated encounter.

> The city is a palimpsest of memory.

Results show a 34% increase in recall when
participants walked routes regularly.[^2]`;

const RENDERED_STEPS = [
  { h2: 'Methodology', paras: ['The study examines three districts over a twelve-month period, combining spatial analysis with oral history interviews.'] },
  { h2: 'Methodology', paras: ['The study examines three districts over a twelve-month period, combining spatial analysis with oral history interviews.', 'According to recent research [12], cognitive maps are shaped by repeated encounter.'] },
  { h2: 'Methodology', paras: ['The study examines three districts over a twelve-month period, combining spatial analysis with oral history interviews.', 'According to recent research [12], cognitive maps are shaped by repeated encounter.', 'blockquote: The city is a palimpsest of memory.'] },
  { h2: 'Methodology', paras: ['The study examines three districts over a twelve-month period, combining spatial analysis with oral history interviews.', 'According to recent research [12], cognitive maps are shaped by repeated encounter.', 'blockquote: The city is a palimpsest of memory.', 'Results show a 34% increase in recall when participants walked routes regularly.[^2]'] },
];

export function MarkdownShowcase() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!visible || !auto) return;
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % RENDERED_STEPS.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [visible, auto]);

  return (
    <section className="py-24 lg:py-32 border-t border-paper-200 bg-paper-100/50">
      <div ref={ref} className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className={`reveal ${visible ? 'is-visible' : ''} max-w-3xl mb-16`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-6 bg-ink-300" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-ink-400">Markdown Engine</span>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-ink-900 leading-tight">
            Markdown underneath.
            <br />
            Clarity on top.
          </h2>
          <p className="mt-6 text-lg text-ink-500 leading-relaxed font-light">
            Every document is plain text — portable, version-controllable, future-proof.
            Field Notes renders it into a beautiful academic document the moment you type.
          </p>
        </div>

        <div
          className={`reveal reveal-delay-2 ${visible ? 'is-visible' : ''} grid lg:grid-cols-2 gap-px bg-paper-300/60 rounded-xl overflow-hidden border border-paper-300/60`}
          onMouseEnter={() => setAuto(false)}
          onMouseLeave={() => setAuto(true)}
        >
          {/* Left: raw markdown */}
          <div className="bg-paper-50 p-6 lg:p-8">
            <div className="flex items-center justify-between mb-5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-ink-400">Source</span>
              <span className="text-[10px] font-mono text-ink-300">.md</span>
            </div>
            <pre className="font-mono text-[13px] leading-[1.8] text-ink-500 whitespace-pre-wrap">
              <span className="md-syntax">{renderMdSyntax(FULL_MD)}</span>
            </pre>
          </div>

          {/* Right: rendered */}
          <div className="bg-paper-50 p-6 lg:p-8 min-h-[340px]">
            <div className="flex items-center justify-between mb-5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-ink-400">Rendered</span>
              <div className="flex gap-1">
                {RENDERED_STEPS.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      i <= step ? 'w-6 bg-slate-deep' : 'w-3 bg-paper-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="prose-academic max-w-none transition-all duration-500" key={step}>
              <RenderedDoc step={RENDERED_STEPS[step]} />
            </div>
          </div>
        </div>

        <div className={`reveal reveal-delay-3 ${visible ? 'is-visible' : ''} mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-ink-400`}>
          {['Footnotes', 'Citation markers', 'Tables', 'Math (KaTeX)', 'Code blocks', 'Task lists', 'Links & images'].map((f) => (
            <span key={f} className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-sage-400" />
              {f}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function renderMdSyntax(text: string) {
  return text.split('\n').map((line, i) => {
    let content: React.ReactNode = line;
    if (line.startsWith('## ')) {
      content = <><span className="md-hash">## </span><span className="md-bold text-ink-700">{line.slice(3)}</span></>;
    } else if (line.startsWith('> ')) {
      content = <><span className="md-quote">&gt; </span><span className="italic text-ink-600">{line.slice(2)}</span></>;
    } else if (line.startsWith('[^')) {
      content = <span className="md-footnote">{line}</span>;
    } else {
      const parts = line.split(/(\[\d+\]|\*\*[^*]+\*\*)/g);
      content = parts.map((p, j) => {
        if (/^\[\d+\]$/.test(p)) return <span key={j} className="md-bracket md-bold">{p}</span>;
        if (p.startsWith('**')) return <span key={j} className="md-bold text-ink-700">{p}</span>;
        return <span key={j}>{p}</span>;
      });
    }
    return <div key={i}>{content}</div>;
  });
}

function RenderedDoc({ step }: { step: typeof RENDERED_STEPS[0] }) {
  return (
    <div className="animate-fade-in">
      <h2 className="font-display text-2xl text-ink-900 mb-3">{step.h2}</h2>
      {step.paras.map((p, i) => {
        if (p.startsWith('blockquote:')) {
          return (
            <blockquote key={i} className="border-l-2 border-accent-amber/50 pl-4 italic text-ink-600 font-display text-lg my-3 animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
              {p.slice(11).trim()}
            </blockquote>
          );
        }
        const parts = p.split(/(\[\d+\]|\[\^\d+\])/g);
        return (
          <p key={i} className="my-2 text-ink-600 leading-[1.75] animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
            {parts.map((part, j) => {
              if (/^\[\d+\]$/.test(part)) return <span key={j} className="citation-marker">{part}</span>;
              if (/^\[\^\d+\]$/.test(part)) return <sup key={j} className="text-slate-deep text-[10px]">{part.match(/\d+/)?.[0]}</sup>;
              return <span key={j}>{part}</span>;
            })}
          </p>
        );
      })}
    </div>
  );
}
