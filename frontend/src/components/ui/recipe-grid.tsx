import RecipeCard from "./recipe-card";

interface RecipeGridProps {
  id: string;
  title: string;
  subtitle: string
  cardImageUrl: string;
  difficulty: string;
  cuisine: string;
  cookTime: number;
  prepTime: number;
}

const RecipeGrid = ({ recipes }: { recipes: RecipeGridProps[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
    {recipes.map(
      ({ id, title, subtitle, cardImageUrl, difficulty, cuisine, cookTime, prepTime }) => (
        <RecipeCard
          key={id}
          id={id}
          title={title}
          subtitle={subtitle}
          imageUrl={cardImageUrl}
          difficulty={difficulty}
          cuisine={cuisine}
          time={prepTime + cookTime}
        />
      )
    )}
  </div>
);

export default RecipeGrid;
