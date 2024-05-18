"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

import {
  CreateProductSchema,
  createProductSchema,
} from "@/lib/validation/note";

import { useEffect, useState } from "react";

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

import { createProduct, getCategories } from "@/lib/productsAction/proAction";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Category } from "@prisma/client";

const statusOptions = [
  { value: "ACTIVE", label: "Active" },
  { value: "OUTOFSTOCK", label: "Out of Stock" },
  { value: "ARCHIVED", label: "Archived" },
];

export default function ProductAddPage() {
  const [position, setPosition] = useState("bottom");
  const [deleteInProgress, setDeleteInProgress] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const form = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      title: "",
      coastPerItem: 0,
      description: "",
      price: 0,
      images: [],
      stock: 0,
      isDiscount: false,
      status: "ACTIVE",
      discountType: "PERCENTAGE",
      discountValue: 0,
      categories: [], // Add this line for default value
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCategories();
      if (!res || res.status !== 200) {
        console.error("Error fetching categories");
        return;
      }
      if (res.categories) {
        setCategories(res?.categories);
        console.log(res.categories);
      }
    };

    fetchData();
  }, []);

  async function onSubmit(input: CreateProductSchema) {
    try {
      const response = await createProduct(input);
      if (response) {
        toast.success("Item has been created successfully.", {});
        form.reset();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create the product. Please try again.");
    }
  }

  return (
    <div className="p-4 border-1 border-black rounded-md bg-[#f1f1f1]">
      <h1 className="font-bold text-2xl mb-4">Add Product</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <div className="flex flex-col justify-between md:flex-row ">
            <div className="flex justify-between w-full">
              <div className="w-3/4 flex flex-col gap-4 p-4 rounded-2xl bg-[#ffffff] m-4 border-gray-600">
                <FormField
                  key="title"
                  control={form.control}
                  name="title"
                  render={({ field: formField }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Short Sleeve shirt"
                          {...formField}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  key="description"
                  control={form.control}
                  name="description"
                  render={({ field: formField }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="" {...formField} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-1/3 flex flex-col gap-4 p-4 rounded-2xl bg-[#ffffff] m-4 border-gray-600">
                <h3>Status</h3>
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                              {statusOptions.find(
                                (option) => option.value === field.value
                              )?.label || "Select status"}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-56">
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup
                              value={field.value}
                              onValueChange={(value) => field.onChange(value)}
                            >
                              {statusOptions.map((option) => (
                                <DropdownMenuRadioItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </DropdownMenuRadioItem>
                              ))}
                            </DropdownMenuRadioGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <h3>Category</h3>
                <FormField
                  control={form.control}
                  name="categories"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          {categories.map((category) => (
                            <div
                              key={category?.id}
                              className="flex items-center"
                            >
                              <input
                                type="checkbox"
                                value={category.id}
                                checked={field.value.includes(category.id)}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  if (field.value.includes(value)) {
                                    field.onChange(
                                      field.value.filter((id) => id !== value)
                                    );
                                  } else {
                                    field.onChange([...field.value, value]);
                                  }
                                }}
                                className="mr-2"
                              />
                              <label>{category.name}</label>
                            </div>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="w-3/4 flex flex-col gap-4 p-4 rounded-2xl bg-[#ffffff] m-4 border-gray-600">
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
          </div>
          <div className="p-4 bg-white rounded-xl shadow-md border border-gray-200 mt-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <FormField
                key="price"
                control={form.control}
                name="price"
                render={({ field: formField }) => {
                  return (
                    <FormItem>
                      <FormLabel className="">Price</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          placeholder="Price"
                          {...formField}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                key="coastPerItem"
                control={form.control}
                name="coastPerItem"
                render={({ field: formField }) => {
                  const price = form.watch("price") || 0; // Default to 0 if price is undefined
                  const coastPerItem = form.watch("coastPerItem") || 0; // Default to 0 if price is undefined
                  const profit = Number(price) - Number(coastPerItem);
                  const margin = price > 0 ? (profit / Number(price)) * 100 : 0;

                  const profitColor =
                    profit < 0 ? "text-red-600" : "text-green-600";
                  const marginColor =
                    profit < 0 ? "text-red-600" : "text-green-600";

                  return (
                    <FormItem>
                      <FormLabel className="">Cost per Item</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          placeholder="Cost per Item"
                          {...formField}
                        />
                      </FormControl>
                      <FormMessage />
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4">
                        <p className={`text-sm md:text-base ${profitColor}`}>
                          Profit:{" "}
                          <span className="font-semibold">${profit}</span>
                        </p>
                        <p className={`text-sm md:text-base ${marginColor}`}>
                          Margin:{" "}
                          <span className="font-semibold">
                            {margin.toFixed(2)}%
                          </span>
                        </p>
                      </div>
                    </FormItem>
                  );
                }}
              />
            </div>
          </div>

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
          <div className="w-3/4 flex flex-col gap-4 p-4 rounded-2xl bg-[#ffffff] m-4 border-gray-600">
            <FormField
              key="stock"
              control={form.control}
              name="stock"
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input placeholder="55" {...formField} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
