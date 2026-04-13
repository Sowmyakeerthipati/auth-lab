import React from "react";

const variantClasses = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500",
  secondary:
    "bg-slate-200 text-slate-900 hover:bg-slate-300 focus-visible:ring-slate-400",
  danger:
    "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500",
};

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export function PrimaryButton({
  variant = "primary",
  label,
  onClick,
  isLoading = false,
  disabled = false,
}) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      type="button"
      className={[
        "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        variantClasses[variant],
        isDisabled ? "cursor-not-allowed opacity-50" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={onClick}
      disabled={isDisabled}
      aria-label={label}
      aria-busy={isLoading}
    >
      {isLoading ? <Spinner /> : null}
      <span className={isLoading ? "sr-only" : undefined}>{label}</span>
    </button>
  );
}