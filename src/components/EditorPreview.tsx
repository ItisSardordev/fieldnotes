import { useState, useEffect } from 'react';
import { Hash, Quote, Link as LinkIcon, Footprints, Eye, PenLine } from 'lucide-react';

const MARKDOWN_SOURCE = `# The Architecture of Urban Memory

## Introduction

Cities preserve memory through form, not
merely function. The street corner where a
market once stood carries its history in the
worn stone of its threshold.

According to recent research [12], the
cognitive maps we construct are shaped less
by geography than by repeated encounter.

> Research is never finished, only abandoned.

## Methodology

The study examines three districts over a
twelve-month period, combining spatial
analysis with oral history interviews.[^1]

[^1]: Jacobs, Jane. *The Death and Life...*`;

export function EditorPreview() {
  const [typed, setTyped] = useState('');
  const [showPreview, setShowPreview] = useState(true);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= MARKDOWN_SOURCE.length) {
        setTyped(MARKDOWN_SOURCE.slice(0, i));
        i += 2;
      } else {
        clearInterval(interval);
      }
    }, 18);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative rounded-xl border border-paper-300/80 bg-paper-50 shadow-2xl shadow-ink-900/5 overflow-hidden">
      {/* Window chrome */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-paper-200 bg-paper-100/60">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-paper-300" />
            <div className="w-2.5 h-2.5 rounded-full bg-paper-300" />
            <div className="w-2.5 h-2.5 rounded-full bg-paper-300" />
          </div>
          <div className="ml-3 flex items-center gap-2 text-[11px] text-ink-400 font-mono">
            <span className="text-ink-300">urban-memory.md</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowPreview(true)}
            className={`flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded transition-colors ${
              showPreview ? 'bg-paper-200 text-ink-700' : 'text-ink-400 hover:text-ink-600'
            }`}
          >
            <Eye className="w-3 h-3" strokeWidth={1.5} /> Preview
          </button>
          <button
            onClick={() => setShowPreview(false)}
            className={`flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded transition-colors ${
              !showPreview ? 'bg-paper-200 text-ink-700' : 'text-ink-400 hover:text-ink-600'
            }`}
          >
            <PenLine className="w-3 h-3" strokeWidth={1.5} /> Source
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-1 px-4 py-1.5 border-b border-paper-200/70 bg-paper-50">
        {[Hash, Quote, LinkIcon, Footprints].map((Icon, i) => (
          <button
            key={i}
            className="p-1.5 rounded text-ink-300 hover:text-ink-600 hover:bg-paper-100 transition-colors"
          >
            <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
          </button>
        ))}
        <div className="flex-1" />
        <span className="text-[10px] font-mono text-ink-300">Markdown</span>
        <div className="w-px h-3 bg-paper-300 mx-1" />
        <span className="text-[10px] font-mono text-ink-300">2,847 words</span>
      </div>

      {/* Editor body */}
      <div className="grid md:grid-cols-2 divide-x divide-paper-200 min-h-[420px]">
        {/* Markdown source */}
        <div className="relative font-mono text-[13px] leading-[1.7] p-6 lg:p-8 overflow-hidden bg-paper-50/50">
          <pre className="whitespace-pre-wrap break-words text-ink-600">
            <HighlightedMarkdown text={typed} />
            <span className="inline-block w-[2px] h-[1.1em] bg-slate-deep align-middle animate-blink -mb-[0.15em]" />
          </pre>
        </div>

        {/* Live preview */}
        <div className="hidden md:block p-6 lg:p-8 overflow-hidden bg-paper-50">
          <div className="prose-academic max-w-none">
            <RenderedMarkdown text={typed} />
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-paper-200 bg-paper-100/40 text-[10px] font-mono text-ink-400">
        <div className="flex items-center gap-4">
          <span>UTF-8</span>
          <span>Markdown</span>
          <span className="text-sage-500">● Saved</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Ln 14, Col 32</span>
          <span>23 citations</span>
        </div>
      </div>
    </div>
  );
}

