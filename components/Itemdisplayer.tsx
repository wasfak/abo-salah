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
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

type ExcludedProduct = Omit<Product, "clerkId">;

interface ItemDisplayerProps {
  product: ExcludedProduct;
}

export default function Itemdisplayer({ product }: ItemDisplayerProps) {
  const [image, setImage] = useState(product?.images[0].url);
  const [deleteInProgress, setDeleteInProgress] = useState(false);
  const router = useRouter();

  const handelDelete = async (id: string) => {
    setDeleteInProgress(true);
    try {
      const response = await fetch("/api/product", {
        method: "DELETE",
        body: JSON.stringify({ id: product?.id }),
      });
      if (!response.ok) throw Error("status code " + response.status);
      toast.success("Item has been deleted successfully..", {});
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteInProgress(false);
    }
  };
  const originalPrice = product.price;
  let finalPrice = originalPrice;

  if (product.isDiscount) {
    if (product.discountType === "PERCENTAGE") {
      finalPrice =
        originalPrice - originalPrice * (product.discountValue! / 100);
    } else if (product.discountType === "FIXED") {
      finalPrice = originalPrice - product.discountValue!;
    }
  }

  return (
    <div>
      <Card className="w-[350px] relative">
        {product.isDiscount && (
          <span className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-br-lg">
            On Sale
          </span>
        )}
        <CardHeader className="w-full relative pt-[80%]">
          <Image
            src={image}
            alt={product.title}
            objectFit="contain"
            fill
            className="w-full h-full top-0 left-0 border-b-2"
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
              <div>
                {product.isDiscount ? (
                  <div className="flex flex-col space-y-2 bg-gray-100 p-3 rounded-lg shadow-md">
                    <span className="text-sm font-semibold text-red-600">
                      Original Price: ${originalPrice.toFixed(2)}
                    </span>
                    <span className="text-sm font-semibold text-green-600">
                      Discounted Price: ${finalPrice.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500">
                      You save: ${(originalPrice - finalPrice).toFixed(2)} (
                      {product.discountType === "PERCENTAGE"
                        ? `${product.discountValue}%`
                        : `$${product.discountValue}`}
                      )
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center bg-gray-100 p-3 rounded-lg shadow-md">
                    <Label
                      htmlFor="framework"
                      className="text-sm font-semibold text-gray-800"
                    >
                      Price: ${product.price}
                    </Label>
                  </div>
                )}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="destructive"
            onClick={() => handelDelete(product.id)}
          >
            {deleteInProgress ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Delete"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
