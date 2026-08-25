import { useReveal } from '../hooks/useReveal';
import { FlaskConical, Calendar, Building2 } from 'lucide-react';

const LAB_CARDS = [
  {
    initials: 'UM',
    name: 'Urban Memory Research Group',
    field: 'Urban Studies & Spatial Cognition',
    desc: 'Cognitive mapping, spatial memory, and the phenomenology of urban form.',
    papers: 12,
    members: 6,
    color: '#3a4a63',
  },
  {
    initials: 'CH',
    name: 'Computational Humanities Lab',
    field: 'Digital Humanities & Text Analysis',
    desc: 'Corpus linguistics, distant reading, and computational approaches to literary history.',
    papers: 24,
    members: 9,
    color: '#4f6f4f',
  },
  {
    initials: 'EP',
    name: 'Environmental Policy Collective',
    field: 'Environmental Science & Policy',
    desc: 'Transdisciplinary research on climate adaptation, governance, and ecological justice.',
    papers: 18,
    members: 7,
    color: '#b8893a',
  },
  {
    initials: 'SM',
    name: 'Science & Media Initiative',
    field: 'Science Communication',
    desc: 'How scientific knowledge circulates, translates, and sometimes distorts in public discourse.',
    papers: 9,
    members: 5,
    color: '#6b7d99',
  },
];

export function SocialProof() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section className="py-24 lg:py-32 border-t border-paper-200 relative overflow-hidden">
      <div className="absolute inset-0 bg-paper-texture opacity-30 pointer-events-none" />
      <div ref={ref} className="relative max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className={`reveal ${visible ? 'is-visible' : ''} text-center max-w-4xl mx-auto mb-20`}>
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-6 bg-ink-300" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-ink-400">Adoption</span>
            <div className="h-px w-6 bg-ink-300" />
          </div>

          <div className="grid grid-cols-2 gap-8 lg:gap-16 mb-12">
            <div>
              <div className="font-display text-6xl lg:text-7xl text-ink-900 leading-none">14</div>
              <div className="mt-3 text-[12px] font-mono uppercase tracking-wider text-ink-400">university labs</div>
            </div>
            <div>
              <div className="font-display text-6xl lg:text-7xl text-ink-900 leading-none">1<span className="text-ink-400">yr</span></div>
              <div className="mt-3 text-[12px] font-mono uppercase tracking-wider text-ink-400">since launch</div>
            </div>
          </div>

          <p className="font-display text-2xl lg:text-3xl text-ink-700 leading-snug text-balance italic max-w-3xl mx-auto">
            Field Notes became the writing environment of choice for 14 university labs
            within its first year.
          </p>
        </div>

        {/* Lab cards */}
        <div className={`reveal reveal-delay-2 ${visible ? 'is-visible' : ''} grid sm:grid-cols-2 lg:grid-cols-4 gap-4`}>
          {LAB_CARDS.map((lab) => (
            <div
              key={lab.initials}
              className="rounded-lg border border-paper-300/70 bg-paper-50 p-5 hover:shadow-lg hover:shadow-ink-900/5 hover:border-paper-400 transition-all group"
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center text-[14px] font-display text-paper-50 mb-4"
                style={{ background: lab.color }}
              >
                {lab.initials}
              </div>
              <h4 className="text-[13px] font-medium text-ink-800 leading-snug">{lab.name}</h4>
              <p className="text-[11px] text-ink-400 mt-1 font-mono">{lab.field}</p>
              <p className="text-[12px] text-ink-500 mt-3 leading-relaxed">{lab.desc}</p>
              <div className="mt-4 pt-4 border-t border-paper-200 flex items-center justify-between text-[11px] text-ink-400">
                <span className="flex items-center gap-1.5">
                  <FlaskConical className="w-3 h-3" strokeWidth={1.5} />
                  {lab.papers} papers
                </span>
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-3 h-3" strokeWidth={1.5} />
                  {lab.members} researchers
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
