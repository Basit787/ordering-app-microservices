import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { CircleAlert } from "lucide-react";
import { Button, OamUiEmpty } from "oamui";
import { Component, type ErrorInfo, type ReactNode, Suspense } from "react";

type ErrorFallback = (error: Error, retry: () => void) => ReactNode;

type ErrorBoundaryProps = { fallback: ErrorFallback; onReset: () => void; children: ReactNode };

// Catches what a suspended component throws (a failed chunk or a failed suspense query)
class ErrorBoundary extends Component<ErrorBoundaryProps, { error: Error | null }> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack);
  }

  retry = () => {
    this.props.onReset();
    this.setState({ error: null });
  };

  render() {
    return this.state.error ? this.props.fallback(this.state.error, this.retry) : this.props.children;
  }
}

// What a failed section shows: the server's message and a retry that refetches its queries
export const LoadError = ({ error, onRetry }: { error: Error; onRetry: () => void }) => (
  <OamUiEmpty
    icon={<CircleAlert />}
    title="This part could not load"
    description={error.message || "Something went wrong."}
    action={
      <Button variant="outline" onClick={onRetry}>
        Try again
      </Button>
    }
    className="border"
  />
);

type SuspenseBoundaryProps = {
  // Shown while the code chunk or the data loads; a skeleton shaped like the content
  fallback: ReactNode;
  children: ReactNode;
  // Replaces the default LoadError card
  errorFallback?: ErrorFallback;
};

// The one loading boundary every section uses: Suspense (lazy chunks, suspense queries) plus errors with retry
export const SuspenseBoundary = ({ fallback, children, errorFallback }: SuspenseBoundaryProps) => (
  <QueryErrorResetBoundary>
    {({ reset }) => (
      <ErrorBoundary
        onReset={reset}
        fallback={errorFallback ?? ((error, retry) => <LoadError error={error} onRetry={retry} />)}
      >
        <Suspense fallback={fallback}>{children}</Suspense>
      </ErrorBoundary>
    )}
  </QueryErrorResetBoundary>
);
