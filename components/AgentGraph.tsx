import React from 'react';
import { AgentRole } from '../types';
import { BrainCircuit, PenTool, Layers, Code2, Play, Stethoscope, ChevronRight } from 'lucide-react';

interface AgentGraphProps {
  currentRole: AgentRole;
  hasError: boolean;
}

const agents = [
  { id: AgentRole.PLANNER, label: 'PLAN', icon: BrainCircuit, color: 'text-purple-400' },
  { id: AgentRole.DESIGNER, label: 'DESIGN', icon: PenTool, color: 'text-pink-400' },
  { id: AgentRole.ARCHITECT, label: 'BUILD', icon: Layers, color: 'text-blue-400' },
  { id: AgentRole.CODER, label: 'CODE', icon: Code2, color: 'text-cyan-400' },
  { id: AgentRole.COMPILER, label: 'COMPILE', icon: Play, color: 'text-emerald-400' },
  { id: AgentRole.PATCHER, label: 'HEAL', icon: Stethoscope, color: 'text-red-400' },
];

export const AgentGraph: React.FC<AgentGraphProps> = ({ currentRole, hasError }) => {
  return (
    <div className="px-4 py-3 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-studio-500 flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${hasError ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`} />
            Orchestration Runtime
        </h3>
        <div className="text-[10px] font-mono text-studio-600">
             PID: 9421 • MEM: 142MB
        </div>
      </div>
      
      <div className="flex items-center justify-between relative mt-1">
         {/* Connector Line Background */}
         <div className="absolute top-1/2 left-0 w-full h-0.5 bg-studio-800 -z-10 -translate-y-1/2 rounded-full"></div>
         
         {/* Active Progress Bar */}
         {currentRole !== AgentRole.IDLE && currentRole !== AgentRole.READY && (
             <div 
               className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 -z-10 -translate-y-1/2 rounded-full transition-all duration-700 ease-in-out"
               style={{ 
                 width: `${((agents.findIndex(a => a.id === currentRole) + 1) / agents.length) * 100}%` 
               }}
             />
         )}

         {agents.map((agent, index) => {
            const isActive = currentRole === agent.id;
            const isCompleted = agents.findIndex(a => a.id === currentRole) > index || currentRole === AgentRole.READY;
            const isPatcher = agent.id === AgentRole.PATCHER;
            
            // Skip patcher visual if not active and no error
            if (isPatcher && !hasError && !isActive) return null;

            return (
               <div key={agent.id} className="flex flex-col items-center gap-2 relative group z-10">
                  <div className={`
                    w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-300
                    ${isActive 
                        ? 'bg-studio-800 border-white text-white shadow-[0_0_15px_rgba(59,130,246,0.5)] scale-110' 
                        : isCompleted
                            ? 'bg-studio-900 border-studio-700 text-studio-500'
                            : 'bg-studio-950 border-studio-800 text-studio-700'
                    }
                    ${isPatcher && hasError ? 'border-red-500 bg-red-900/20 text-red-400' : ''}
                  `}>
                     <agent.icon className={`w-4 h-4 ${isActive ? agent.color : ''}`} />
                  </div>
                  <span className={`text-[9px] font-bold tracking-wider ${isActive ? 'text-white' : 'text-studio-600'}`}>
                    {agent.label}
                  </span>
                  
                  {/* Status Indicator Dot */}
                  {isActive && (
                      <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-studio-900 animate-pulse" />
                  )}
               </div>
            );
         })}
      </div>
    </div>
  );
};