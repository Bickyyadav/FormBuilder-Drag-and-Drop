import { GetFormContentByUrl } from "@/actions/from";
import { FormElementInstance } from "@/components/FormElement";
import FormSubmitComponent from "@/components/FormSubmitComponent";
import React from "react";

async function Submit({ params }: { params: { formUrl: string } }) {
  const form = await GetFormContentByUrl(params.formUrl);
  if (!form) {
    throw new Error("form not found");
  }

  const formContent = JSON.parse(form.content) as FormElementInstance[];

  return <FormSubmitComponent formUrl={params.formUrl} content={formContent} />;
}

export default Submit;
