"use client";
import { SquarePlus } from "lucide-react";
import { Button } from "./ui/button";
import AddEditProduct from "@/form/AddEditProduct";
import { useState } from "react";

export default function AddProduct() {
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => setShowForm(!showForm);
  return (
    <div>
      <Button
        className="flex items-center justify-between gap-x-2"
        onClick={toggleForm}
      >
        <SquarePlus />
        Add Product
      </Button>
      <AddEditProduct open={showForm} setOpen={setShowForm} />
    </div>
  );
}
