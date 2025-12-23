import React, { useEffect, useRef } from 'react';
import { AgentRole } from '../types';
import { FileCode, ChevronRight } from 'lucide-react';

interface CodeEditorProps {
  content: string;
  filename: string;
  isStreaming: boolean;
  role: AgentRole;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ content, filename, isStreaming, role }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isStreaming && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [content, isStreaming]);

  const lines = content.split('\n');

  // Helper to safely highlight code without rendering it as HTML
  const highlightLine = (line: string) => {
    let encoded = line
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    encoded = encoded
      .replace(/\b(import|export|const|return|function|from|div|span|className)\b/g, '<span class="text-pink-400">$1</span>')
      .replace(/(".*?")/g, '<span class="text-emerald-400">$1</span>')
      .replace(/('.*?')/g, '<span class="text-emerald-400">$1</span>')
      .replace(/({|})/g, '<span class="text-yellow-400">$1</span>')
      .replace(/(\/\/.*)/g, '<span class="text-studio-500 italic">$1</span>')
      .replace(/(&lt;\/?[a-zA-Z0-9]+.*?&gt;)/g, '<span class="text-blue-300">$1</span>');

    return encoded;
  };

  return (
    <div className="flex flex-col h-full bg-[#0f1115] text-studio-300 font-mono text-sm relative overflow-hidden">
      {/* Editor Breadcrumbs / Tabs */}
      <div className="flex items-center gap-2 px-4 py-2 bg-studio-900 border-b border-studio-700/50 text-xs">
         <FileCode className="w-4 h-4 text-blue-400" />
         <span className="text-studio-500">src</span>
         <ChevronRight className="w-3 h-3 text-studio-600" />
         <span className="text-studio-500">components</span>
         <ChevronRight className="w-3 h-3 text-studio-600" />
         <span className="text-white font-medium">{filename}</span>
         {isStreaming && (
            <span className="ml-auto flex items-center gap-2 text-[10px] text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-900">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                WRITING...
            </span>
         )}
      </div>

      {/* Editor Area */}
      <div className="flex flex-1 overflow-auto relative custom-scrollbar" ref={scrollRef}>
        {/* Line Numbers */}
        <div className="w-12 bg-studio-900/30 text-studio-600 text-right pr-4 pt-4 select-none shrink-0 font-fira text-xs opacity-50">
          {lines.map((_, i) => (
            <div key={i} className="leading-6">{i + 1}</div>
          ))}
        </div>

        {/* Code Content */}
        <div className="p-4 pt-4 flex-1">
          {lines.map((line, i) => (
            <div key={i} className="leading-6 whitespace-pre font-fira text-[13px]">
              <span dangerouslySetInnerHTML={{ __html: highlightLine(line) || ' ' }} />
               {isStreaming && i === lines.length - 1 && (
                 <span className="inline-block w-2 h-4 bg-blue-400 align-middle ml-1 animate-pulse shadow-[0_0_10px_#3b82f6]" />
               )}
            </div>
          ))}
        </div>
        
        {/* Agent Activity Overlay */}
        {role === AgentRole.PATCHER && (
          <div className="absolute top-4 right-4 bg-red-950/90 text-red-200 text-xs px-4 py-2 rounded-lg border border-red-500/30 flex items-center gap-3 backdrop-blur shadow-xl animate-in fade-in slide-in-from-top-2 z-50">
             <div className="relative">
                 <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse relative z-10" />
                 <div className="w-2 h-2 rounded-full bg-red-500 animate-ping absolute top-0 left-0 opacity-75" />
             </div>
             <div>
                 <div className="font-bold">Self-Healing Active</div>
                 <div className="text-[10px] text-red-300/70">Patching {filename}...</div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};