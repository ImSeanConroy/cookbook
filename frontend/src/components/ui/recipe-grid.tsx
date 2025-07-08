import RecipeCard from "./recipe-card";

interface RecipeGridProps {
  id: string;
  title: string;
  imageUrl: string;
  difficulty: string;
  cuisine: string;
  cookTime: number;
  prepTime: number;
}

const RecipeGrid = ({ recipes }: { recipes: RecipeGridProps[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
    {recipes.map(
      ({ id, title, imageUrl, difficulty, cuisine, cookTime, prepTime }) => (
        <RecipeCard
          key={id}
          id={id}
          title={title}
          imageUrl={imageUrl}
          difficulty={difficulty}
          cuisine={cuisine}
          time={prepTime + cookTime}
        />
      )
    )}
  </div>
);

export default RecipeGrid;
