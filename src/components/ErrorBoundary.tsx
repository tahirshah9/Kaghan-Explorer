import * as React from "react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    const { hasError, error } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-emerald-50 p-8">
          <div className="max-w-md w-full bg-white p-12 rounded-[3rem] shadow-2xl border border-emerald-100 text-center space-y-6">
            <div className="h-20 w-20 bg-red-50 rounded-full flex items-center justify-center mx-auto">
              <span className="text-4xl">⚠️</span>
            </div>
            <h1 className="text-3xl font-bold text-emerald-950">Something went wrong</h1>
            <p className="text-emerald-800/60 leading-relaxed">
              We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-emerald-950 text-white font-bold py-4 rounded-2xl hover:bg-emerald-900 transition-all"
            >
              Refresh Page
            </button>
            {process.env.NODE_ENV === 'development' && (
              <pre className="text-left text-[10px] bg-red-50 p-4 rounded-xl overflow-auto max-h-40 text-red-800">
                {error?.message}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return children;
  }
}
