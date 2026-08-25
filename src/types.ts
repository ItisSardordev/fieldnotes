export type CitationStyle = 'APA' | 'MLA' | 'Chicago' | 'IEEE';

export interface Reference {
  id: string;
  title: string;
  author: string;
  year: number;
  publisher: string;
  journal?: string;
  doi?: string;
  type: 'book' | 'paper' | 'journal' | 'note';
}

export interface ResearchDoc {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  lastEdited: string;
  citations: number;
  status: 'Draft' | 'In Review' | 'Published' | 'Archived';
  type: 'Research Paper' | 'Essay' | 'Field Report' | 'Notes' | 'Reading List';
  category: 'My Research';
}

export interface Section {
  id: string;
  number: string;
  title: string;
  level: number;
}

export interface Comment {
  id: string;
  author: string;
  initials: string;
  color: string;
  text: string;
  time: string;
  resolved: boolean;
  highlight?: string;
}

export interface VersionEntry {
  id: string;
  time: string;
  label: string;
  group: string;
}

export interface JournalEntry {
  id: string;
  title: string;
  author: string;
  excerpt: string;
  date: string;
  readTime: string;
  tag: string;
}

export interface GraphNode {
  id: string;
  label: string;
  type: 'paper' | 'note' | 'author' | 'reference' | 'project';
  x: number;
  y: number;
}

export interface GraphLink {
  from: string;
  to: string;
}
