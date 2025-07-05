import type { Recipe } from "@/types/recipe";
import RecipeInfoCard from "./recipe-info-card";

import {
  IoEarthOutline,
  IoPersonOutline,
  IoTimeOutline,
  IoFastFoodOutline,
  IoSpeedometerOutline,
} from "react-icons/io5";

const RecipeInfoBar = ({ data }: { data: Recipe }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-6 bg-neutral-100 p-6 rounded-2xl">
    <RecipeInfoCard
      icon={<IoEarthOutline />}
      label="Cuisine"
      value={data.cuisine}
    />
    <RecipeInfoCard
      icon={<IoPersonOutline />}
      label="Servings"
      value={`${data.servings} ${data.servings > 1 ? "Persons" : "Person"}`}
    />
    <RecipeInfoCard
      icon={<IoTimeOutline />}
      label="Prep Time"
      value={`${data.prepTime} ${data.servings > 1 ? "minutes" : "minute"}`}
    />
    <RecipeInfoCard
      icon={<IoFastFoodOutline />}
      label="Cook Time"
      value={`${data.cookTime} ${data.servings > 1 ? "minutes" : "minute"}`}
    />
    <RecipeInfoCard
      icon={<IoSpeedometerOutline />}
      label="Difficulty"
      value={
        data.difficulty.charAt(0).toUpperCase() + data.difficulty.slice(1)
      }
    />
  </div>
);

export default RecipeInfoBar;
