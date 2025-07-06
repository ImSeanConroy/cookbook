
import { cn } from "../../lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "primary",
  ...props
}) => {
  const baseStyles =
    "px-5 py-3 rounded-xl cursor-pointer text-white text-sm disabled:opacity-50";
    // "px-4 py-2 rounded-xl cursor-pointer text-white text-sm disabled:opacity-50";

  const variantStyles =
    variant === "primary"
      ? "bg-zinc-800 hover:bg-zinc-600"
      : "bg-zinc-900 hover:bg-zinc-700";

  return (
    <button className={cn(baseStyles, variantStyles, className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
