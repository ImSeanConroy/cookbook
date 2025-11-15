interface NutritionData {
  calories: number | null;
  protein: number | null;
  carbs: number | null;
  sugars: number | null;
  fiber: number | null;
  fat: number | null;
  saturatedFat: number | null;
  sodium: number | null;
}

const nutrientLabels: { key: keyof NutritionData; label: string; unit: string }[] = [
  { key: 'calories', label: 'Calories', unit: 'kcal' },
  { key: 'protein', label: 'Protein', unit: 'g' },
  { key: 'carbs', label: 'Carbohydrates', unit: 'g' },
  { key: 'sugars', label: 'Sugars', unit: 'g' },
  { key: 'fiber', label: 'Fiber', unit: 'g' },
  { key: 'fat', label: 'Fat', unit: 'g' },
  { key: 'saturatedFat', label: 'Saturated Fat', unit: 'g' },
  { key: 'sodium', label: 'Sodium', unit: 'mg' },
];

const NutritionalList = ({ nutrition }: { nutrition: NutritionData }) => {
  const availableNutrients = nutrientLabels.filter(({ key }) => nutrition[key] != null);

  return (
    <div className="gap-6 items-center bg-zinc-100 dark:bg-zinc-900 px-4 py-3 md:px-6 md:py-5 rounded-2xl ">
      <h2 className="text-xl mb-3 font-semibold dark:text-white">Nutritional Information</h2>

      {availableNutrients.length === 0 ? (
        <p className="text-zinc-700 dark:text-zinc-500">Unfortunately, nutritional information is not available for this recipe.</p>
      ) : (
        <ul className="columns-1 md:columns-2 lg:columns-1 2xl:columns-2 gap-1 text-zinc-700 dark:text-zinc-500">
          {availableNutrients.map(({ key, label, unit }) => (
            <li key={key} className="pb-1">
              {label}: {nutrition[key]}
              {unit}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NutritionalList;
