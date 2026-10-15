import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-[hsl(var(--muted)/0.8)]", className)}
      {...props}
    />
  );
}

export { Skeleton };
