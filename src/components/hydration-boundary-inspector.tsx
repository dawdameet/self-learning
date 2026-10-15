"use client";

import * as React from "react";
import { Server, Smartphone, Cpu, ShieldCheck, ChevronDown, ChevronUp, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HydrationBoundaryInspectorProps {
  serverPayloadSize: number;
  itemCount: number;
}

export function HydrationBoundaryInspector({
  serverPayloadSize,
  itemCount,
}: HydrationBoundaryInspectorProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<"tree" | "serialization" | "zustand">("tree");

  return (
    <div className="border-2 border-black dark:border-white bg-white dark:bg-black p-4 shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#fff]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 border-2 border-black dark:border-white bg-white dark:bg-black">
            <Cpu className="w-5 h-5 text-black dark:text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-black dark:text-white">
                Architecture &amp; Hydration Inspector
              </h3>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 border border-black dark:border-white">
                CO1/CO2
              </span>
            </div>
            <p className="text-[11px] font-mono text-neutral-500">
              RSC vs. Client Components · Flight Wire Protocol Telemetry
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <div className="text-xs font-mono font-bold border-2 border-black dark:border-white px-2.5 py-1 bg-neutral-100 dark:bg-neutral-900 shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#fff]">
            <span>Payload: </span>
            <strong>~{(serverPayloadSize / 1024).toFixed(1)} KB</strong>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="text-xs h-8"
          >
            {isOpen ? (
              <span className="flex items-center gap-1">
                Close <ChevronUp className="w-3.5 h-3.5" />
              </span>
            ) : (
              <span className="flex items-center gap-1">
                Inspect <ChevronDown className="w-3.5 h-3.5" />
              </span>
            )}
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="mt-4 pt-4 border-t-2 border-black dark:border-white space-y-4">
          {/* Navigation Sub-tabs */}
          <div className="flex flex-wrap gap-2 pb-2">
            <button
              onClick={() => setActiveTab("tree")}
              className={`text-xs px-3 py-1 font-bold uppercase tracking-wider cursor-pointer border-2 border-black dark:border-white ${
                activeTab === "tree"
                  ? "bg-black text-white dark:bg-white dark:text-black shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#fff]"
                  : "bg-white text-black dark:bg-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900"
              }`}
            >
              Component Hierarchy
            </button>
            <button
              onClick={() => setActiveTab("serialization")}
              className={`text-xs px-3 py-1 font-bold uppercase tracking-wider cursor-pointer border-2 border-black dark:border-white ${
                activeTab === "serialization"
                  ? "bg-black text-white dark:bg-white dark:text-black shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#fff]"
                  : "bg-white text-black dark:bg-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900"
              }`}
            >
              Flight Serialization
            </button>
            <button
              onClick={() => setActiveTab("zustand")}
              className={`text-xs px-3 py-1 font-bold uppercase tracking-wider cursor-pointer border-2 border-black dark:border-white ${
                activeTab === "zustand"
                  ? "bg-black text-white dark:bg-white dark:text-black shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#fff]"
                  : "bg-white text-black dark:bg-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900"
              }`}
            >
              Zustand Isolation
            </button>
          </div>

          {activeTab === "tree" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3 border-2 border-black dark:border-white bg-white dark:bg-black space-y-2">
                <div className="flex items-center gap-1.5 font-bold uppercase">
                  <Server className="w-4 h-4" />
                  <span>React Server Components (RSC)</span>
                </div>
                <ul className="space-y-1 text-[11px] text-neutral-600 dark:text-neutral-400">
                  <li>• app/layout.tsx (Root HTML, metadata)</li>
                  <li>• app/page.tsx (Fetches getProducts() on server)</li>
                  <li>• app/api/og/route.tsx (Edge image generator)</li>
                </ul>
                <p className="text-[10px] text-neutral-500 pt-1">
                  0 KB client JS overhead for backend queries.
                </p>
              </div>

              <div className="p-3 border-2 border-black dark:border-white bg-white dark:bg-black space-y-2">
                <div className="flex items-center gap-1.5 font-bold uppercase">
                  <Smartphone className="w-4 h-4" />
                  <span>Client Components (&apos;use client&apos;)</span>
                </div>
                <ul className="space-y-1 text-[11px] text-neutral-600 dark:text-neutral-400">
                  <li>• CatalogView (Consumes Product[] props)</li>
                  <li>• CartSheet &amp; FilterPanel (Zustand persistent store)</li>
                  <li>• ProductReviewModal (react-hook-form + Zod)</li>
                  <li>• ThemeToggle (next-themes)</li>
                </ul>
                <p className="text-[10px] text-neutral-500 pt-1">
                  Isolated strictly to leaf nodes for fast hydration.
                </p>
              </div>
            </div>
          )}

          {activeTab === "serialization" && (
            <div className="p-3 border-2 border-black dark:border-white bg-white dark:bg-black space-y-2 text-xs font-mono">
              <div className="flex items-center gap-2 font-bold uppercase">
                <ShieldCheck className="w-4 h-4" />
                <span>RSC Flight Serialization Rules</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 border border-black dark:border-white bg-neutral-100 dark:bg-neutral-900">
                  <strong>ALLOWED (Serializable):</strong>
                  <br />• JSON primitives (string, number, boolean)
                  <br />• Plain objects and arrays ({itemCount} products)
                  <br />• ISO-8601 strings
                </div>
                <div className="p-2 border border-black dark:border-white bg-neutral-100 dark:bg-neutral-900">
                  <strong>DISALLOWED:</strong>
                  <br />• Functions and event handlers (onClick)
                  <br />• Classes and prototypes
                  <br />• Non-serializable Symbols
                </div>
              </div>
            </div>
          )}

          {activeTab === "zustand" && (
            <div className="p-3 border-2 border-black dark:border-white bg-white dark:bg-black space-y-2 text-xs font-mono">
              <div className="flex items-center gap-2 font-bold uppercase">
                <Layers className="w-4 h-4" />
                <span>Layout Re-render Isolation Architecture</span>
              </div>
              <ul className="list-disc pl-4 space-y-1 text-[11px] text-neutral-600 dark:text-neutral-400">
                <li>
                  <strong>Server Layout:</strong> layout.tsx is an async Server Component with zero state subscription.
                </li>
                <li>
                  <strong>Atomic Selectors:</strong> Components subscribe to primitive slices (e.g. `items.length`).
                </li>
                <li>
                  <strong>Persistence:</strong> Zustand synchronizes with localStorage automatically.
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

