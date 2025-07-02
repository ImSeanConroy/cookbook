import type { JSX } from "react";

interface InfoCardProps {
  icon: JSX.Element;
  label: string;
  value: string;
}

const RecipeInfoCard = ({ icon, label, value }: InfoCardProps) => (
  <div className="flex flex-row gap-3 items-center">
    <div className="rounded-full bg-lime-100 text-lime-600 p-3 text-2xl">
      {icon}
    </div>
    <div>
      <p className="text-zinc-500">{label}</p>
      <p className="font-bold text-lg">{value}</p>
    </div>
  </div>
);

export default RecipeInfoCard;
