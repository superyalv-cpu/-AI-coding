import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-[linear-gradient(135deg,#4facfe,#00f2fe)] text-white shadow-[0_12px_30px_rgba(79,172,254,0.32)] hover:scale-[1.02]",
        ghost:
          "bg-white/12 text-foreground hover:bg-white/18 dark:bg-white/6 dark:hover:bg-white/10",
        secondary:
          "bg-white/70 text-foreground shadow-[0_8px_24px_rgba(18,53,97,0.08)] hover:bg-white/80 dark:bg-white/10 dark:hover:bg-white/15",
        outline:
          "border border-white/35 bg-white/25 text-foreground hover:bg-white/38 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10",
      },
      size: {
        default: "h-11 px-4",
        sm: "h-9 px-3 text-xs",
        lg: "h-12 px-5 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
