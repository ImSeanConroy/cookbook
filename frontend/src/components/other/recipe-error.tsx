import { Button } from "../ui/button";

const RecipeError = ({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) => (
  <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
    <p className="text-lg font-semibold text-destructive">
      Oops! Something went wrong
    </p>
    <p className="text-muted-foreground max-w-md">{message}</p>
    <Button onClick={onRetry}>Try again</Button>
  </div>
);

export default RecipeError;
