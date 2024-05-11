"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CreateProductSchema,
  createProductSchema,
} from "@/lib/validation/note";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Product } from "@prisma/client";
import LoadingButton from "@/components/LoadingButton";
import UploadBtn from "@/components/UploadBtn";
import ImageUpload from "@/components/ui/image-upload";

interface AddEditProductDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  productToEdit?: Product;
}

export default function AddEditProduct({
  open,
  setOpen,
  productToEdit,
}: AddEditProductDialogProps) {
  const [deleteInProgress, setDeleteInProgress] = useState(false);
  const router = useRouter();
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

    /*  try {
      if (patientToEdit) {
        const response = await fetch("/api/notes", {
          method: "PUT",
          body: JSON.stringify({ id: patientToEdit?.id, ...input }),
        });
        if (!response.ok) throw Error("status code " + response.status);
      } else {
        const response = await fetch("/api/notes", {
          method: "POST",
          body: JSON.stringify(input),
        });

        if (!response.ok) throw Error("status code " + response.status);

        form.reset();
      }

      router.refresh();
      setOpen(false);
    } catch (error) {
      console.log(error);
    } */
  }

  return (
    <div className="relative z-10">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="my-2 h-[100vh] overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>
              {productToEdit ? "Edit Product" : "Add Product"}
            </DialogTitle>
          </DialogHeader>
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
                        value={field.value.map((image) => image.url)}
                        disabled={loading}
                        onChange={(url) =>
                          field.onChange([...field.value, { url }])
                        }
                        onRemove={(url) =>
                          field.onChange([
                            ...field.value.filter(
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

              <DialogFooter className="gap-1 sm:gap-0">
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
                <LoadingButton
                  type="submit"
                  loading={form.formState.isSubmitting}
                >
                  Submit
                </LoadingButton>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
