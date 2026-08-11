import * as React from "react";
import { cn } from "@/lib/utils";

const Badge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "secondary" | "success" | "warning" | "danger" | "info" | "premium" }
>(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "bg-slate-100 text-slate-700",
    secondary: "bg-slate-200/70 text-slate-600",
    success: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/15",
    warning: "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/15",
    danger: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/15",
    info: "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/15",
    premium: "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-sm",
  };
  
  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold transition-all duration-200",
        variants[variant],
        className
      )}
      {...props}
    />
  );
});
Badge.displayName = "Badge";

export { Badge };
