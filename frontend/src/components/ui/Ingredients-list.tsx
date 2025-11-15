interface IngredientListProps {
  name: string;
  quantity: string;
}

const IngredientsList = ({
  ingredients,
}: {
  ingredients: IngredientListProps[];
}) => (
  <div className="gap-6 items-center bg-zinc-100 dark:bg-zinc-900 px-4 py-3 md:px-6 md:py-5 rounded-2xl">
    <h2 className="text-xl mb-3 font-semibold dark:text-white">Ingredients</h2>
    <ul className="columns-1 md:columns-2 gap-4">
      {ingredients.map((ingredient, i) => (
        <li key={i} className="pb-1 text-zinc-700 dark:text-zinc-500">
          {ingredient.name} {ingredient.quantity}
        </li>
      ))}
    </ul>
  </div>
);

export default IngredientsList;
