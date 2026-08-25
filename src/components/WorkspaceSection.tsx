import { useState, useEffect, useCallback } from 'react';
import { useReveal } from '../hooks/useReveal';
import { sections, references } from '../data';
import { Minimize2, Maximize2, X, ChevronRight, FileText, BookMarked, StickyNote, Archive, FileEdit, Library, Hash } from 'lucide-react';

type Panel = 'nav' | 'editor' | 'refs';

export function WorkspaceSection() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [focusMode, setFocusMode] = useState(false);
  const [activeSection, setActiveSection] = useState('sec-intro');

  return (
    <section id="editor" className="py-24 lg:py-32 border-t border-paper-200 bg-paper-100/40">
      <div ref={ref} className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className={`reveal ${visible ? 'is-visible' : ''} max-w-3xl mb-16`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-6 bg-ink-300" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-ink-400">The Workspace</span>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-ink-900 leading-tight">
            One canvas.
            <br />
            Three panels of context.
          </h2>
          <p className="mt-6 text-lg text-ink-500 leading-relaxed font-light">
            Document navigation on the left. Your writing in the center. Research references on the right.
            Press a single key and everything else fades away.
          </p>
        </div>

        <div className={`reveal reveal-delay-2 ${visible ? 'is-visible' : ''}`}>
          <WorkspaceShell
            focusMode={focusMode}
            onToggleFocus={() => setFocusMode(!focusMode)}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        </div>
      </div>
    </section>
  );
}

