export enum AgentRole {
  IDLE = 'IDLE',
  PLANNER = 'PLANNER',
  DESIGNER = 'DESIGNER',
  ARCHITECT = 'ARCHITECT',
  CODER = 'CODER',
  COMPILER = 'COMPILER',
  PATCHER = 'PATCHER',
  READY = 'READY'
}

export interface LogEntry {
  id: string;
  timestamp: string;
  agent: AgentRole;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
}

export interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  content?: string;
  active?: boolean;
}

export interface ProjectState {
  status: AgentRole;
  logs: LogEntry[];
  files: FileNode[];
  currentFileContent: string;
  activeFile: string;
  iteration: number;
  previewReady: boolean;
  hasError: boolean;
}