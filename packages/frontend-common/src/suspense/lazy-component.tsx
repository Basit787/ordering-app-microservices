import { type ComponentType, type JSX, lazy, type ReactNode } from "react";
import { SuspenseBoundary } from "./suspense-boundary";

// A code-split component behind its own SuspenseBoundary: the chunk loads on first render, `fallback` shows
// meanwhile and while the component's suspense queries load. `load` resolves to the component itself, e.g.
// lazyComponent(() => import("./orders-table").then((m) => m.OrdersTable), <TableSkeleton />)
export const lazyComponent = <P extends object>(load: () => Promise<ComponentType<P>>, fallback: ReactNode) => {
  const Loaded = lazy(async () => ({ default: await load() }));
  const LazyComponent = (props: P) => (
    <SuspenseBoundary fallback={fallback}>
      <Loaded {...(props as P & JSX.IntrinsicAttributes)} />
    </SuspenseBoundary>
  );
  return LazyComponent;
};
