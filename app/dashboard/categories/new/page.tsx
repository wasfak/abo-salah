"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, FieldValues } from "react-hook-form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/LoadingButton";
// @ts-ignore
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { object, string, array } from "zod";
import { createCategory } from "@/lib/productsAction/proAction";

// Define the schema using Zod for an array of names
const createCategorySchema = object({
  names: array(string()),
});

type CreateCategorySchema = Zod.infer<typeof createCategorySchema>;

export default function CategoryAddPage() {
  const form = useForm<CreateCategorySchema>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      names: ["men"], // Ensures initial input is shown
    },
  });

  // Define the type explicitly for useFieldArray to prevent TypeScript errors
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    // @ts-ignore
    name: "names",
  });

  const onSubmit = async (data: CreateCategorySchema) => {
    try {
      const response = await createCategory(data);

      toast.success("Category has been created successfully..", {});
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 border-1 border-black rounded-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-2">
              <FormField
                key={field.id} // Use unique id for key
                control={form.control}
                name={`names.${index}`} // Correct usage of name for field array
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>Category name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter category name" {...formField} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button
                type="button"
                onClick={() => remove(index)} // Removes this input
                className="bg-red-500 text-white py-1 px-3 rounded"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => append("")} // Appends an empty string to the names array
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Add More
          </button>

          <LoadingButton type="submit" loading={form.formState.isSubmitting}>
            Submit
          </LoadingButton>
        </form>
      </Form>
    </div>
  );
}