function WorkspaceShell({
  focusMode,
  onToggleFocus,
  activeSection,
  onSectionChange,
}: {
  focusMode: boolean;
  onToggleFocus: () => void;
  activeSection: string;
  onSectionChange: (s: string) => void;
}) {
  const [escape, setEscape] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && focusMode) {
        setEscape(true);
        setTimeout(() => {
          onToggleFocus();
          setEscape(false);
        }, 200);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [focusMode, onToggleFocus]);

  return (
    <div className="relative">
      {/* Normal workspace */}
      <div
        className={`rounded-xl border border-paper-300/80 bg-paper-50 overflow-hidden shadow-2xl shadow-ink-900/8 transition-all duration-700 ${
          focusMode ? 'opacity-0 scale-[0.98] pointer-events-none' : 'opacity-100 scale-100'
        }`}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-paper-200 bg-paper-100/50">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-ink-400">urban-memory.md</span>
            <span className="text-[10px] text-ink-300">·</span>
            <span className="text-[11px] font-mono text-sage-500">● Saved</span>
          </div>
          <button
            onClick={onToggleFocus}
            className="flex items-center gap-1.5 text-[11px] text-ink-500 hover:text-ink-900 px-2.5 py-1 rounded hover:bg-paper-200 transition-colors"
          >
            <Minimize2 className="w-3 h-3" strokeWidth={1.5} />
            Focus mode
            <kbd className="text-[9px] font-mono text-ink-300 border border-ink-200 rounded px-1 ml-1">F</kbd>
          </button>
        </div>

        {/* Three panels */}
        <div className="grid grid-cols-12 divide-x divide-paper-200 h-[560px]">
          {/* Left nav */}
          <div className="hidden md:flex col-span-3 lg:col-span-2 flex-col bg-paper-100/30">
            <div className="px-4 py-3 border-b border-paper-200/70">
              <span className="text-[10px] font-mono uppercase tracking-wider text-ink-400">Contents</span>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-0.5 editor-scroll">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => onSectionChange(s.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-[12px] transition-all group ${
                    activeSection === s.id
                      ? 'bg-ink-900/5 text-ink-900 font-medium'
                      : 'text-ink-500 hover:text-ink-800 hover:bg-paper-200/50'
                  }`}
                >
                  <span className={`font-mono text-[10px] ${activeSection === s.id ? 'text-slate-deep' : 'text-ink-300'}`}>
                    {s.number}
                  </span>
                  <span className="truncate">{s.title}</span>
                </button>
              ))}
            </div>
            <div className="px-4 py-3 border-t border-paper-200/70">
              <div className="text-[10px] font-mono uppercase tracking-wider text-ink-400 mb-2">Outline</div>
              <div className="space-y-1 text-[11px] text-ink-400">
                <div className="flex justify-between"><span>Words</span><span className="font-mono text-ink-600">2,847</span></div>
                <div className="flex justify-between"><span>Citations</span><span className="font-mono text-ink-600">23</span></div>
                <div className="flex justify-between"><span>References</span><span className="font-mono text-ink-600">8</span></div>
              </div>
            </div>
          </div>

          {/* Center editor */}
          <div className="col-span-12 md:col-span-9 lg:col-span-7 overflow-y-auto editor-scroll bg-paper-50">
            <DocumentCanvas activeSection={activeSection} />
          </div>

          {/* Right references */}
          <div className="hidden lg:flex col-span-3 flex-col bg-paper-100/30">
            <div className="px-4 py-3 border-b border-paper-200/70 flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-ink-400">References</span>
              <span className="text-[10px] font-mono text-ink-300">8</span>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2 editor-scroll">
              {references.slice(0, 6).map((r, i) => (
                <div key={r.id} className="p-2.5 rounded-md hover:bg-paper-200/50 cursor-pointer group transition-colors">
                  <div className="flex items-start gap-2">
                    <span className="font-mono text-[10px] text-slate-deep mt-0.5 shrink-0">[{i + 1}]</span>
                    <div className="min-w-0">
                      <p className="text-[12px] text-ink-700 leading-snug group-hover:text-ink-900 truncate">{r.title}</p>
                      <p className="text-[10px] text-ink-400 mt-0.5">{r.author} · {r.year}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Focus mode overlay */}
      {focusMode && (
        <div
          className={`fixed inset-0 z-40 bg-paper-50 flex flex-col items-center justify-center px-6 ${
            escape ? 'animate-fade-out' : 'animate-fade-in'
          }`}
        >
          <div className="max-w-reading w-full mx-auto">
            <h1 className="font-display text-4xl lg:text-5xl text-ink-900 text-center leading-tight mb-8 animate-fade-in-up">
              The Architecture
              <br />
              of Urban Memory
            </h1>
            <div className="text-ink-600 text-lg leading-[1.85] font-light text-pretty animate-fade-in-up" style={{ animationDelay: '0.15s', opacity: 0 }}>
              <p className="mb-4">Cities preserve memory through form, not merely function. The street corner where a market once stood carries its history in the worn stone of its threshold.</p>
              <p className="mb-4">According to recent research <sup className="text-slate-deep text-xs">[12]</sup>, the cognitive maps we construct are shaped less by geography than by repeated encounter — the daily rhythm of footsteps that etch a path into both stone and mind.</p>
              <p className="mb-4">This study examines three districts over a twelve-month period, combining spatial analysis with oral history interviews to trace how urban memory accumulates, erodes, and occasionally resurfaces in the gaps between planned and lived space.<sup className="text-slate-deep text-xs">[^1]</sup></p>
              <p>
                <span className="inline-block w-[2px] h-[1.1em] bg-slate-deep align-middle animate-blink -mb-[0.15em]" />
              </p>
            </div>
          </div>

          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 text-[11px] font-mono text-ink-300 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <span>Page 1 of 24</span>
            <span className="text-ink-200">·</span>
            <span>Press Esc to exit focus mode</span>
          </div>

          <button
            onClick={onToggleFocus}
            className="fixed top-6 right-6 p-2 text-ink-400 hover:text-ink-700 hover:bg-paper-200 rounded-md transition-colors"
          >
            <X className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>
      )}
    </div>
  );
}

function DocumentCanvas({ activeSection }: { activeSection: string }) {
  const section = sections.find((s) => s.id === activeSection) || sections[0];
  return (
    <div className="max-w-editor mx-auto px-8 lg:px-12 py-10">
      <div className="mb-8">
        <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-ink-300 mb-3">{section.number} · Section</div>
        <h2 className="font-display text-3xl text-ink-900">{section.title}</h2>
      </div>

      <div className="prose-academic max-w-none">
        {section.id === 'sec-intro' && <IntroContent />}
        {section.id === 'sec-lit' && <LitContent />}
        {section.id === 'sec-method' && <MethodContent />}
        {section.id === 'sec-results' && <ResultsContent />}
        {section.id === 'sec-disc' && <DiscContent />}
        {section.id === 'sec-conc' && <ConcContent />}
      </div>
    </div>
  );
}

function IntroContent() {
  return (
    <>
      <p>Cities preserve memory through form, not merely function. The street corner where a market once stood carries its history in the worn stone of its threshold, even after the market itself has long since vanished.</p>
      <p>According to recent research <span className="citation-marker">[12]</span>, the cognitive maps we construct are shaped less by geography than by repeated encounter — the daily rhythm of footsteps that etch a path into both stone and mind.</p>
      <blockquote>Research is never finished, only abandoned.</blockquote>
      <p>This study examines three districts over a twelve-month period, combining spatial analysis with oral history interviews to trace how urban memory accumulates, erodes, and occasionally resurfaces in the gaps between planned and lived space.<sup className="text-[10px] text-slate-deep">[1]</sup></p>
    </>
  );
}
function LitContent() {
  return (
    <>
      <p>The literature on urban memory spans several decades and disciplines. Lynch's foundational work on the image of the city <span className="citation-marker">[2]</span> established the vocabulary of paths, edges, districts, nodes, and landmarks that remains in use today.</p>
      <p>Rossi's <em>Architecture of the City</em> <span className="citation-marker">[3]</span> extended this framework into the realm of collective memory, arguing that the city itself is the repository of its own history, written in the language of form.</p>
      <p>More recently, Sennett <span className="citation-marker">[8]</span> has examined how contemporary urban design can either close down or open up the embodied experience of place.</p>
    </>
  );
}
function MethodContent() {
  return (
    <>
      <p>The study employs a mixed-methods approach across three post-industrial districts. Spatial analysis draws on GIS mapping and architectural survey, while oral history interviews capture the lived experience of long-term residents.</p>
      <pre><code>{`# Spatial analysis pipeline
