import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RefreshCw, Home } from "lucide-react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error caught in ErrorBoundary:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#F3F4F5] dark:bg-[#100C08] p-6 font-sans">
          <div className="max-w-md w-full bg-white dark:bg-[#181B22] border border-[#E2E8F0] dark:border-[#222630] rounded-2xl p-8 shadow-xl text-center space-y-6 relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-[#FF6D29]/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-[#FF6D29]/10 text-[#FF6D29] rounded-2xl flex items-center justify-center">
                <AlertCircle className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <span className="px-2 py-0.5 rounded text-[8px] font-mono border font-bold bg-amber-500/10 text-amber-500 border-amber-500/20">SYSTEM ERROR</span>
                <h1 className="text-xl font-bold text-[#14161D] dark:text-white mt-2">
                  Something went wrong
                </h1>
                <p className="text-xs text-[#14161D]/60 dark:text-[#E2E8F0]/60 font-light leading-relaxed">
                  An unexpected error occurred in our system pipelines. We have logged the trace and our agents are on it.
                </p>
              </div>
            </div>

            {this.state.error && (
              <div className="p-3 bg-neutral-50 dark:bg-black/20 border border-[#E2E8F0] dark:border-[#222630] rounded-lg text-left">
                <div className="text-[10px] font-bold text-black/40 dark:text-white/40 uppercase font-mono mb-1">
                  Error Details
                </div>
                <div className="text-[11px] font-mono text-[#CA3F16] dark:text-[#FF6D29] break-all max-h-24 overflow-y-auto">
                  {this.state.error.message || String(this.state.error)}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleReset}
                className="flex-1 py-2.5 px-4 rounded-lg bg-[#CA3F16] hover:bg-[#95122C] text-white text-[11px] uppercase tracking-wider font-bold transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-md"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Pipeline</span>
              </button>
              <button
                type="button"
                onClick={() => { window.location.href = "/"; }}
                className="flex-1 py-2.5 px-4 rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-white/5 dark:hover:bg-white/10 text-[#14161D] dark:text-white text-[11px] uppercase tracking-wider font-bold transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 border border-transparent dark:border-white/5"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Go Home</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
