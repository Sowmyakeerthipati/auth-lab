import React, { useId, useMemo } from "react";
import { PrimaryButton } from "./PrimaryButton";

const STATUS_CONFIG = {
  online: { dot: "bg-green-500", label: "Online" },
  offline: { dot: "bg-gray-400", label: "Offline" },
  away: { dot: "bg-yellow-400", label: "Away" },
};

const INITIAL_BG_CLASSES = [
  "bg-violet-600",
  "bg-blue-600",
  "bg-emerald-600",
  "bg-amber-600",
  "bg-rose-600",
  "bg-cyan-600",
];

function getInitials(name) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function initialsBackgroundClass(name) {
  let sum = 0;
  for (let i = 0; i < name.length; i += 1) sum += name.charCodeAt(i);
  return INITIAL_BG_CLASSES[sum % INITIAL_BG_CLASSES.length];
}

export function UserCard({
  name,
  role,
  avatarUrl,
  status,
  onMessage,
  onFollow,
}) {
  const titleId = useId();
  const statusConfig = STATUS_CONFIG[status];
  const initials = useMemo(() => getInitials(name), [name]);
  const fallbackBg = useMemo(() => initialsBackgroundClass(name), [name]);

  return (
    <article
      className="flex w-full max-w-sm flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
      aria-labelledby={titleId}
    >
      <div className="flex gap-4">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt=""
            className="h-16 w-16 shrink-0 rounded-full object-cover"
            aria-hidden="true"
          />
        ) : (
          <div
            className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-lg font-semibold text-white ${fallbackBg}`}
            aria-hidden="true"
          >
            {initials}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h2 id={titleId} className="truncate text-lg font-semibold text-slate-900">
            {name}
          </h2>
          <p className="truncate text-sm text-slate-600">{role}</p>
        </div>
      </div>

      <div
        className="flex items-center gap-2 text-sm text-slate-700"
        role="status"
        aria-label={`${name} is ${statusConfig.label}`}
      >
        <span
          className={`h-2.5 w-2.5 shrink-0 rounded-full ${statusConfig.dot}`}
          aria-hidden="true"
        />
        <span>{statusConfig.label}</span>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <PrimaryButton
          variant="primary"
          label="Message"
          onClick={onMessage}
        />
        <PrimaryButton
          variant="secondary"
          label="Follow"
          onClick={onFollow}
        />
      </div>
    </article>
  );
}