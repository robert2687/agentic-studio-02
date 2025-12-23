import React, { useState } from 'react';
import { FileNode } from '../types';
import { Folder, FolderOpen, FileCode, ChevronRight, ChevronDown, Package, FileJson, Hash } from 'lucide-react';

interface FileExplorerProps {
  files: FileNode[];
  activeFile: string;
}

const FileItem: React.FC<{ node: FileNode; depth: number; activeFile: string }> = ({ node, depth, activeFile }) => {
  const [isOpen, setIsOpen] = useState(true);
  
  const getIcon = () => {
    if (node.type === 'folder') return isOpen ? <FolderOpen className="w-3.5 h-3.5 text-blue-400" /> : <Folder className="w-3.5 h-3.5 text-blue-400" />;
    if (node.name.endsWith('json')) return <FileJson className="w-3.5 h-3.5 text-yellow-400" />;
    if (node.name.endsWith('ts') || node.name.endsWith('tsx')) return <FileCode className="w-3.5 h-3.5 text-cyan-400" />;
    if (node.name.endsWith('css')) return <Hash className="w-3.5 h-3.5 text-pink-400" />;
    return <FileCode className="w-3.5 h-3.5 text-studio-400" />;
  };

  const isSelected = activeFile === node.name;

  return (
    <div>
      <div 
        className={`
            flex items-center gap-1.5 py-1 px-2 cursor-pointer select-none transition-all duration-200 border-l-2
            ${isSelected 
                ? 'bg-blue-500/10 border-blue-500 text-white' 
                : 'border-transparent text-studio-400 hover:text-studio-200 hover:bg-studio-800'
            }
        `}
        style={{ paddingLeft: `${depth * 12 + 10}px` }}
        onClick={() => node.type === 'folder' && setIsOpen(!isOpen)}
      >
        <span className="opacity-70 flex items-center justify-center w-4">
            {node.type === 'folder' && (
                isOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />
            )}
        </span>
        <span className="opacity-100">{getIcon()}</span>
        <span className="truncate text-[13px]">{node.name}</span>
      </div>
      {node.type === 'folder' && isOpen && node.children?.map((child) => (
        <FileItem key={child.name} node={child} depth={depth + 1} activeFile={activeFile} />
      ))}
    </div>
  );
};

export const FileExplorer: React.FC<FileExplorerProps> = ({ files, activeFile }) => {
  return (
    <div className="flex flex-col h-full w-full select-none">
      <div className="p-3 text-[11px] font-bold text-studio-500 uppercase tracking-wider flex justify-between items-center bg-studio-900/50">
        <span>Explorer</span>
        <span className="text-[10px] bg-studio-800 px-1.5 py-0.5 rounded text-studio-400">PROJ</span>
      </div>
      <div className="flex-1 overflow-y-auto py-2">
        {files.map((file) => (
          <FileItem key={file.name} node={file} depth={0} activeFile={activeFile} />
        ))}
      </div>
    </div>
  );
};