districts = ["Northside", "Rail Yards", "Old Quarter"]
for d in districts:
    survey(d, method="systematic")
    interview(d, n=15, years_resident=True)`}</code></pre>
      <p>Interview transcripts were coded thematically using a framework derived from Lynch <span className="citation-marker">[2]</span> and Milgram <span className="citation-marker">[7]</span>, with attention to the recurrence of spatial markers in personal narratives.</p>
    </>
  );
}
function ResultsContent() {
  return (
    <>
      <p>Results indicate a 34% increase in spatial recall among participants who walked regular routes through the study districts, compared to those who traversed them irregularly.</p>
      <p>Three patterns emerged consistently across all districts: threshold memory, route anchoring, and landmark displacement — the phenomenon by which a vanished landmark continues to orient spatial cognition long after its physical removal.</p>
    </>
  );
}
function DiscContent() {
  return (
    <>
      <p>These findings complicate the prevailing assumption that urban memory is primarily a matter of preservation — of keeping old buildings standing. Our data suggests instead that memory is a practice, sustained through movement and repetition.</p>
      <blockquote>The city is a palimpsest of memory, written over and over in the same hand.</blockquote>
      <p>This aligns with Jacobs' argument that urban vitality depends not on monumental form but on the daily choreography of use <span className="citation-marker">[1]</span>.</p>
    </>
  );
}
function ConcContent() {
  return (
    <>
      <p>If urban memory is a practice rather than a deposit, then the design challenge is not how to preserve the past but how to sustain the conditions under which memory continues to be made.</p>
      <p>This reorientation has implications for heritage policy, participatory planning, and the emerging field of spatial humanities — and it suggests a research agenda that takes the walking body, rather than the static monument, as its primary unit of analysis.</p>
    </>
  );
}
