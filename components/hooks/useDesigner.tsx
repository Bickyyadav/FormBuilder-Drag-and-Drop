import { useContext } from "react";
import { DesignContext } from "../context/DesignerContext";

function useDesigner() {
  const context = useContext(DesignContext);
  if (!context) {
    throw new Error("user Designer must be used withing a DesignerContext ");
  }
  return context;
}

export default useDesigner;
