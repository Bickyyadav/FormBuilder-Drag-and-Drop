"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import { BsFileEarmark, BsFileEarmarkPlus } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
} from "./ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { Toaster } from "./ui/sonner";
import { formSchema, typeSchemaType } from "@/schemas/form";
import { CreateFrom } from "@/actions/from";
import { useRouter } from "next/navigation";

// const formSchema = z.object({
//   name: z.string().min(4),
//   description: z.string().optional(),
// });

// type typeSchemaType = z.infer<typeof formSchema>;

const CreateFormButton = () => {
  const router = useRouter();
  const form = useForm<typeSchemaType>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: typeSchemaType) {
    try {
      const formId = await CreateFrom(values);
      console.log("🚀 ~ onSubmit ~ formId:", formId);
      toast("form created successfully");
      router.push(`/builder/${formId}`);
    } catch (error) {
      // Toaster({
      //   title: "Error",
      //   description: "something went wrong please try again latter",
      //   variant: "destructive",
      // });
      console.log("🚀 ~ onSubmit ~ error:", error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="group border border-primary/20 h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4 "
        >
          <BsFileEarmark className="h-8 w-8 text-muted-foreground group-hover:text-primary" />
          <p className="font-bold text-xl text-muted-foreground group-hover:text-primary">
            Create a new From
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogHeader>Create Form</DialogHeader>
          <DialogDescription>
            Create a new Form to start a collection Request
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field}></Input>
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
          </form>
        </Form>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field}></Textarea>
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
          </form>
        </Form>
        <DialogFooter>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitted}
            className="w-full mt-4"
          >
            {!form.formState.isSubmitting && <span> Save</span>}
            {form.formState.isSubmitting && (
              <ImSpinner2 className="animate-spin" />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFormButton;
