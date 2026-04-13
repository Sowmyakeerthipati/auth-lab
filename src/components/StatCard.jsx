import React from "react";

const BAR_HEIGHTS = ["h-2", "h-4", "h-3", "h-6", "h-3", "h-5", "h-4"];

function UpArrow() {
  return (
    <svg
      className="h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10 3a1 1 0 0 1 1 1v9.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L9 13.586V4a1 1 0 0 1 1-1Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function DownArrow() {
  return (
    <svg
      className="h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10 17a1 1 0 0 1-1-1V6.414L6.707 8.707a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 1 1-1.414 1.414L11 6.414V16a1 1 0 0 1-1 1Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function StatCard({ label, value, change, isPositive, isLoading }) {
  const pct = Math.abs(change);
  const changeText = `${isPositive ? "+" : "-"}${pct}%`;
  const changeClasses = isPositive
    ? "text-green-700 bg-green-50"
    : "text-red-700 bg-red-50";

  return (
    <div className="w-full rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <p className="text-sm font-medium text-slate-500">{label}</p>

      <div className="mt-2 flex items-end justify-between gap-4">
        <div className="min-w-0">
          {isLoading ? (
            <div className="h-9 w-40 animate-pulse rounded bg-slate-200" />
          ) : (
            <p className="truncate text-3xl font-semibold text-slate-900">
              {value}
            </p>
          )}

          <div className="mt-3">
            {isLoading ? (
              <div className="h-6 w-24 animate-pulse rounded bg-slate-200" />
            ) : (
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-sm font-semibold ${changeClasses}`}
                aria-label={`Change ${changeText}`}
              >
                <span aria-hidden="true">
                  {isPositive ? <UpArrow /> : <DownArrow />}
                </span>
                <span>{changeText}</span>
              </span>
            )}
          </div>
        </div>

        <div className="flex w-28 items-end justify-between gap-1">
          {isLoading
            ? BAR_HEIGHTS.map((h, idx) => (
                <div
                  key={idx}
                  className={`w-3 ${h} animate-pulse rounded bg-slate-200`}
                />
              ))
            : BAR_HEIGHTS.map((h, idx) => (
                <div
                  key={idx}
                  className={`w-3 ${h} rounded bg-slate-200`}
                  aria-hidden="true"
                />
              ))}
        </div>
      </div>
    </div>
  );
}