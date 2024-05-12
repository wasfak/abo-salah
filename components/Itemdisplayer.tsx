"use client";
// @ts-ignore
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "./ui/label";
import { Product } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";

type ExcludedProduct = Omit<Product, "clerkId">;

interface ItemDisplayerProps {
  product: ExcludedProduct;
}

export default function Itemdisplayer({ product }: ItemDisplayerProps) {
  const [image, setImage] = useState(product?.images[0].url);

  const handelDelete = async (id: string) => {
    try {
      const response = await fetch("/api/product", {
        method: "DELETE",
        body: JSON.stringify({ id: product?.id }),
      });
      if (!response.ok) throw Error("status code " + response.status);
      toast.success("Item has been deleted successfully..", {
        action: {
          label: "Undo",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader className="w-full relative pt-[100%]">
          <Image
            src={image}
            alt={product.title}
            objectFit="cover"
            fill
            className="w-full h-full top-0 left-0 object-cover border-b-2"
            quality={90}
          />
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              {product.images.length > 1 && (
                <div className="m-y-6 flex flex-wrap gap-4 justify-center">
                  {product.images.map((img, index) => (
                    <Image
                      key={img.url}
                      src={img.url}
                      alt={`${product.title} - Additional image ${index + 1}`}
                      className="rounded-full border-2 w-16 h-16 border-gray-200 hover:border-gray-700 hover:cursor-pointer"
                      width={50}
                      height={50}
                      onClick={() => setImage(img.url)}
                    />
                  ))}
                </div>
              )}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">{product.title}</Label>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">${product.price}</Label>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="destructive"
            onClick={() => handelDelete(product.id)}
          >
            Delete
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
