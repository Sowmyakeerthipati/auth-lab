import React from "react";

export function EmptyState({ icon, title, description, ctaLabel, onCta }) {
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center px-4">
      <div className="flex w-full max-w-md flex-col items-center text-center">
        <div className="text-6xl" aria-hidden="true">
          {icon}
        </div>
        <h2 className="mt-4 text-xl font-semibold text-slate-900">{title}</h2>
        <p className="mt-2 text-sm text-slate-600">{description}</p>
        <button
          type="button"
          onClick={onCta}
          className="mt-6 inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          aria-label={ctaLabel}
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  );
}