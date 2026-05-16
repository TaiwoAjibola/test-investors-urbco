import * as React from "react";
import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value?: number; max?: number; color?: string }
>(({ className, value = 0, max = 100, color = "bg-emerald-500", ...props }, ref) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  return (
    <div
      ref={ref}
      className={cn("relative h-3 w-full overflow-hidden rounded-full bg-slate-100", className)}
      {...props}
    >
      <div
        className={cn("h-full transition-all duration-500 ease-out rounded-full", color)}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
});
Progress.displayName = "Progress";

export { Progress };
