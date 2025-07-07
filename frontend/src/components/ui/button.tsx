import { cn } from "../../lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={cn(
        "px-4 py-3 rounded-xl cursor-pointer text-white text-sm disabled:opacity-50 bg-zinc-800 hover:bg-zinc-600",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
