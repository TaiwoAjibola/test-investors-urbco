import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "premium";
  size?: "default" | "sm" | "lg" | "icon";
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", isLoading, children, disabled, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer";
    
    const variants = {
      default: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm shadow-emerald-600/20",
      destructive: "bg-red-600 text-white hover:bg-red-700 shadow-sm shadow-red-600/20",
      outline: "border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-900 shadow-sm",
      secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
      ghost: "hover:bg-slate-100 text-slate-700",
      link: "text-emerald-600 underline-offset-4 hover:underline",
      premium: "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white hover:from-emerald-700 hover:to-emerald-600 shadow-md shadow-emerald-600/25",
    };
    
    const sizes = {
      default: "h-11 px-6 text-sm font-semibold",
      sm: "h-9 px-4 text-xs font-semibold",
      lg: "h-14 px-8 text-base font-semibold",
      icon: "h-10 w-10",
    };
    
    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
