interface IngredientListProps {
  name: string;
  quantity: string;
}

const IngredientsList = ({
  ingredients,
}: {
  ingredients: IngredientListProps[];
}) => (
  <div className="gap-6 items-center bg-zinc-100 p-8 rounded-2xl">
    <h2 className="text-2xl mb-3 font-semibold">Ingredients</h2>
    <ul className="columns-2 gap-4">
      {ingredients.map((ingredient, i) => (
        <li key={i} className="py-1">
          {ingredient.name} {ingredient.quantity}
        </li>
      ))}
    </ul>
  </div>
);

export default IngredientsList;
