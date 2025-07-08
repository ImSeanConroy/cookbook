interface IngredientListProps {
  name: string;
  quantity: string;
}

const IngredientsList = ({
  ingredients,
}: {
  ingredients: IngredientListProps[];
}) => (
  <div className="gap-6 items-center bg-zinc-100 dark:bg-zinc-900 dark:text-white p-6 md:p-8 rounded-2xl">
    <h2 className="text-2xl mb-3 font-semibold">Ingredients</h2>
    <ul className="columns-1 md:columns-2 gap-4">
      {ingredients.map((ingredient, i) => (
        <li key={i} className="py-1 text-zinc-500">
          {ingredient.name} {ingredient.quantity}
        </li>
      ))}
    </ul>
  </div>
);

export default IngredientsList;
