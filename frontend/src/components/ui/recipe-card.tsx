import { Link } from "react-router-dom";

interface RecipeCardProps {
  id: string;
  title: string;
  imageUrl: string;
}

const RecipeCard = ({ id, title, imageUrl }: RecipeCardProps) => (
  <div className="px-6 py-5 bg-zinc-100 rounded-3xl">
    <Link to={`/recipe/${id}`} className="flex flex-col gap-5">
      <h2 className="text-4xl font-semibold flex-grow">{title}</h2>
      <img
        src={imageUrl}
        alt={title}
        className="rounded-2xl bg-zinc-200 w-full h-[450px]"
      />
      <div className="bg-zinc-900 rounded-full">
        <p className="text-white p-3 px-5">See complete recipe</p>
      </div>
    </Link>
  </div>
);

export default RecipeCard;
