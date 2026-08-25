import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { comments, versionHistory, labMembers } from '../data';
import { MessageSquare, Check, Reply, RotateCcw, History, Users2, Circle } from 'lucide-react';

export function CollaborationSection() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section className="py-24 lg:py-32 border-t border-paper-200">
      <div ref={ref} className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className={`reveal ${visible ? 'is-visible' : ''} max-w-3xl mb-16`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-6 bg-ink-300" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-ink-400">Collaboration</span>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-ink-900 leading-tight">
            Research is a conversation.
            <br />
            Field Notes keeps the thread.
          </h2>
          <p className="mt-6 text-lg text-ink-500 leading-relaxed font-light">
            Comments, suggestions, version history, and live presence — built for the way
            labs actually work on a manuscript together.
          </p>
        </div>

        <div className={`reveal reveal-delay-2 ${visible ? 'is-visible' : ''} grid lg:grid-cols-12 gap-6`}>
          {/* Comments */}
          <div className="lg:col-span-5">
            <CommentsPanel />
          </div>

          {/* Version history */}
          <div className="lg:col-span-4">
            <VersionHistory />
          </div>

          {/* Team presence */}
          <div className="lg:col-span-3">
            <TeamPresence />
          </div>
        </div>
      </div>
    </section>
  );
}

