import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getRandomImageUrl } from "@/lib/images";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { LucideClock, LucideFlame } from "lucide-react";

interface RecipeCardProps {
  id: string;
  title: string;
  subtitle: string;
  imageUrl?: string;
  difficulty: string;
  cuisine: string;
  cookTime: number;
  selected?: boolean;
}

const RecipeCard = ({
  id,
  title,
  subtitle,
  imageUrl,
  difficulty,
  cuisine,
  cookTime,
}: RecipeCardProps) => {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0 shadow-xs" key={id}>
      <div className="absolute z-50 w-100 p-2">
        <Badge variant="secondary">{cuisine}</Badge>
        <Badge variant="secondary" className="ml-auto">
          {difficulty}
        </Badge>
      </div>

      <img
        src={imageUrl != "" ? imageUrl : getRandomImageUrl()}
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover rounded-t-xl"
      />
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {subtitle}
        </CardDescription>
        <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <LucideClock className="h-3 w-3" />
            <span>{cookTime} - 20 mins</span>
          </div>
          <div className="flex items-center gap-1">
            <LucideFlame className="h-3 w-3" />
            <span>500 cal</span>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default RecipeCard;
