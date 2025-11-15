import type { JSX } from "react";

interface InfoCardProps {
  icon: JSX.Element;
  label: string;
  value: string;
}

const RecipeInfoCard = ({ icon, label, value }: InfoCardProps) => (
  <div className="flex flex-row gap-3 items-center bg-white dark:bg-zinc-800 rounded-lg px-2 py-2">
    <div className="rounded-full bg-lime-100 dark:bg-lime-200 text-lime-600 dark:text-lime-900 p-3 text-2xl">
      {icon}
    </div>
    <div>
      <p className="text-zinc-500 dark:text-zinc-400 text-sm">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  </div>
);

export default RecipeInfoCard;
