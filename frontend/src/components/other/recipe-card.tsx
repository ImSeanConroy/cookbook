import {
  LucideActivity,
  LucideClock,
  LucideFlame,
  MoreHorizontal,
} from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { useModal } from "@/context/modal-context";
import { Button } from "@/components/ui/button";
import { config } from "@/config";

interface RecipeCardProps {
  id: string;
  title: string;
  subtitle: string;
  imageUrl?: string;
  difficulty: string;
  cuisine: string;
  cookTime: number;
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
  calories,
}: RecipeCardProps) => {
  const { onOpen } = useModal();

  return (
    <Card
      className="rounded-lg relative mx-auto w-full max-w-sm pt-0 shadow-xs pb-5 gap-5 cursor-pointer group"
      onClick={() => onOpen("showRecipe", { recipeId: id })}
    >
      <div className="relative">
        <div className="absolute top-0 left-0 z-50 p-3">
          <Badge variant="secondary" className="rounded-sm">
            {cuisine}
          </Badge>
        </div>

        {config.READ_ONLY == false && (
          <div className="absolute top-0 right-0 z-50 p-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="default"
                  size="sm"
                  className="data-[state=open]:bg-muted size-8 cursor-pointer"
                >
                  <MoreHorizontal />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpen("editRecipe");
                  }}
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpen("deleteRecipe", {
                      recipeId: id,
                      recipeTitle: title,
                    });
                  }}
                >
                  Delete
                  <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        <img
          src={imageUrl}
          alt={title + " image"}
          className="aspect-video w-full object-cover object-center rounded-t-lg bg-foreground"
        />
      </div>

      <CardHeader className="px-4">
        <CardTitle className="truncate">{title}</CardTitle>
        <CardDescription className="truncate">{subtitle}</CardDescription>
        <div className="mt-1 flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <LucideClock className="h-3 w-3" />
            <span>{cookTime} minutes</span>
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
