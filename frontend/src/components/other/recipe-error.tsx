import { Button } from "@/components/ui/button";

interface RecipeErrorProps {
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
}

const RecipeError = ({
  message = "We couldn’t load this recipe. Please try again.",
  onRetry,
  retryLabel = "Try again",
}: RecipeErrorProps) => {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center py-20 px-4 text-center space-y-4"
    >
      <div className="space-y-2">
        <p className="text-xl font-semibold text-destructive">
          Something went wrong
        </p>
        <p className="text-muted-foreground max-w-md mx-auto">
          {message}
        </p>
      </div>

      {onRetry && (
        <Button onClick={onRetry} variant="default" className="cursor-pointer">
          {retryLabel}
        </Button>
      )}
    </div>
  );
};

export default RecipeError;
