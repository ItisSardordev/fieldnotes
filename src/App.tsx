import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { MarkdownShowcase } from './components/MarkdownShowcase';
import { WorkspaceSection } from './components/WorkspaceSection';
import { CitationSystem } from './components/CitationSystem';
import { ResearchLibrary } from './components/ResearchLibrary';
import { ResearchGraph } from './components/ResearchGraph';
import { CollaborationSection } from './components/CollaborationSection';
import { LabWorkspace } from './components/LabWorkspace';
import { SocialProof } from './components/SocialProof';
import { Pricing } from './components/Pricing';
import { Journal } from './components/Journal';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-paper-50 text-ink-800">
      <Navigation />
      <main>
        <Hero />
        <MarkdownShowcase />
        <WorkspaceSection />
        <CitationSystem />
        <ResearchLibrary />
        <ResearchGraph />
        <CollaborationSection />
        <LabWorkspace />
        <SocialProof />
        <Pricing />
        <Journal />
      </main>
      <Footer />
    </div>
  );
}
