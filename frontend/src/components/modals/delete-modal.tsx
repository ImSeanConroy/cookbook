import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";

import { useModal } from "@/context/modal-context";
import { useRecipes } from "@/context/recipe-context";

const DeleteRecipeModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { deleteRecipe, isLoading } = useRecipes();
  const isModelOpen = isOpen && type === "deleteRecipe";

  const recipe = data?.recipeId;
  if (!recipe) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await deleteRecipe(recipe);
      onClose();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <Dialog open={isModelOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px] max-h-[90%] overflow-scroll">
        <DialogHeader>
          <DialogTitle>Delete Recipe</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete "{data?.recipeTitle}"? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              disabled={isLoading}
              className="cursor-pointer"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={handleSubmit}
            variant="destructive"
            disabled={isLoading}
            className="cursor-pointer"
          >
            {isLoading ? (
              <>
                <Spinner className="mr-2 h-4 w-4" />
                Deleting...
              </>
            ) : (
              "Delete Task"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteRecipeModal;
