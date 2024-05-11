"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";

import {
  CreateProductSchema,
  createProductSchema,
} from "@/lib/validation/note";

import { useState } from "react";
import { Product } from "@prisma/client";
import LoadingButton from "@/components/LoadingButton";
import UploadBtn from "@/components/UploadBtn";
import ImageUpload from "@/components/ui/image-upload";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface AddEditProductDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  productToEdit?: Product;
}

export default function AddEditProduct({
  productToEdit,
}: AddEditProductDialogProps) {
  const [deleteInProgress, setDeleteInProgress] = useState(false);

  const form = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      title: productToEdit?.title || "",
      price: productToEdit?.price || 0,
      images:
        productToEdit?.images.map((img) => ({
          url: img.url,
          caption: img.caption || undefined, // Convert null to undefined
        })) || [],
    },
  });

  async function onSubmit(input: CreateProductSchema) {
    console.log(input);

    try {
      if (productToEdit) {
        const response = await fetch("/api/product", {
          method: "PUT",
          body: JSON.stringify({ id: productToEdit?.id, ...input }),
        });
        if (!response.ok) throw Error("status code " + response.status);
      } else {
        const response = await fetch("/api/product", {
          method: "POST",
          body: JSON.stringify(input),
        });

        if (!response.ok) throw Error("status code " + response.status);

        form.reset();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="relative z-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <h3 className="font-bold">Product Identification</h3>
          <FormField
            key="title"
            control={form.control}
            name="title"
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...formField} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value?.map((image) => image.url) || []}
                    disabled={deleteInProgress}
                    onChange={(url: string) =>
                      field.onChange([...(field.value || []), { url }])
                    }
                    onRemove={(url: string) =>
                      field.onChange([
                        ...(field.value || []).filter(
                          (current) => current.url !== url
                        ),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            key="price"
            control={form.control}
            name="price"
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="Price" {...formField} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {productToEdit && (
            <LoadingButton
              variant="destructive"
              loading={deleteInProgress}
              disabled={form.formState.isSubmitting}
              /*       onClick={deleteNote} */
              type="button"
            >
              Delete Patient
            </LoadingButton>
          )}
          <LoadingButton type="submit" loading={form.formState.isSubmitting}>
            Submit
          </LoadingButton>
        </form>
      </Form>
    </div>
  );
}
