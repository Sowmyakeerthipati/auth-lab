import React, { useEffect, useRef, useState } from "react";

function Spinner() {
  return (
    <svg
      className="h-4 w-4 shrink-0 animate-spin text-slate-500"
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

export function SearchInput({
  value,
  onChange,
  placeholder,
  isLoading,
  onClear,
}) {
  const [draft, setDraft] = useState(value);
  const timeoutRef = useRef(null);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const scheduleDebouncedOnChange = (next) => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      onChange(next);
      timeoutRef.current = null;
    }, 300);
  };

  const handleChange = (event) => {
    const next = event.target.value;
    setDraft(next);
    scheduleDebouncedOnChange(next);
  };

  const handleClear = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setDraft("");
    onClear();
  };

  const showClear = draft.length > 0;
  const rightIcons = (isLoading ? 1 : 0) + (showClear ? 1 : 0);
  const inputPaddingRight =
    rightIcons === 0 ? "pr-10" : rightIcons === 1 ? "pr-12" : "pr-20";

  return (
    <div className="relative w-full">
      <span
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        aria-hidden="true"
      >
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </span>
      <input
        type="search"
        value={draft}
        onChange={handleChange}
        placeholder={placeholder}
        role="searchbox"
        aria-label="Search"
        className={`w-full rounded-lg border border-slate-300 bg-white py-2 pl-10 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 disabled:cursor-not-allowed disabled:bg-slate-50 ${inputPaddingRight}`}
      />
      <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
        {isLoading ? (
          <span className="flex items-center p-1" aria-hidden="true">
            <Spinner />
          </span>
        ) : null}
        {showClear ? (
          <button
            type="button"
            onClick={handleClear}
            className="flex h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            aria-label="Clear search"
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
        ) : null}
      </div>
    </div>
  );
}