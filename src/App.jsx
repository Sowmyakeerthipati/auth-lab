import { useState } from "react";
import { EmptyState } from "./components/EmptyState";

export default function App() {
  const [hasData, setHasData] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {hasData ? (
        <div className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-lg font-semibold text-slate-900">Dashboard</h1>
          <p className="mt-2 text-sm text-slate-600">
            Data loaded. Click reset to see the empty state again.
          </p>
          <button
            type="button"
            onClick={() => setHasData(false)}
            className="mt-6 inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            aria-label="Reset demo"
          >
            Reset
          </button>
        </div>
      ) : (
        <EmptyState
          icon="📭"
          title="No items yet"
          description="Once you add your first item, it’ll show up here."
          ctaLabel="Add item"
          onCta={() => setHasData(true)}
        />
      )}
    </div>
  );
}