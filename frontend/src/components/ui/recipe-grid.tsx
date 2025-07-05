import RecipeCard from "./recipe-card";

interface RecipeGridProps {
  id: string;
  title: string;
  imageUrl: string;
}

const RecipeGrid = ({ recipes }: { recipes: RecipeGridProps[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4 gap-6">
    {recipes.map(({ id, title, imageUrl }) => (
      <RecipeCard key={id} id={id} title={title} imageUrl={imageUrl} />
    ))}
    <RecipeCard id="1" title="Chicken and Bacon Pie" imageUrl="" />
    <RecipeCard id="1" title="Chicken and Bacon Pie" imageUrl="" />
    <RecipeCard id="1" title="Chicken and Bacon Pie" imageUrl="" />
    <RecipeCard id="1" title="Chicken and Bacon Pie" imageUrl="" />
    <RecipeCard id="1" title="Chicken and Bacon Pie" imageUrl="" />
    <RecipeCard id="1" title="Chicken and Bacon Pie" imageUrl="" />
  </div>
);

export default RecipeGrid;
