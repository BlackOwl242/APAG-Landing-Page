export interface NavMenuItem {
  label: string;
  href: string;
  type: 'scroll' | 'page';
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  link: string;
  isScroll: boolean;
}

export interface DropdownMenuItem {
  label: string;
  href: string;
}

export interface HistoryEvent {
  date: string;
  content: string;
}

export interface BranchItem {
  id: string;
  name: string;
  desc: string;
}

export interface TimelineStep {
  id: string;
  date: string;
  title: string;
  desc: string;
}

export interface MethodTimeline {
  label: string;
  time: string;
}

export interface AdmissionMethod {
  id: string;
  title: string;
  conditions: string[];
  documents: string[];
  timeline: MethodTimeline[];
}
