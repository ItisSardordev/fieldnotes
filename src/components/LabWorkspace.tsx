import { useReveal } from '../hooks/useReveal';
import { labMembers, researchDocs, references } from '../data';
import { Users2, Share2, GitBranch, MessageSquare, Lock, BookMarked, FileText, TrendingUp, ArrowRight } from 'lucide-react';

const LAB_FEATURES = [
  { icon: Share2, title: 'Shared research', desc: 'All lab documents in one workspace, with per-project organization.' },
  { icon: BookMarked, title: 'Team references', desc: 'A shared citation library that every member can cite from.' },
  { icon: Lock, title: 'Permissions', desc: 'Granular access — PIs, researchers, and visitors see exactly what they should.' },
  { icon: MessageSquare, title: 'Comments', desc: 'Inline review on every manuscript, threaded and resolvable.' },
  { icon: GitBranch, title: 'Version history', desc: 'Every change tracked. Restore any version with a single click.' },
  { icon: Users2, title: 'Shared citation libraries', desc: 'Export an entire lab bibliography in APA, MLA, Chicago, or IEEE.' },
];

export function LabWorkspace() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="labs" className="py-24 lg:py-32 border-t border-paper-200 bg-paper-100/40">
      <div ref={ref} className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className={`reveal ${visible ? 'is-visible' : ''} max-w-3xl mb-16`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-6 bg-ink-300" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-ink-400">Team / Lab</span>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-ink-900 leading-tight">
            One workspace for
            <br />
            the entire lab.
          </h2>
          <p className="mt-6 text-lg text-ink-500 leading-relaxed font-light">
            Field Notes gives university research teams a shared environment for
            manuscripts, references, and review — without the friction of email attachments
            and scattered drafts.
          </p>
        </div>

        {/* Lab dashboard preview */}
        <div className={`reveal reveal-delay-2 ${visible ? 'is-visible' : ''} rounded-xl border border-paper-300/80 bg-paper-50 overflow-hidden shadow-2xl shadow-ink-900/8 mb-12`}>
          {/* Dashboard header */}
          <div className="px-6 py-5 border-b border-paper-200 bg-paper-100/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-2xl text-ink-900">Urban Memory Lab</h3>
              <p className="text-[12px] text-ink-400 mt-1">Department of Urban Studies · Est. 2024</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {labMembers.map((m, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-paper-50 flex items-center justify-center text-[10px] font-medium text-paper-50"
                    style={{ background: m.color }}
                    title={m.name}
                  >
                    {m.initials}
                  </div>
                ))}
              </div>
              <button className="text-[12px] bg-ink-900 text-paper-50 px-3 py-1.5 rounded-md hover:bg-ink-800 transition-colors flex items-center gap-1.5">
                <Users2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                Invite
              </button>
            </div>
          </div>

          {/* Dashboard grid */}
          <div className="grid md:grid-cols-3 divide-x divide-paper-200">
            {/* Stats */}
            <div className="p-5">
              <div className="text-[10px] font-mono uppercase tracking-wider text-ink-400 mb-4">Lab Overview</div>
              <div className="space-y-4">
                <StatRow icon={FileText} label="Active manuscripts" value="7" />
                <StatRow icon={BookMarked} label="Shared references" value="142" />
                <StatRow icon={MessageSquare} label="Open comments" value="23" />
                <StatRow icon={TrendingUp} label="Citations this quarter" value="89" />
              </div>
            </div>

            {/* Recent activity */}
            <div className="p-5">
              <div className="text-[10px] font-mono uppercase tracking-wider text-ink-400 mb-4">Recent Activity</div>
              <div className="space-y-3">
                {researchDocs.slice(0, 4).map((d) => (
                  <div key={d.id} className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-1 h-8 rounded-full bg-paper-300 group-hover:bg-slate-deep transition-colors" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] text-ink-700 truncate group-hover:text-ink-900">{d.title}</p>
                      <p className="text-[10px] text-ink-400 font-mono">{d.lastEdited} · {d.author}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shared references */}
            <div className="p-5">
              <div className="text-[10px] font-mono uppercase tracking-wider text-ink-400 mb-4">Shared Library</div>
              <div className="space-y-2">
                {references.slice(0, 4).map((r, i) => (
                  <div key={r.id} className="flex items-start gap-2 group cursor-pointer">
                    <span className="font-mono text-[10px] text-slate-deep mt-0.5">[{i + 1}]</span>
                    <div className="min-w-0">
                      <p className="text-[12px] text-ink-600 truncate group-hover:text-ink-900">{r.title}</p>
                      <p className="text-[10px] text-ink-400">{r.author} · {r.year}</p>
                    </div>
                  </div>
                ))}
                <button className="text-[11px] text-slate-deep hover:underline mt-2 flex items-center gap-1">
                  View all 142 references <ArrowRight className="w-3 h-3" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features grid */}
        <div className={`reveal reveal-delay-3 ${visible ? 'is-visible' : ''} grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-paper-300/50 rounded-lg overflow-hidden border border-paper-300/50`}>
          {LAB_FEATURES.map((f) => (
            <div key={f.title} className="bg-paper-50 p-6 hover:bg-paper-100/40 transition-colors group">
              <f.icon className="w-5 h-5 text-ink-400 group-hover:text-ink-700 transition-colors mb-3" strokeWidth={1.5} />
              <h4 className="text-[14px] font-medium text-ink-800 mb-1.5">{f.title}</h4>
              <p className="text-[13px] text-ink-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <Icon className="w-4 h-4 text-ink-400" strokeWidth={1.5} />
        <span className="text-[12px] text-ink-500">{label}</span>
      </div>
      <span className="text-[16px] font-display text-ink-900">{value}</span>
    </div>
  );
}
