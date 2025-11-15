import RecipeInfoCard from "@/components/ui/recipe-info-card";
import type { Recipe } from "@/types/recipe";

import {
  IoPersonOutline,
  IoTimeOutline,
  IoFastFoodOutline,
  IoSpeedometerOutline,
} from "react-icons/io5";

const RecipeInfoBar = ({ data }: { data: Recipe }) => (
  <div className="grid grid-cols-2 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 bg-zinc-100 dark:bg-zinc-900 dark:text-white p-4 rounded-2xl">
    <RecipeInfoCard
      icon={<IoPersonOutline />}
      label="Servings"
      value={`${data.servings} ${data.servings > 1 ? "Persons" : "Person"}`}
    />
    <RecipeInfoCard
      icon={<IoTimeOutline />}
      label="Prep Time"
      value={`${data.prepTime} ${data.prepTime > 1 ? "minutes" : "minute"}`}
    />
    <RecipeInfoCard
      icon={<IoFastFoodOutline />}
      label="Cook Time"
      value={`${data.cookTime} ${data.cookTime > 1 ? "minutes" : "minute"}`}
    />
    <RecipeInfoCard
      icon={<IoSpeedometerOutline />}
      label="Difficulty"
      value={data.difficulty.charAt(0).toUpperCase() + data.difficulty.slice(1)}
    />
  </div>
);

export default RecipeInfoBar;
