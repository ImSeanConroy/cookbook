import { LucideActivity, LucideClock, LucideFlame } from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { useRecipes } from "@/context/recipe-context";

interface RecipeCardProps {
  id: string;
  title: string;
  subtitle: string;
  imageUrl?: string;
  difficulty: string;
  cuisine: string;
  cookTime: number;
  prepTime: number;
  selected?: boolean;
  calories: number;
}

const RecipeCard = ({
  id,
  title,
  subtitle,
  imageUrl,
  difficulty,
  cuisine,
  cookTime,
  prepTime,
  calories,
}: RecipeCardProps) => {
  const { setCurrentRecipe } = useRecipes();

  return (
    <Card
      className="rounded-lg relative mx-auto w-full max-w-sm pt-0 shadow-xs pb-5 gap-5 cursor-pointer"
      onClick={() => setCurrentRecipe(id)}
    >
      <div className="absolute z-50 w-100 px-3 py-2">
        <Badge variant="secondary" className="ml-auto rounded-sm">
          {cuisine}
        </Badge>
      </div>
      <img
        src={imageUrl}
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover rounded-t-lg bg-foreground"
      />
      <CardHeader className="px-4">
        <CardTitle>{title}</CardTitle>
        <CardDescription className="truncate">{subtitle}</CardDescription>
        <div className="mt-1 flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <LucideClock className="h-3 w-3" />
            <span>{cookTime + prepTime} minutes</span>
          </div>
          <div className="flex items-center gap-1">
            <LucideActivity className="h-3 w-3" />
            <span>{calories} cals</span>
          </div>
          <div className="flex items-center gap-1">
            <LucideFlame className="h-3 w-3" />
            <span>
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </span>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default RecipeCard;