function CommentsPanel() {
  const [commentList, setCommentList] = useState(comments);

  const resolve = (id: string) => {
    setCommentList((prev) => prev.map((c) => (c.id === id ? { ...c, resolved: !c.resolved } : c)));
  };

  return (
    <div className="rounded-xl border border-paper-300/80 bg-paper-50 overflow-hidden shadow-lg shadow-ink-900/5 h-full flex flex-col">
      <div className="px-5 py-4 border-b border-paper-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-ink-500" strokeWidth={1.5} />
          <h3 className="font-display text-xl text-ink-900">Comments</h3>
        </div>
        <span className="text-[11px] font-mono text-ink-400">{commentList.filter((c) => !c.resolved).length} open</span>
      </div>
      <div className="flex-1 divide-y divide-paper-200 overflow-y-auto max-h-[480px] editor-scroll">
        {commentList.map((c) => (
          <div key={c.id} className={`p-5 transition-opacity ${c.resolved ? 'opacity-50' : ''}`}>
            <div className="flex items-start gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-medium text-paper-50 shrink-0"
                style={{ background: c.color }}
              >
                {c.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-medium text-ink-800">{c.author}</span>
                  <span className="text-[11px] text-ink-400 font-mono">{c.time}</span>
                </div>
                {c.highlight && (
                  <div className="mt-2 px-3 py-1.5 bg-accent-amber/10 border-l-2 border-accent-amber/40 rounded-sm">
                    <p className="text-[12px] text-ink-500 italic leading-snug">"{c.highlight}"</p>
                  </div>
                )}
                <p className="mt-2 text-[13px] text-ink-600 leading-relaxed">{c.text}</p>
                <div className="mt-3 flex items-center gap-2">
                  {!c.resolved ? (
                    <>
                      <button
                        onClick={() => resolve(c.id)}
                        className="flex items-center gap-1.5 text-[11px] text-ink-500 hover:text-sage-600 px-2.5 py-1 rounded hover:bg-sage-50 transition-colors"
                      >
                        <Check className="w-3 h-3" strokeWidth={2} /> Resolve
                      </button>
                      <button className="flex items-center gap-1.5 text-[11px] text-ink-500 hover:text-ink-800 px-2.5 py-1 rounded hover:bg-paper-100 transition-colors">
                        <Reply className="w-3 h-3" strokeWidth={1.5} /> Reply
                      </button>
                    </>
                  ) : (
                    <span className="flex items-center gap-1.5 text-[11px] text-sage-600 px-2.5 py-1">
                      <Check className="w-3 h-3" strokeWidth={2} /> Resolved
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VersionHistory() {
  const [restoredId, setRestoredId] = useState<string | null>(null);

  const grouped = versionHistory.reduce<Record<string, typeof versionHistory>>((acc, v) => {
    if (!acc[v.group]) acc[v.group] = [];
    acc[v.group].push(v);
    return acc;
  }, {});

  return (
    <div className="rounded-xl border border-paper-300/80 bg-paper-50 overflow-hidden shadow-lg shadow-ink-900/5 h-full flex flex-col">
      <div className="px-5 py-4 border-b border-paper-200 flex items-center gap-2">
        <History className="w-4 h-4 text-ink-500" strokeWidth={1.5} />
        <h3 className="font-display text-xl text-ink-900">Version History</h3>
      </div>
      <div className="flex-1 overflow-y-auto max-h-[480px] editor-scroll p-5">
        {Object.entries(grouped).map(([group, entries]) => (
          <div key={group} className="mb-6 last:mb-0">
            <div className="text-[10px] font-mono uppercase tracking-wider text-ink-400 mb-3 sticky top-0 bg-paper-50 py-1">
              {group}
            </div>
            <div className="relative pl-5 space-y-4 before:absolute before:left-[5px] before:top-1 before:bottom-1 before:w-px before:bg-paper-300">
              {entries.map((v) => (
                <div key={v.id} className="relative group">
                  <div className={`absolute -left-[18px] top-1 w-2.5 h-2.5 rounded-full border-2 transition-all ${
                    restoredId === v.id ? 'bg-sage-500 border-sage-500' : 'bg-paper-50 border-paper-400 group-hover:border-ink-500'
                  }`} />
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[12px] font-mono text-ink-500">{v.time}</span>
                      <p className="text-[13px] text-ink-700 mt-0.5">{v.label}</p>
                    </div>
                    <button
                      onClick={() => {
                        setRestoredId(v.id);
                        setTimeout(() => setRestoredId(null), 2000);
                      }}
                      className="opacity-0 group-hover:opacity-100 flex items-center gap-1 text-[10px] font-mono text-ink-400 hover:text-slate-deep px-2 py-1 rounded hover:bg-slate-blue/5 transition-all"
                    >
                      <RotateCcw className="w-2.5 h-2.5" strokeWidth={1.5} />
                      {restoredId === v.id ? 'Restored' : 'Restore'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TeamPresence() {
  return (
    <div className="rounded-xl border border-paper-300/80 bg-paper-50 overflow-hidden shadow-lg shadow-ink-900/5 h-full flex flex-col">
      <div className="px-5 py-4 border-b border-paper-200 flex items-center gap-2">
        <Users2 className="w-4 h-4 text-ink-500" strokeWidth={1.5} />
        <h3 className="font-display text-xl text-ink-900">Active Now</h3>
      </div>
      <div className="flex-1 p-4 space-y-2">
        {labMembers.map((m, i) => (
          <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-paper-100/50 transition-colors group">
            <div className="relative">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-medium text-paper-50"
                style={{ background: m.color }}
              >
                {m.initials}
              </div>
              {i < 3 && (
                <Circle className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 fill-sage-400 text-sage-400 bg-paper-50 rounded-full" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] text-ink-800 font-medium truncate">{m.name}</p>
              <p className="text-[11px] text-ink-400 truncate">{m.role}</p>
            </div>
            {i < 3 && <span className="text-[10px] font-mono text-sage-500">editing</span>}
          </div>
        ))}
      </div>
      <div className="px-5 py-3 border-t border-paper-200 bg-paper-100/30">
        <div className="flex items-center gap-2 text-[11px] text-ink-400">
          <div className="flex -space-x-1.5">
            {labMembers.slice(0, 4).map((m, i) => (
              <div
                key={i}
                className="w-5 h-5 rounded-full border-2 border-paper-50 flex items-center justify-center text-[8px] font-medium text-paper-50"
                style={{ background: m.color }}
              >
                {m.initials}
              </div>
            ))}
          </div>
          <span>Urban Memory Lab · 5 members</span>
        </div>
      </div>
    </div>
  );
}
