import React from "react";
import { TextFieldFormElement } from "./fields/TextField";
// element types in the application
// we are doing to store json object in database
export type ElementsType = "TextField";
export type submitFunction = (key: string, value: string) => void;
export type FormElement = {
  type: ElementsType;

  construct: (id: string) => FormElementInstance;

  //button types
  designerBtnElement: {
    icon: React.ElementType;
    label: string;
  };

  // which we going a design like form designer
  designerComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  //preview form
  formComponent: React.FC<{
    elementInstance: FormElementInstance;
    submitValue?: (key: string, value: string) => void;
    isInvalid?: boolean;
    defaultValue?: string;
  }>;
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;

  validation: (
    formElement: FormElementInstance,
    currentValue: string
  ) => boolean;
};

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extraAttributes?: Record<string, any>;
};

type FormElementsType = {
  [key in ElementsType]: FormElement;
};

export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
};

// function FormElement() {
//   return <div></div>;
// }

// export default FormElement;
