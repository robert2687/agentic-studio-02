import React, { useState, useEffect, useRef } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { AgentRole, LogEntry, ProjectState } from './types';
import { INITIAL_FILES, MOCK_CODE_HEADER, MOCK_CODE_ERROR, MOCK_CODE_PATCHED } from './constants';
import { AgentGraph } from './components/AgentGraph';
import { Terminal } from './components/Terminal';
import { FileExplorer } from './components/FileExplorer';
import { CodeEditor } from './components/CodeEditor';
import { Preview } from './components/Preview';
import { ErrorBoundary } from './components/ErrorBoundary';
import { 
  Play, RotateCcw, Box, Wand2, ShieldCheck, 
  Files, Search, GitGraph, Settings, LayoutTemplate, 
  AlertCircle, Check, Wifi, GitBranch 
} from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<ProjectState>({
    status: AgentRole.IDLE,
    logs: [],
    files: INITIAL_FILES,
    currentFileContent: '',
    activeFile: '',
    iteration: 0,
    previewReady: false,
    hasError: false,
  });

  const [prompt, setPrompt] = useState("Create a modern crypto dashboard with dark mode and real-time charts.");
  const [simRunning, setSimRunning] = useState(false);
  const streamInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (streamInterval.current) clearInterval(streamInterval.current);
    };
  }, []);

  const addLog = (agent: AgentRole, message: string, type: LogEntry['type'] = 'info') => {
    setState(prev => ({
      ...prev,
      logs: [...prev.logs, {
        id: Math.random().toString(36),
        timestamp: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' }),
        agent,
        message,
        type
      }]
    }));
  };

  const runSimulation = () => {
    if (simRunning) return;
    setSimRunning(true);
    
    // Reset state
    setState(prev => ({
      ...prev,
      logs: [],
      status: AgentRole.PLANNER,
      previewReady: false,
      hasError: false,
      currentFileContent: '',
      activeFile: ''
    }));

    addLog(AgentRole.IDLE, "Initializing Agentic Studio Pro...", 'info');
    
    // Simulation Timeline
    setTimeout(() => phasePlanner(), 1000);
  };

  // --- Simulation Phases (Same logic, new wrapping) ---
  const phasePlanner = () => {
    setState(prev => ({ ...prev, status: AgentRole.PLANNER }));
    addLog(AgentRole.PLANNER, `Analyzing prompt: "${prompt}"`, 'info');
    setTimeout(() => {
        addLog(AgentRole.PLANNER, "Generated feature list: [Auth, Dashboard, Metrics, Charts, Activity Log]", 'success');
        addLog(AgentRole.PLANNER, "Mandate: Generating diverse mock data (User Profiles, Transaction Histories) for src/lib/mockData.ts", 'warning');
        setTimeout(() => phaseDesigner(), 1500);
    }, 1500);
  };

  const phaseDesigner = () => {
    setState(prev => ({ ...prev, status: AgentRole.DESIGNER }));
    addLog(AgentRole.DESIGNER, "Generating Design System (theme.json)...", 'info');
    setTimeout(() => {
        addLog(AgentRole.DESIGNER, "Colors: Studio Dark Palette (Slate/Blue/Purple)", 'success');
        addLog(AgentRole.DESIGNER, "Typography: Inter / Fira Code", 'success');
        setTimeout(() => phaseArchitect(), 1500);
    }, 1500);
  };

  const phaseArchitect = () => {
    setState(prev => ({ ...prev, status: AgentRole.ARCHITECT }));
    addLog(AgentRole.ARCHITECT, "Scaffolding directory structure in WebContainer...", 'info');
    setTimeout(() => {
        addLog(AgentRole.ARCHITECT, "Created src/components, src/lib, src/app", 'success');
        addLog(AgentRole.ARCHITECT, "Initialized package.json with dependencies", 'success');
        setTimeout(() => phaseCoder(), 1500);
    }, 1500);
  };

  const phaseCoder = () => {
    setState(prev => ({ ...prev, status: AgentRole.CODER, activeFile: 'Header.tsx' }));
    addLog(AgentRole.CODER, "Generating src/components/Header.tsx...", 'info');
    
    // Stream Code Effect
    let i = 0;
    streamInterval.current = setInterval(() => {
        setState(prev => ({ 
            ...prev, 
            currentFileContent: MOCK_CODE_HEADER.slice(0, i) 
        }));
        i += 5;
        if (i > MOCK_CODE_HEADER.length) {
            if (streamInterval.current) clearInterval(streamInterval.current);
            setTimeout(() => phaseCompilerFail(), 1000);
        }
    }, 10);
  };

  const phaseCompilerFail = () => {
    setState(prev => ({ 
        ...prev, 
        status: AgentRole.COMPILER, 
        currentFileContent: MOCK_CODE_ERROR, 
        activeFile: 'MetricCard.tsx' 
    }));
    addLog(AgentRole.COMPILER, "Compiling application...", 'info');
    setTimeout(() => {
        addLog(AgentRole.COMPILER, "Building modules...", 'info');
        setTimeout(() => {
             setState(prev => ({ ...prev, hasError: true }));
             addLog(AgentRole.COMPILER, "Error: Module not found: '@/components/ui/card'", 'error');
             addLog(AgentRole.COMPILER, "Build failed with exit code 1", 'error');
             setTimeout(() => phasePatcher(), 2000);
        }, 1500);
    }, 1500);
  };

  const phasePatcher = () => {
      setState(prev => ({ ...prev, status: AgentRole.PATCHER }));
      addLog(AgentRole.PATCHER, "Interceptor caught error. Analyzing stderr...", 'warning');
      setTimeout(() => {
          addLog(AgentRole.PATCHER, "Identified issue: Incorrect import path used by Coder", 'info');
          addLog(AgentRole.PATCHER, "Applying fix to src/components/MetricCard.tsx...", 'success');
          
          // Show the fix visually
          setState(prev => ({ ...prev, currentFileContent: MOCK_CODE_PATCHED }));
          
          setTimeout(() => phaseCompilerSuccess(), 2000);
      }, 2000);
  };

  const phaseCompilerSuccess = () => {
      setState(prev => ({ ...prev, status: AgentRole.COMPILER, hasError: false }));
      addLog(AgentRole.COMPILER, "Re-running build verification...", 'info');
      setTimeout(() => {
          addLog(AgentRole.COMPILER, "Build completed successfully in 420ms", 'success');
          addLog(AgentRole.COMPILER, "Starting development server on port 3000", 'success');
          setState(prev => ({ ...prev, previewReady: true, status: AgentRole.READY }));
          setSimRunning(false);
      }, 1500);
  };

  return (
    <div className="flex flex-col h-screen bg-studio-950 text-studio-400 overflow-hidden font-sans">
      {/* 1. Top Navigation Bar */}
      <div className="h-12 border-b border-studio-700/50 flex items-center px-4 justify-between bg-studio-900/50 backdrop-blur-sm z-50 select-none">
        
        {/* Logo Section */}
        <div className="flex items-center gap-3 w-64">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Box className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-sm tracking-tight text-white">Agentic Studio <span className="text-blue-500 font-mono text-xs">PRO</span></h1>
          </div>
        </div>

        {/* Central Command Input */}
        <div className="flex-1 max-w-xl relative group">
           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
             <Wand2 className={`w-4 h-4 ${simRunning ? 'text-blue-400' : 'text-studio-500'}`} />
           </div>
           <input 
             type="text" 
             value={prompt}
             onChange={(e) => setPrompt(e.target.value)}
             className="w-full bg-studio-950/50 border border-studio-700 rounded-md py-1.5 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all placeholder-studio-600 shadow-inner"
             placeholder="Describe the app you want to build..."
             disabled={simRunning}
           />
           {simRunning && (
             <div className="absolute right-2 top-1.5">
               <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                </span>
             </div>
           )}
        </div>

        {/* Action Area */}
        <div className="flex items-center gap-3 w-64 justify-end">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-studio-800/50 rounded-full border border-studio-700/50">
             <ShieldCheck className="w-3 h-3 text-green-400" />
             <span className="text-[10px] text-studio-400 font-medium">Secure Env</span>
          </div>
          <button 
            onClick={runSimulation}
            disabled={simRunning}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-md font-medium text-xs transition-all border ${
              simRunning 
                ? 'bg-studio-800 border-studio-700 text-studio-500 cursor-not-allowed' 
                : 'bg-blue-600 border-blue-500 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20'
            }`}
          >
            {simRunning ? (
                <>
                    <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                    <span>Processing...</span>
                </>
            ) : (
                <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Generate</span>
                </>
            )}
          </button>
        </div>
      </div>

      {/* 2. Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Activity Bar (Leftmost Static Sidebar) */}
        <div className="w-12 bg-studio-900 border-r border-studio-700/50 flex flex-col items-center py-4 gap-4 z-20">
            <button className="p-2 rounded-lg bg-studio-800 text-white shadow-sm border border-studio-700/50"><Files className="w-5 h-5" /></button>
            <button className="p-2 rounded-lg hover:bg-studio-800/50 text-studio-500 hover:text-white transition-colors"><Search className="w-5 h-5" /></button>
            <button className="p-2 rounded-lg hover:bg-studio-800/50 text-studio-500 hover:text-white transition-colors"><GitGraph className="w-5 h-5" /></button>
            <div className="flex-1" />
            <button className="p-2 rounded-lg hover:bg-studio-800/50 text-studio-500 hover:text-white transition-colors"><Settings className="w-5 h-5" /></button>
        </div>

        {/* Resizable Area */}
        <div className="flex-1 flex min-w-0">
          <PanelGroup direction="horizontal" className="h-full w-full">
            
            {/* Sidebar Panel */}
            <Panel defaultSize={18} minSize={12} maxSize={25} className="flex flex-col min-w-[200px] bg-studio-900/30">
              <FileExplorer files={state.files} activeFile={state.activeFile} />
            </Panel>

            <PanelResizeHandle className="w-1 bg-studio-950 hover:bg-blue-600/50 transition-colors border-l border-studio-700/50 relative z-10 group outline-none">
                 <div className="absolute top-1/2 left-0 -translate-x-1/2 w-4 h-full cursor-col-resize"></div>
            </PanelResizeHandle>

            {/* Content Panel */}
            <Panel>
              <PanelGroup direction="vertical" className="h-full w-full">
                
                {/* Top Section: Editor & Preview */}
                <Panel defaultSize={70} minSize={20}>
                  <PanelGroup direction="horizontal" className="h-full w-full">
                    
                    {/* Code Editor */}
                    <Panel defaultSize={50} minSize={20} className="flex flex-col min-w-[300px]">
                       <div className="flex flex-col h-full border-r border-studio-700/50 min-w-0 bg-[#0f1115]">
                          {/* Agent HUD Overlay inside Editor Pane */}
                          <div className="border-b border-studio-700/50 bg-studio-900">
                              <AgentGraph currentRole={state.status} hasError={state.hasError} />
                          </div>
                          
                          <div className="flex-1 min-h-0 relative">
                             <CodeEditor 
                                content={state.currentFileContent} 
                                filename={state.activeFile || 'untitled'} 
                                isStreaming={state.status === AgentRole.CODER}
                                role={state.status}
                             />
                          </div>
                       </div>
                    </Panel>

                    <PanelResizeHandle className="w-1 bg-studio-950 hover:bg-blue-600/50 transition-colors border-l border-studio-700/50 relative z-10 group outline-none">
                         <div className="absolute top-1/2 left-0 -translate-x-1/2 w-4 h-full cursor-col-resize"></div>
                    </PanelResizeHandle>

                    {/* Live Preview */}
                    <Panel defaultSize={50} minSize={20} className="flex flex-col min-w-[300px]">
                      <div className="flex-1 bg-white h-full relative min-w-0 flex flex-col">
                          {/* Browser Toolbar Mockup */}
                          <div className="h-9 bg-gray-100 border-b border-gray-200 flex items-center px-3 gap-2 shrink-0">
                              <div className="flex gap-1.5">
                                  <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                                  <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                              </div>
                              <div className="flex-1 bg-white rounded border border-gray-200 h-6 flex items-center px-3 text-xs text-gray-500 font-mono ml-2 shadow-sm">
                                  localhost:3000
                              </div>
                          </div>
                          <div className="flex-1 relative overflow-hidden">
                              <ErrorBoundary>
                                <Preview ready={state.previewReady} />
                              </ErrorBoundary>
                          </div>
                       </div>
                    </Panel>
                  </PanelGroup>
                </Panel>

                <PanelResizeHandle className="h-1 bg-studio-950 hover:bg-blue-600/50 transition-colors border-t border-studio-700/50 relative z-10 group outline-none">
                    <div className="absolute left-1/2 top-0 -translate-y-1/2 h-4 w-full cursor-row-resize"></div>
                </PanelResizeHandle>

                {/* Bottom Panel: Terminal */}
                <Panel defaultSize={30} minSize={10} className="flex flex-col">
                   <Terminal logs={state.logs} />
                </Panel>
              </PanelGroup>
            </Panel>
          </PanelGroup>
        </div>
      </div>
      
      {/* 3. Status Bar */}
      <div className="h-6 bg-studio-900 border-t border-studio-700/50 flex items-center justify-between px-3 text-[10px] select-none text-studio-500 z-50">
          <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors">
                  <GitBranch className="w-3 h-3" />
                  <span>main*</span>
              </div>
              <div className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors">
                  <AlertCircle className="w-3 h-3" />
                  <span>0 Errors</span>
              </div>
               <div className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors">
                  <Wifi className="w-3 h-3" />
                  <span>Online</span>
              </div>
          </div>
          <div className="flex items-center gap-4">
              <span className="cursor-pointer hover:text-white">Ln 12, Col 42</span>
              <span className="cursor-pointer hover:text-white">UTF-8</span>
              <span className="cursor-pointer hover:text-white">TypeScript JSX</span>
              <div className="flex items-center gap-1.5 text-blue-400">
                  <Check className="w-3 h-3" />
                  <span>Prettier</span>
              </div>
          </div>
      </div>

      {/* Decorative Scanlines */}
      <div className="scanline"></div>
    </div>
  );
};

export default App;