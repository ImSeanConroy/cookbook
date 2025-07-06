import { Link } from "react-router-dom";

interface RecipeCardProps {
  id: string;
  title: string;
  imageUrl: string;
  difficulty: string;
  cuisine: string;
  time: number;
}

const RecipeCard = ({ id, title, imageUrl, difficulty, cuisine, time }: RecipeCardProps) => (
  <div className=" bg-zinc-100 rounded-2xl">
    <Link to={`/recipe/${id}`} className="flex flex-col">
      <img
        src={imageUrl}
        alt={title}
        className="rounded-t-2xl bg-zinc-200 w-full h-[300px] md:h-[350px] lg:h-[300px] object-cover"
      />
      <div className="p-4 px-5">
        <h2 className="text-xl font-semibold truncate">{title}</h2>
        <p className="truncate">Roasted Cauliflower and Zesty Jasmine Rice</p>
        <div className="pt-4 flex flex-row divide-x divide-gray-400 text-gray-500">
          <p className="pr-3 truncate">{time} mins</p>
          <p className="px-3 truncate">{cuisine}</p>
          <p className="pl-3 truncate">{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</p>
        </div>
      </div>
    </Link>
  </div>
);

export default RecipeCard;
