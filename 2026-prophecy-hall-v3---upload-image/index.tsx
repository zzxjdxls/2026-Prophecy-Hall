
import React, { Component, ErrorInfo, ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

// Fix: Using the imported Component class directly ensures that the TypeScript compiler correctly identifies inherited members like setState and props.
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { hasError: false };

  constructor(props: ErrorBoundaryProps) {
    super(props);
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  handleReload = () => {
    // Fix: setState is a built-in method of Component, now correctly recognized.
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-amber-500 p-4 font-serif text-center">
          <h1 className="text-3xl mb-4">The Vision has Clouded</h1>
          <p className="text-indigo-300 mb-8 max-w-md">
            A mystical disturbance interrupted the prophecy. 
            The energies must be realigned.
          </p>
          <button 
            onClick={this.handleReload}
            className="px-6 py-2 border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-slate-900 transition-colors rounded"
          >
            Realign Energies
          </button>
        </div>
      );
    }

    // Fix: props is a built-in property of Component, now correctly recognized.
    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
