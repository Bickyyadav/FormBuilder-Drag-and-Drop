import { GetFormsById } from "@/actions/from";
import FormBuilder from "@/components/FormBuilder";
import React from "react";

interface BuilderPageProps {
  params: {
    id: string;
  };
}

async function BuilderPage({ params }: BuilderPageProps) {
  const { id } = params;
  const form = await GetFormsById(Number(id));

  if (!form) {
    throw new Error("form not found");
  }
  return <FormBuilder form={form} />;
}

export default BuilderPage;
