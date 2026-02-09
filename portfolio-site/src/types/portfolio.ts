export interface Project {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  businessValue: string;
  complexity: 'High' | 'Medium' | 'Low';
  salesReady: number;
  techStack: string[];
  type: string;
  tests?: string;
  docs?: string;
  timeSavings?: string;
  flagship?: boolean;
  metrics?: Record<string, string>;
  plans?: string[];
  automatedProcesses?: AutomatedProcess[];
  architecture?: string[][];
}

export interface AutomatedProcess {
  stage: string;
  agents?: string;
  description: string;
  time?: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface EcosystemLink {
  from: string;
  to: string;
  label?: string;
}
