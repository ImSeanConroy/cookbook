import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export type ModalType = "showRecipe" | "createRecipe" | "editRecipe" | "deleteRecipe";

interface ModalDataType {
  recipeId?: string;
}

/**
 * Modal Context Type
 * */
interface ModalContextType {
  type: ModalType | null;
  isOpen: boolean;
  data: ModalDataType | null;
  onOpen: (type: ModalType, data?: ModalDataType) => void;
  onClose: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [type, setType] = useState<ModalType | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [data, setData] = useState<ModalDataType>({});

  const onOpen = (type: ModalType, data: ModalDataType = {}) => {
    setIsOpen(true);
    setType(type);
    setData(data)
  };

  const onClose = () => {
    setIsOpen(false);
    setType(null);
    setData({})
  };

  return (
    <ModalContext.Provider value={{ type, isOpen, data, onOpen, onClose }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within an ModalProvider");
  }

  return context;
};
