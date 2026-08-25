import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { graphNodes, graphLinks } from '../data';
import type { GraphNode } from '../types';
import { FileText, StickyNote, BookMarked, User, FolderTree } from 'lucide-react';

const TYPE_CONFIG = {
  paper: { color: '#3a4a63', bg: '#3a4a63', label: 'Paper', icon: FileText },
  note: { color: '#4f6f4f', bg: '#4f6f4f', label: 'Note', icon: StickyNote },
  reference: { color: '#b8893a', bg: '#b8893a', label: 'Reference', icon: BookMarked },
  author: { color: '#6b7d99', bg: '#6b7d99', label: 'Author', icon: User },
  project: { color: '#a2533a', bg: '#a2533a', label: 'Project', icon: FolderTree },
};

export function ResearchGraph() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="py-24 lg:py-32 border-t border-paper-200 bg-ink-900 text-paper-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-paper-texture opacity-[0.03] pointer-events-none" />
      <div ref={ref} className="relative max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className={`reveal ${visible ? 'is-visible' : ''} max-w-3xl mb-16`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-6 bg-paper-300/40" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-paper-300/60">Research Graph</span>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-paper-50 leading-tight">
            See how your research
            <br />
            connects.
          </h2>
          <p className="mt-6 text-lg text-paper-300/70 leading-relaxed font-light">
            Papers cite references. Notes link to papers. Projects gather them all.
            The graph renders every relationship in your research as a living, navigable network.
          </p>
        </div>

        <div className={`reveal reveal-delay-2 ${visible ? 'is-visible' : ''} grid lg:grid-cols-12 gap-8`}>
          {/* Graph visualization */}
          <div className="lg:col-span-8 rounded-xl border border-paper-300/15 bg-ink-800/50 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-paper-300/10 flex items-center justify-between">
              <span className="text-[11px] font-mono text-paper-300/50">research-graph.svg</span>
              <span className="text-[10px] font-mono text-paper-300/40">{graphNodes.length} nodes · {graphLinks.length} edges</span>
            </div>
            <div className="relative aspect-[16/11]">
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
                {/* Links */}
                {graphLinks.map((link, i) => {
                  const from = graphNodes.find((n) => n.id === link.from)!;
                  const to = graphNodes.find((n) => n.id === link.to)!;
                  const isActive = hovered === from.id || hovered === to.id;
                  return (
                    <g key={i}>
                      <line
                        x1={from.x}
                        y1={from.y}
                        x2={to.x}
                        y2={to.y}
                        stroke={isActive ? '#6b7d99' : '#3a3a35'}
                        strokeWidth={isActive ? '0.4' : '0.2'}
                        strokeDasharray="1.5 1"
                        className="transition-all duration-500"
                        style={{ animation: `drawLine 2s ease-in-out ${i * 0.1}s forwards` }}
                      />
                    </g>
                  );
                })}

                {/* Nodes */}
                {graphNodes.map((node) => {
                  const config = TYPE_CONFIG[node.type];
                  const isHovered = hovered === node.id;
                  return (
                    <g
                      key={node.id}
                      onMouseEnter={() => setHovered(node.id)}
                      onMouseLeave={() => setHovered(null)}
                      className="cursor-pointer"
                    >
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={isHovered ? '3' : '2.2'}
                        fill={config.bg}
                        opacity={hovered && !isHovered ? 0.3 : 1}
                        className="transition-all duration-300"
                      />
                      {isHovered && (
                        <circle cx={node.x} cy={node.y} r="5" fill="none" stroke={config.color} strokeWidth="0.3" opacity="0.4" className="animate-ping" style={{ animationDuration: '1.5s' }} />
                      )}
                      <text
                        x={node.x}
                        y={node.y - 4}
                        textAnchor="middle"
                        fontSize="2"
                        fill={isHovered ? '#fdfcfa' : '#a8a8a2'}
                        className="transition-all duration-300 font-ui"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {node.label.length > 22 ? node.label.slice(0, 20) + '…' : node.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Legend / details */}
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-xl border border-paper-300/15 bg-ink-800/50 p-5">
              <h3 className="text-[11px] font-mono uppercase tracking-wider text-paper-300/50 mb-4">Node Types</h3>
              <div className="space-y-3">
                {Object.entries(TYPE_CONFIG).map(([key, cfg]) => (
                  <div key={key} className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: cfg.bg }} />
                    <span className="text-[13px] text-paper-200">{cfg.label}</span>
                    <span className="ml-auto text-[11px] font-mono text-paper-300/40">
                      {graphNodes.filter((n) => n.type === key).length}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-paper-300/15 bg-ink-800/50 p-5">
              <h3 className="text-[11px] font-mono uppercase tracking-wider text-paper-300/50 mb-3">
                {hovered ? 'Selected' : 'Hover a node'}
              </h3>
              {hovered ? (
                (() => {
                  const node = graphNodes.find((n) => n.id === hovered)!;
                  const cfg = TYPE_CONFIG[node.type];
                  const connections = graphLinks.filter((l) => l.from === node.id || l.to === node.id).length;
                  return (
                    <div className="animate-fade-in">
                      <div className="flex items-center gap-2 mb-2">
                        <cfg.icon className="w-4 h-4" style={{ color: cfg.color }} strokeWidth={1.5} />
                        <span className="text-[13px] text-paper-100 font-medium">{node.label}</span>
                      </div>
                      <div className="text-[11px] font-mono text-paper-300/50 mt-2 space-y-1">
                        <div>Type: <span className="text-paper-200">{cfg.label}</span></div>
                        <div>Connections: <span className="text-paper-200">{connections}</span></div>
                      </div>
                    </div>
                  );
                })()
              ) : (
                <p className="text-[12px] text-paper-300/40">Hover any node in the graph to inspect its relationships.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