function HighlightedMarkdown({ text }: { text: string }) {
  return <span className="md-syntax">{highlightMd(text)}</span>;
}

function highlightMd(text: string) {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    let content: React.ReactNode = line;
    if (line.startsWith('# ')) {
      content = <><span className="md-hash"># </span><span className="md-bold text-ink-800">{line.slice(2)}</span></>;
    } else if (line.startsWith('## ')) {
      content = <><span className="md-hash">## </span><span className="md-bold text-ink-700">{line.slice(3)}</span></>;
    } else if (line.startsWith('> ')) {
      content = <><span className="md-quote">&gt; </span><span className="italic text-ink-600">{line.slice(2)}</span></>;
    } else if (line.startsWith('[^')) {
      content = <><span className="md-footnote">{line}</span></>;
    } else {
      // inline
      const parts = line.split(/(\*\*[^*]+\*\*|\[[\d]+\]|\[[^\]]+\]\([^)]+\))/g);
      content = parts.map((p, j) => {
        if (p.startsWith('**') && p.endsWith('**')) return <span key={j} className="md-bold text-ink-700">{p}</span>;
        if (/^\[\d+\]$/.test(p)) return <span key={j} className="md-bracket md-bold">{p}</span>;
        if (p.startsWith('[')) {
          const m = p.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
          if (m) return <span key={j} className="md-link">[{m[1]}]</span>;
        }
        return <span key={j}>{p}</span>;
      });
    }
    return <span key={i}>{content}{i < lines.length - 1 ? '\n' : ''}</span>;
  });
}

function RenderedMarkdown({ text }: { text: string }) {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let inBlockquote = false;
  let blockquoteContent: string[] = [];

  const flushBlockquote = (key: string) => {
    if (blockquoteContent.length) {
      elements.push(
        <blockquote key={key} className="border-l-2 border-accent-amber/50 pl-4 italic text-ink-600 font-display text-lg my-3">
          {blockquoteContent.join(' ')}
        </blockquote>
      );
      blockquoteContent = [];
    }
  };

  lines.forEach((line, i) => {
    if (line.startsWith('# ')) {
      flushBlockquote(`bq-${i}`);
      elements.push(<h1 key={i} className="font-display text-3xl text-ink-900 mb-2 mt-0">{line.slice(2)}</h1>);
    } else if (line.startsWith('## ')) {
      flushBlockquote(`bq-${i}`);
      elements.push(<h2 key={i} className="font-display text-xl text-ink-900 mt-5 mb-2">{line.slice(3)}</h2>);
    } else if (line.startsWith('> ')) {
      inBlockquote = true;
      blockquoteContent.push(line.slice(2));
    } else if (line.startsWith('[^')) {
      flushBlockquote(`bq-${i}`);
      const match = line.match(/^\[\^(\d+)\]:\s*(.*)$/);
      if (match) {
        elements.push(
          <div key={i} className="text-[11px] text-ink-400 mt-3 pl-3 border-l border-paper-300 font-mono">
            <span className="text-slate-deep">[^{match[1]}]</span> {match[2].replace(/\*([^*]+)\*/g, '$1')}
          </div>
        );
      }
    } else if (line.trim() === '') {
      flushBlockquote(`bq-${i}`);
    } else {
      flushBlockquote(`bq-${i}`);
      inBlockquote = false;
      // inline formatting
      const processed = line
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/\*([^*]+)\*/g, '<em>$1</em>');
      const parts = processed.split(/(\[\d+\])/g);
      elements.push(
        <p key={i} className="my-2 text-ink-600 leading-[1.75]">
          {parts.map((p, j) => {
            if (/^\[\d+\]$/.test(p)) return <span key={j} className="citation-marker">{p}</span>;
            return <span key={j} dangerouslySetInnerHTML={{ __html: p }} />;
          })}
        </p>
      );
    }
  });
  flushBlockquote('bq-end');

  return <>{elements}</>;
}
