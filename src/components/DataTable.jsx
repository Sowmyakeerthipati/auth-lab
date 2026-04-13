import React, { useEffect, useMemo, useState } from "react";

const PAGE_SIZE = 10;
const SKELETON_ROWS = 5;

function compareValues(a, b) {
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;
  if (typeof a === "number" && typeof b === "number") return a - b;
  return String(a).localeCompare(String(b), undefined, {
    numeric: true,
    sensitivity: "base",
  });
}

function SortArrow({ direction }) {
  return (
    <span className="ml-1 inline-flex flex-col leading-none" aria-hidden="true">
      <svg
        className={`h-2.5 w-2.5 -mb-0.5 ${direction === "asc" ? "text-slate-900" : "text-slate-300"}`}
        viewBox="0 0 12 12"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M6 2L10 8H2L6 2Z" />
      </svg>
      <svg
        className={`h-2.5 w-2.5 ${direction === "desc" ? "text-slate-900" : "text-slate-300"}`}
        viewBox="0 0 12 12"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M6 10L2 4H10L6 10Z" />
      </svg>
    </span>
  );
}

export function DataTable({ columns, data, isLoading, emptyMessage }) {
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(0);

  const sortedData = useMemo(() => {
    if (!sortKey) return data;
    const next = [...data];
    next.sort((rowA, rowB) => {
      const cmp = compareValues(rowA[sortKey], rowB[sortKey]);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return next;
  }, [data, sortKey, sortDir]);

  const pageCount = Math.max(1, Math.ceil(sortedData.length / PAGE_SIZE));

  useEffect(() => {
    setPage((p) => Math.min(p, pageCount - 1));
  }, [pageCount, sortedData.length]);

  const safePage = Math.min(page, pageCount - 1);
  const pageStart = safePage * PAGE_SIZE;
  const pageRows = isLoading
    ? []
    : sortedData.slice(pageStart, pageStart + PAGE_SIZE);

  const handleSort = (key, sortable) => {
    if (!sortable || isLoading) return;
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(0);
  };

  const showEmpty = !isLoading && data.length === 0;

  return (
    <div className="w-full space-y-3">
      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[32rem] border-collapse text-left text-sm text-slate-700">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              {columns.map((col) => {
                const isSorted = sortKey === col.key;
                const ariaSort = !col.sortable
                  ? undefined
                  : isSorted
                    ? sortDir === "asc"
                      ? "ascending"
                      : "descending"
                    : "none";

                return (
                  <th
                    key={col.key}
                    scope="col"
                    aria-sort={ariaSort}
                    className="px-4 py-3 font-semibold text-slate-900"
                  >
                    {col.sortable ? (
                      <button
                        type="button"
                        onClick={() => handleSort(col.key, col.sortable)}
                        className="inline-flex items-center rounded-md px-1 py-0.5 text-left hover:bg-slate-200/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        disabled={isLoading}
                      >
                        <span>{col.label}</span>
                        <SortArrow
                          direction={isSorted ? sortDir : null}
                        />
                      </button>
                    ) : (
                      col.label
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading
              ? Array.from({ length: SKELETON_ROWS }, (_, rowIdx) => (
                  <tr key={`sk-${rowIdx}`}>
                    {columns.map((col) => (
                      <td key={col.key} className="px-4 py-3">
                        <div className="h-4 w-full max-w-[12rem] animate-pulse rounded bg-slate-200" />
                      </td>
                    ))}
                  </tr>
                ))
              : null}
            {showEmpty ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-12 text-center text-slate-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : null}
            {!isLoading && !showEmpty
              ? pageRows.map((row, idx) => (
                  <tr
                    key={
                      row.id != null ? String(row.id) : `${pageStart}-${idx}`
                    }
                    className="hover:bg-slate-50/80"
                  >
                    {columns.map((col) => (
                      <td key={col.key} className="px-4 py-3">
                        {row[col.key] != null ? String(row[col.key]) : "—"}
                      </td>
                    ))}
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
      {!isLoading && !showEmpty ? (
        <div className="flex flex-wrap items-center justify-between gap-4 px-1 text-sm text-slate-600">
          <span>
            Page {safePage + 1} of {pageCount}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={safePage === 0}
              className="rounded-md border border-slate-300 bg-white px-3 py-1.5 font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Previous page"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() =>
                setPage((p) => Math.min(pageCount - 1, p + 1))
              }
              disabled={safePage >= pageCount - 1}
              className="rounded-md border border-slate-300 bg-white px-3 py-1.5 font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
