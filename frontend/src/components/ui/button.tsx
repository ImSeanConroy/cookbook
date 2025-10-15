import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={cn(
        "flex flex-row items-center justify-between gap-2 px-4 py-3 rounded-xl cursor-pointer text-sm disabled:opacity-50 bg-zinc-800 hover:bg-zinc-600 dark:bg-zinc-800 text-white",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
