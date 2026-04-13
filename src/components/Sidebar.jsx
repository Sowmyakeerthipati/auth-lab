import React from "react";

export function Sidebar({ isOpen, onToggle, navItems, currentPath }) {
  return (
    <>
      {/* Mobile backdrop */}
      <button
        type="button"
        aria-label="Close sidebar backdrop"
        className={[
          "fixed inset-0 z-40 bg-black/50 md:hidden",
          isOpen ? "block" : "hidden",
        ].join(" ")}
        onClick={onToggle}
      />

      <aside
        className={[
          "fixed left-0 top-0 z-50 h-dvh border-r border-slate-200 bg-white shadow-sm md:shadow-none",
          "transition-[width,transform] duration-200 ease-out",
          isOpen ? "w-72 translate-x-0" : "w-16 translate-x-0",
          // On mobile, hide completely when closed; overlay when open
          "md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        ].join(" ")}
        aria-label="Sidebar"
      >
        <div className="flex h-full flex-col">
          <div
            className={[
              "flex items-center justify-between border-b border-slate-200 px-3 py-3",
              isOpen ? "" : "md:justify-center",
            ].join(" ")}
          >
            <div
              className={[
                "flex min-w-0 items-center gap-2",
                isOpen ? "" : "hidden md:flex",
              ].join(" ")}
            >
              <div
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-sm font-semibold text-white"
                aria-hidden="true"
              >
                CL
              </div>
              <span className="truncate text-sm font-semibold text-slate-900">
                Component Lab
              </span>
            </div>

            <button
              type="button"
              onClick={onToggle}
              aria-label="Toggle sidebar"
              aria-expanded={isOpen}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              <span className="text-lg leading-none" aria-hidden="true">
                {isOpen ? "«" : "»"}
              </span>
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-2" aria-label="Primary">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive =
                  Boolean(item.isActive) || item.href === currentPath;

                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className={[
                        "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
                        "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                        isActive ? "bg-blue-50 text-blue-900" : "",
                        isOpen ? "" : "md:justify-center md:px-2",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      aria-current={isActive ? "page" : undefined}
                      aria-label={item.label}
                    >
                      <span
                        className={[
                          "flex h-6 w-6 items-center justify-center text-base",
                          isActive ? "text-blue-700" : "text-slate-500",
                        ].join(" ")}
                        aria-hidden="true"
                      >
                        {item.icon}
                      </span>

                      <span
                        className={[
                          "min-w-0 flex-1 truncate",
                          isOpen ? "" : "hidden md:block md:hidden",
                        ].join(" ")}
                      >
                        {item.label}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="border-t border-slate-200 p-3">
            <p
              className={[
                "text-xs text-slate-500",
                isOpen ? "" : "hidden md:block md:hidden",
              ].join(" ")}
            >
              v1.0 Design System
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}