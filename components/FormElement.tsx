import React from "react";
import { TextFieldFormElement } from "./fields/TextField";
import { TitleFieldFormElement } from "./fields/TitleField";
import { SubTitleFieldFormElement } from "./fields/SubtitleField";
import { ParagraphFieldFormElement } from "./fields/ParagraphField";
import { SeparatorFieldFormElement } from "./fields/SeparatorField";
import { SpacerFieldFormElement } from "./fields/SpacerField";
import { NumberFieldFormElement } from "./fields/NumberField";
import { TextAreaFormElement } from "./fields/TextAreaField";
import { DateFieldFormElement } from "./fields/DateField";
import { SelectFieldFormElement } from "./fields/SelectedField";
import { CheckboxFieldFormElement } from "./fields/CheckboxField";
// import { SubTitleFieldFormElement } from "./fields/SubtitleField";
// element types in the application
// we are doing to store json object in database
export type ElementsType =
  | "TextField"
  | "TitleField"
  | "SubTitleField"
  | "ParagraphField"
  | "SeparatorField"
  | "SpacerField"
  | "NumberField"
  | "TextAreaField"
  | "DateField"
  | "SelectedField"
  | "CheckboxField";
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
  TitleField: TitleFieldFormElement,
  SubTitleField: SubTitleFieldFormElement,
  ParagraphField: ParagraphFieldFormElement,
  SeparatorField: SeparatorFieldFormElement,
  SpacerField: SpacerFieldFormElement,
  NumberField: NumberFieldFormElement,
  TextAreaField: TextAreaFormElement,
  DateField: DateFieldFormElement,
  SelectedField: SelectFieldFormElement,
  CheckboxField: CheckboxFieldFormElement,
};

// function FormElement() {
//   return <div></div>;
// }

// export default FormElement;
