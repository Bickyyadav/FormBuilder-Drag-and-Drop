"use client";

import { MdTextFields } from "react-icons/md";
import { ElementsType, FormElement, FormElementInstance } from "../FormElement";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const type: ElementsType = "TextField";
const extraAttributes = {
  label: "Text Fields",
  helperText: "Helper text",
  required: false,
  placeHolder: "valued here....",
};

export const TextFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: MdTextFields,
    label: "Text Fields",
  },
  designerComponent: DesignerComponent,
  formComponent: () => <div className="text-white">Designer component</div>,
  propertiesComponent: () => (
    <div className="text-white">Properties component</div>
  ),
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { label, required, placeHolder, helperText } = element.extraAttributes;
  return (
    <div className="text-white flex flex-col gap-2 w-full">
      <Label>
        {label} {required && "*"}
      </Label>
      <Input readOnly disabled placeholder={placeHolder}></Input>
      {helperText && <p>{helperText}</p>}
    </div>
  );
}
