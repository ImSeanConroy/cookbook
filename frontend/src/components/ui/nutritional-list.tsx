interface NutritionData {
  calories: string;
  protein: string;
  carbs: string;
  sugars?: string;
  fiber?: string;
  fat: string;
  saturatedFat?: string;
  transFat?: string;
  cholesterol?: string;
  sodium?: string;
  potassium?: string;
  calcium?: string;
  iron?: string;
  vitaminD?: string;
}

const NutritionalList = ({
  nutrition,
}: {
  nutrition: NutritionData;
}) => (
  <div className="gap-6 items-center bg-neutral-100 p-6 md:p-8 rounded-2xl">
    <h2 className="text-2xl mb-3 font-semibold">Nutritional Information</h2>
    <ul className="columns-1 md:columns-2 lg:columns-1 xl:columns-2 gap-4 text-zinc-500">
      <li className="py-1">Calories: {nutrition.calories}</li>
      <li className="py-1">Protein: {nutrition.protein}</li>
      <li className="py-1">Carbohydrates: {nutrition.carbs}</li>
      {nutrition.sugars && <li className="py-1">Sugars: {nutrition.sugars}</li>}
      {nutrition.fiber && <li className="py-1">Fiber: {nutrition.fiber}</li>}
      <li className="py-1">Fat: {nutrition.fat}</li>
      {nutrition.saturatedFat && <li className="py-1">Saturated Fat: {nutrition.saturatedFat}</li>}
      {nutrition.transFat && <li className="py-1">Trans Fat: {nutrition.transFat}</li>}
      {nutrition.cholesterol && <li className="py-1">Cholesterol: {nutrition.cholesterol}</li>}
      {nutrition.sodium && <li className="py-1">Sodium: {nutrition.sodium}</li>}
      {nutrition.potassium && <li className="py-1">Potassium: {nutrition.potassium}</li>}
      {nutrition.calcium && <li className="py-1">Calcium: {nutrition.calcium}</li>}
      {nutrition.iron && <li className="py-1">Iron: {nutrition.iron}</li>}
      {nutrition.vitaminD && <li className="py-1">Vitamin D: {nutrition.vitaminD}</li>}
    </ul>
  </div>
);


export default NutritionalList;
