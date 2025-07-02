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
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ">


    <RecipeInfoCard
      icon={<IoEarthOutline />}
      label="Cuisine"
      value={`${data.cuisine} Food`}
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
      value={`${
        data.difficulty.charAt(0).toUpperCase() + data.difficulty.slice(1)
      } Level`}
    />
  </div>
);

export default RecipeInfoBar;
