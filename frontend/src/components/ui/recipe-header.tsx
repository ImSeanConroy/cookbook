import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  position?: "center" | "bottom";
};

const RecipeHeader = ({ children, position = "center" }: Props) => {
  return (
    <header
      className={cn(
        "p-6 rounded-2xl h-[450px] flex flex-col bg-cover bg-center",
        position === "center" ? "justify-center" : "justify-end"
      )}
      style={{
        backgroundImage:
          "url('/img/cover.jpg')",
      }}
    >
      <div className="bg-white dark:bg-zinc-800 bg-opacity-90 p-6 rounded-xl w-full lg:w-1/2">
        <p className="text-zinc-500 dark:text-white">Let’s Cook</p>
        {children}
      </div>
    </header>
  );
};

export default RecipeHeader;
