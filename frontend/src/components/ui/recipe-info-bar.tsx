import type { Recipe } from "@/types/recipe";
import RecipeInfoCard from "./recipe-info-card";

import {
  IoEarthOutline,
  IoPersonOutline,
  IoTimeOutline,
  IoFastFoodOutline,
  IoStarOutline,
} from "react-icons/io5";

const RecipeInfoBar = ({ data }: { data: Recipe }) => (
  <div className="flex flex-row justify-between pr-6">
    <RecipeInfoCard
      icon={<IoEarthOutline />}
      label="Cuisine"
      value={`${data.cuisine} Food`}
    />
    <RecipeInfoCard
      icon={<IoPersonOutline />}
      label="Servings"
      value={`${data.servings} Persons`}
    />
    <RecipeInfoCard
      icon={<IoTimeOutline />}
      label="Prep Time"
      value={`${data.prepTime} minutes`}
    />
    <RecipeInfoCard
      icon={<IoFastFoodOutline />}
      label="Cook Time"
      value={`${data.cookTime} minutes`}
    />
    <RecipeInfoCard
      icon={<IoStarOutline />}
      label="Difficulty"
      value={`${
        data.difficulty.charAt(0).toUpperCase() + data.difficulty.slice(1)
      } Level`}
    />
  </div>
);

export default RecipeInfoBar;
