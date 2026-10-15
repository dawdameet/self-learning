import * as React from "react";
import { Suspense } from "react";
import { getProducts } from "@/lib/products-data";
import { CatalogView } from "@/components/catalog-view";
import { HydrationBoundaryInspector } from "@/components/hydration-boundary-inspector";
import { Skeleton } from "@/components/ui/skeleton";

export default async function HomePage() {
  // Direct Server-Side data fetching in React Server Component (RSC)
  const products = await getProducts();
  const serializedPayloadSize = Buffer.byteLength(JSON.stringify(products), "utf8");
  const serverTimestamp = new Date().toISOString();

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Clean Minimalist Header */}
      <section className="border-b-2 border-black dark:border-white pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-neutral-500">
            Hardware / Workstation Lab
          </span>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-black dark:text-white mt-1">
            Developer Catalog
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="border-2 border-black dark:border-white px-3 py-1 font-mono text-xs font-bold uppercase bg-white dark:bg-black shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#fff]">
            {products.length} Items (RSC)
          </div>
        </div>
      </section>

      {/* Main Interactive Hardware Catalog */}
      <section>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="border-2 border-black dark:border-white p-4 space-y-3 bg-white dark:bg-black shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#fff]">
                  <Skeleton className="aspect-[4/3] w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              ))}
            </div>
          }
        >
          <CatalogView
            initialProducts={products}
            serverTimestamp={serverTimestamp}
          />
        </Suspense>
      </section>

      {/* Architecture & Hydration Audit (Tucked neatly at bottom) */}
      <section className="pt-8 border-t-2 border-black dark:border-white">
        <HydrationBoundaryInspector
          serverPayloadSize={serializedPayloadSize}
          itemCount={products.length}
        />
      </section>
    </div>
  );
}

