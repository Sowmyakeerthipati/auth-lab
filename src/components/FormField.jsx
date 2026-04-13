import React from "react";

export function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  helperText,
  required = false,
}) {
  const errorId = `${name}-error`;
  const helperId = `${name}-helper`;
  const describedBy = error ? errorId : helperText ? helperId : undefined;

  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="mb-1 block text-sm font-medium text-slate-900"
      >
        {label}
        {required ? <span className="ml-1 text-red-600">*</span> : null}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={describedBy}
        className={[
          "w-full rounded-lg border bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400",
          "focus:outline-none focus:ring-2 focus:ring-blue-500",
          error ? "border-red-500 focus:ring-red-500" : "border-slate-300",
        ].join(" ")}
      />

      {error ? (
        <p id={errorId} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      ) : helperText ? (
        <p id={helperId} className="mt-1 text-sm text-slate-500">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}