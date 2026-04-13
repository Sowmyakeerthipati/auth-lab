import React, { useEffect } from "react";

const VARIANTS = {
  success: {
    container: "border-green-200 bg-green-50 text-green-900",
    icon: "text-green-600",
    label: "Success",
    Icon: function SuccessIcon() {
      return (
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.707-9.707a1 1 0 0 0-1.414-1.414L9 10.172 7.707 8.879a1 1 0 1 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4Z"
            clipRule="evenodd"
          />
        </svg>
      );
    },
  },
  error: {
    container: "border-red-200 bg-red-50 text-red-900",
    icon: "text-red-600",
    label: "Error",
    Icon: function ErrorIcon() {
      return (
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm2.707-10.707a1 1 0 0 0-1.414-1.414L10 7.586 8.707 6.293a1 1 0 1 0-1.414 1.414L8.586 9l-1.293 1.293a1 1 0 1 0 1.414 1.414L10 10.414l1.293 1.293a1 1 0 0 0 1.414-1.414L11.414 9l1.293-1.293Z"
            clipRule="evenodd"
          />
        </svg>
      );
    },
  },
  warning: {
    container: "border-yellow-200 bg-yellow-50 text-yellow-900",
    icon: "text-yellow-700",
    label: "Warning",
    Icon: function WarningIcon() {
      return (
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.72-1.36 3.486 0l6.518 11.59c.75 1.334-.214 2.99-1.742 2.99H3.48c-1.528 0-2.492-1.656-1.742-2.99l6.518-11.59ZM10 7a1 1 0 0 0-1 1v3a1 1 0 1 0 2 0V8a1 1 0 0 0-1-1Zm0 8a1.25 1.25 0 1 0 0-2.5A1.25 1.25 0 0 0 10 15Z"
            clipRule="evenodd"
          />
        </svg>
      );
    },
  },
  info: {
    container: "border-blue-200 bg-blue-50 text-blue-900",
    icon: "text-blue-600",
    label: "Info",
    Icon: function InfoIcon() {
      return (
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM9 8a1 1 0 1 1 2 0v6a1 1 0 1 1-2 0V8Zm1-3a1.25 1.25 0 1 0 0 2.5A1.25 1.25 0 0 0 10 5Z"
            clipRule="evenodd"
          />
        </svg>
      );
    },
  },
};

export function NotificationToast({
  message,
  variant,
  duration = 3000,
  onDismiss,
  isVisible,
}) {
  useEffect(() => {
    if (!isVisible) return;
    const t = setTimeout(() => onDismiss(), duration);
    return () => clearTimeout(t);
  }, [isVisible, duration, onDismiss]);

  if (!isVisible) return null;

  const cfg = VARIANTS[variant] ?? VARIANTS.info;
  const Icon = cfg.Icon;

  return (
    <div className="fixed right-4 top-4 z-50 w-[min(24rem,calc(100vw-2rem))]">
      <div
        role="alert"
        aria-live="polite"
        className={`relative flex items-start gap-3 rounded-xl border p-4 shadow-lg ${cfg.container}`}
      >
        <div className={`mt-0.5 ${cfg.icon}`} aria-hidden="true">
          <Icon />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">{cfg.label}</p>
          <p className="mt-0.5 break-words text-sm">{message}</p>
        </div>

        <button
          type="button"
          onClick={onDismiss}
          className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-600 hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          aria-label="Dismiss notification"
        >
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}