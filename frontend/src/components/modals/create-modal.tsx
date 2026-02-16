import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

import { useModal } from "@/context/modal-context";

const CreateRecipeModal = () => {
  const { isOpen, onClose, type } = useModal();
  const isModelOpen = isOpen && type === "createRecipe";

  return (
    <Dialog open={isModelOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px] max-h-[90%] overflow-scroll">
        <div className="space-y-5">
          <DialogHeader>
            <DialogTitle>Create Recipe</DialogTitle>
            <DialogDescription>
              Add details for your new recipe below. Click create when you're
              done.
            </DialogDescription>
          </DialogHeader>
          <Separator />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRecipeModal;
