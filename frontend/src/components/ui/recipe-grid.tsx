import RecipeCard from "./recipe-card";

interface RecipeGridProps {
  id: string;
  title: string;
  imageUrl: string;
}

const RecipeGrid = ({ recipes }: { recipes: RecipeGridProps[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {recipes.map(({ id, title, imageUrl }) => (
      <RecipeCard key={id} id={id} title={title} imageUrl={imageUrl} />
    ))}
  </div>
);

export default RecipeGrid;
