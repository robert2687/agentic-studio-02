import React, { useEffect, useRef, useState } from 'react';
import { LogEntry, AgentRole } from '../types';
import { Terminal as TerminalIcon, XCircle, CheckCircle, AlertTriangle, Info, Trash2, Maximize2 } from 'lucide-react';

interface TerminalProps {
  logs: LogEntry[];
}

export const Terminal: React.FC<TerminalProps> = ({ logs }) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('terminal');

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const getIcon = (type: LogEntry['type']) => {
    switch (type) {
      case 'error': return <XCircle className="w-3 h-3 text-red-500 shrink-0" />;
      case 'success': return <CheckCircle className="w-3 h-3 text-emerald-500 shrink-0" />;
      case 'warning': return <AlertTriangle className="w-3 h-3 text-amber-500 shrink-0" />;
      default: return <Info className="w-3 h-3 text-blue-500 shrink-0" />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0c] font-mono text-xs">
      {/* Terminal Tabs Header */}
      <div className="flex items-center justify-between px-2 bg-studio-900 border-b border-studio-700/50">
        <div className="flex">
            {['PROBLEMS', 'OUTPUT', 'TERMINAL', 'DEBUG CONSOLE'].map((tab) => (
                <button 
                    key={tab}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                    className={`px-4 py-2 text-[10px] font-medium border-b-2 transition-colors ${
                        activeTab === tab.toLowerCase() 
                        ? 'border-blue-500 text-white' 
                        : 'border-transparent text-studio-500 hover:text-studio-400'
                    }`}
                >
                    {tab}
                </button>
            ))}
        </div>
        <div className="flex items-center gap-2 pr-2">
            <button className="text-studio-500 hover:text-white p-1 rounded hover:bg-studio-800 transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
            </button>
            <button className="text-studio-500 hover:text-white p-1 rounded hover:bg-studio-800 transition-colors">
                <Maximize2 className="w-3.5 h-3.5" />
            </button>
        </div>
      </div>
      
      {/* Terminal Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1 font-fira">
        <div className="text-studio-500 mb-2 italic select-none">
           $ webcontainer-shell v2.0.4 initialized...
        </div>
        
        {logs.map((log) => (
          <div key={log.id} className="flex gap-3 group py-0.5 rounded hover:bg-studio-800/20 px-1 -mx-1">
            <span className="text-studio-600 shrink-0 w-16 select-none opacity-50">{log.timestamp}</span>
            <div className="flex items-center gap-2 shrink-0 w-24">
                 <span className={`font-bold ${
                  log.agent === AgentRole.PATCHER ? 'text-red-400' : 
                  log.agent === AgentRole.COMPILER ? 'text-emerald-400' : 
                  'text-blue-400'
                }`}>
                  {log.agent}
                </span>
            </div>
            
            <div className={`flex-1 flex items-start gap-2 break-all ${log.type === 'error' ? 'text-red-300' : 'text-studio-300'}`}>
               <span className="mt-0.5 opacity-80">{getIcon(log.type)}</span>
               <span>{log.message}</span>
            </div>
          </div>
        ))}
        
        {/* Blinking Cursor at bottom */}
        <div className="flex items-center gap-2 text-studio-400 mt-2">
            <span className="text-emerald-500 font-bold">➜</span>
            <span className="text-blue-400 font-bold">~/project</span>
            <div className="w-1.5 h-3.5 bg-studio-500 animate-pulse ml-1" />
            <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
};