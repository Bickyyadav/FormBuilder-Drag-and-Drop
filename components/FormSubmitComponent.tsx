"use client";
import React, { useCallback, useRef, useState, useTransition } from "react";
import { FormElementInstance, FormElements } from "./FormElement";
import { Button } from "./ui/button";
import { HiCursorClick } from "react-icons/hi";
import { toast } from "sonner";
import { ImSpinner2 } from "react-icons/im";
import { SubmitForm } from "@/actions/from";

function FormSubmitComponent({
  formUrl,
  content,
}: {
  formUrl: string;
  content: FormElementInstance[];
}) {
  //validating form empty
  const formValues = useRef<{ [key: string]: string }>({});
  //validating form error
  const formErrors = useRef<{ [key: string]: boolean }>({});
  const [renderKey, setRenderKey] = useState(new Date().getTime());
  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();

  const validatingForm: () => boolean = useCallback(() => {
    for (const field of content) {
      const actualValue = formValues.current[field.id] || "";
      const valid = FormElements[field.type].validation(field, actualValue);
      if (!valid) {
        formErrors.current[field.id] = true;
      }
    }

    if (Object.keys(formErrors.current).length > 0) {
      return false;
    } else {
      return true;
    }
  }, [content]);

  //validating submitting form
  const submitValues = useCallback((key: string, value: string) => {
    formValues.current[key] = value;
  }, []);

  const submitForm = async () => {
    formErrors.current = {};
    const validForm = validatingForm();
    if (!validForm) {
      setRenderKey(new Date().getTime());
      toast("Please check the form for errors");
      return;
    }

    try {
      // console.log("🚀 ~ submitForm ~ formValues.current:", formValues.current);
      const JsonContent = JSON.stringify(formValues.current);
      await SubmitForm(formUrl, JsonContent);
      setSubmitted(true);
    } catch (error) {
      // console.log("🚀 ~ submitForm ~ error:", error);
      toast("Something went wrong");
    }
  };

  if (submitted) {
    return (
      <div className="flex justify-center w-full h-full items-center p-8">
        <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded">
          <h1 className="text-2xl font-bold">Form Submitted</h1>
          <p className="text-muted-foreground">
            Thank You submitting the form,you can close the page now
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-8 flex items-center justify-center">
      <div
        key={renderKey}
        className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded"
      >
        {content.map((element) => {
          const FormElement = FormElements[element.type].formComponent;
          return (
            <FormElement
              key={element.id}
              elementInstance={element}
              submitValue={submitValues}
              isInvalid={formErrors.current[element.id]}
              defaultValue={formValues.current[element.id]}
            />
          );
        })}
        <Button
          className="mt-8"
          disabled={pending}
          onClick={() => {
            startTransition(submitForm);
            // submitForm();
          }}
        >
          {!pending && (
            <div>
              <HiCursorClick className="mr-3" />
              Submit
            </div>
          )}
          {pending && <ImSpinner2 className="animate-spin" />}
        </Button>
      </div>
    </div>
  );
}

export default FormSubmitComponent;
