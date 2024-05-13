"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// @ts-ignore
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

import {
  CreateProductSchema,
  createCategorySchema,
} from "@/lib/validation/note";

import { useState } from "react";

import LoadingButton from "@/components/LoadingButton";

import ImageUpload from "@/components/ui/image-upload";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { createProduct } from "@/lib/productsAction/proAction";

export default function ProductAddPage() {
  const [deleteInProgress, setDeleteInProgress] = useState(false);

  const form = useForm<CreateProductSchema>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      title: "",
      price: 0,
      images: [],
      isDiscount: false,
      discountType: "PERCENTAGE",
      discountValue: 0,
    },
  });

  async function onSubmit(input: CreateProductSchema) {
    try {
      const response = await createProduct(input);
      console.log(response);

      toast.success("Item has been created successfully..", {});
      form.reset();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="p-4 border-1 border-black rounded-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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
          <FormField
            control={form.control}
            name="isDiscount"
            render={({
              field: { ref, onChange, onBlur, value, name, ...field },
            }) => (
              <FormItem>
                <FormLabel>On sale?</FormLabel>
                <FormControl>
                  <input
                    type="checkbox"
                    name={name}
                    ref={ref}
                    onChange={onChange}
                    onBlur={onBlur}
                    checked={value} // Use checked for checkboxes
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {form.watch("isDiscount") && (
            <>
              <FormField
                control={form.control}
                name="discountType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount Type</FormLabel>
                    <FormControl>
                      <select {...field}>
                        <option value="PERCENTAGE">Percentage</option>
                        <option value="FIXED">Fixed Amount</option>
                      </select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="discountValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount Value</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Discount Value"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </>
          )}

          <LoadingButton type="submit" loading={form.formState.isSubmitting}>
            Submit
          </LoadingButton>
        </form>
      </Form>
    </div>
  );
}
