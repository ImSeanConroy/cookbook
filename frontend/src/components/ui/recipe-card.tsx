import { getRandomImageUrl } from "@/lib/images";
import { Link } from "react-router-dom";

interface RecipeCardProps {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  difficulty: string;
  cuisine: string;
  time: number;
}

const RecipeCard = ({ id, title, subtitle, imageUrl, difficulty, cuisine, time }: RecipeCardProps) => (
<div className="group bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-700 transition-colors duration-100 rounded-2xl">
  <Link to={`/recipe/${id}`} className="flex flex-col">
    <img
      // src={imageUrl}
      src={imageUrl != "" ? imageUrl : getRandomImageUrl()}
      alt={title}
      className="rounded-t-2xl w-full h-[200px] md:h-[250px] lg:h-[250px] object-cover"
    />
    <div className="p-4 px-5 dark:text-white">
      <h2 className="text-xl font-semibold truncate">{title}</h2>
      <p className="truncate">{subtitle}</p>
      <div className="pt-3 text-sm flex flex-row divide-x divide-gray-400 text-gray-500">
        <p className="pr-3 truncate">{time} mins</p>
        <p className="px-3 truncate">{cuisine}</p>
        <p className="pl-3 truncate">
          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </p>
      </div>
    </div>
  </Link>
</div>

);

export default RecipeCard;
