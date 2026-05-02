import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#050505] p-6">
          <div className="max-w-md w-full bg-white dark:bg-slate-900 border-2 border-amber-500/20 rounded-3xl p-10 text-center shadow-2xl">
            <div className="text-6xl mb-6">⚠️</div>
            <h1 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-2">
              Something went wrong
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm">
              We've encountered an unexpected error. Try refreshing the page to resolve the issue.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-4 bg-gradient-to-r from-amber-600 to-orange-500 text-white rounded-2xl font-bold shadow-lg hover:shadow-amber-600/20 transition-all active:scale-95"
            >
              Refresh Page
            </button>
            {this.state.error && (
              <details className="mt-8 text-left">
                <summary className="text-xs text-slate-400 cursor-pointer hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                  Error Details
                </summary>
                <pre className="mt-4 p-4 bg-slate-100 dark:bg-black/40 rounded-xl text-[10px] text-red-400 overflow-auto max-h-40 font-mono">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
