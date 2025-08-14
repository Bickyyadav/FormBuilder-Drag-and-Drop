"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { FormElementInstance } from "../FormElement";

type DesignerContextType = {
  elements: FormElementInstance[];
  setElements: Dispatch<SetStateAction<FormElementInstance[]>>;
  addElement: (index: number, element: FormElementInstance) => void;
  removeElement: (id: string) => void;
  selectedElement: FormElementInstance | null;
  setSelectedElement: Dispatch<SetStateAction<FormElementInstance | null>>;

  updateElement: (id: string, element: FormElementInstance) => void;
};

export const DesignContext = createContext<DesignerContextType | null>(null);

export default function DesignContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [elements, setElements] = useState<FormElementInstance[]>([]);
  const [selectedElement, setSelectedElement] =
    useState<FormElementInstance | null>(null);

  const addElement = (index: number, element: FormElementInstance) => {
    setElements((prev) => {
      // Copy the old array (prev = previous state value)
      const newElement = [...prev];
      // Insert 'element' at 'index' position
      // splice(index, deleteCount, itemToAdd)
      // Here, deleteCount = 0 → we are not removing anything
      newElement.splice(index, 0, element);
      //  Return the updated array to set as new state
      return newElement;
    });
  };

  const removeElement = (id: string) => {
    setElements((prev) => prev.filter((elements) => elements.id != id));
  };

  const updateElement = (id: string, element: FormElementInstance) => {
    setElements((prev) => {
      const newElement = [...prev];
      const index = newElement.findIndex((e) => e.id === id);
      newElement[index] = element;
      return newElement;
    });
  };

  return (
    <DesignContext.Provider
      value={{
        elements,
        addElement,
        removeElement,
        selectedElement,
        setSelectedElement,
        setElements,
        updateElement,
      }}
    >
      {children}
    </DesignContext.Provider>
  );
}
