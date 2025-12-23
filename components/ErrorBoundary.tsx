import React, { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCw, Terminal } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Preview runtime error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="h-full w-full bg-gray-50 flex flex-col items-center justify-center p-8 text-center font-sans">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 max-w-md w-full">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 mb-2">Runtime Error</h2>
            <p className="text-sm text-gray-500 mb-6">
              The simulation encountered an exception while rendering the preview.
            </p>
            
            <div className="bg-gray-900 rounded-lg p-4 text-left mb-6 overflow-hidden">
               <div className="flex items-center gap-2 border-b border-gray-700 pb-2 mb-2">
                  <Terminal className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-400 font-mono">stderr</span>
               </div>
               <code className="text-xs font-mono text-red-400 block break-words">
                 {this.state.error?.message || 'Unknown runtime exception'}
               </code>
            </div>

            <button
              onClick={() => this.setState({ hasError: false })}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
            >
              <RotateCw className="w-4 h-4" />
              Reload Simulation
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}