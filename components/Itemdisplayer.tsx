"use client";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "./ui/label";
import { Product } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { deleteItem } from "@/lib/productsAction/proAction";

type ExcludedProduct = Omit<Product, "clerkId">;

interface ItemDisplayerProps {
  product: ExcludedProduct;
}

export default function Itemdisplayer({ product }: ItemDisplayerProps) {
  const [image, setImage] = useState(product?.images[0].url);
  const [deleteInProgress, setDeleteInProgress] = useState(false);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    setDeleteInProgress(true);
    try {
      const response = await deleteItem(id);
      if (response?.status === 500)
        throw Error("status code " + response.error);
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
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card className="relative w-[350px] rounded-xl shadow-lg overflow-hidden bg-white ">
        {product.isDiscount && (
          <span className="z-20 absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-br-lg">
            On Sale
          </span>
        )}
        <CardHeader className="relative pt-[100%]">
          <Image
            src={image}
            alt={product.title}
            fill
            className="absolute top-0 left-0 object-cover rounded-t-xl"
            quality={100}
            priority
            sizes="(max-width: 700px) 100vw, 700px"
            blurDataURL="/load.jpg"
            placeholder="blur"
          />
        </CardHeader>
        <CardContent className="p-4">
          {product.images.length > 1 && (
            <div className="my-4 flex gap-2 justify-center">
              {product.images.map((img, index) => (
                <Image
                  key={img.url}
                  src={img.url}
                  alt={`${product.title} - Additional image ${index + 1}`}
                  className="rounded-full border-2 w-14 h-14 border-gray-200 hover:border-gray-700 cursor-pointer transition-all duration-300"
                  width={50}
                  height={50}
                  onClick={() => setImage(img.url)}
                  priority
                />
              ))}
            </div>
          )}
          <h2 className="text-lg font-bold text-gray-800 mb-2">
            {product.title}
          </h2>
          {product.isDiscount ? (
            <div className="flex flex-col space-y-2  p-3 rounded-lg shadow-inner">
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
            <div className="flex items-center bg-gray-100 p-3 rounded-lg shadow-inner">
              <Label
                htmlFor="framework"
                className="text-sm font-semibold text-gray-800"
              >
                Price: ${product.price.toFixed(2)}
              </Label>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between items-center p-4 bg-gray-100 rounded-b-xl">
          <Button
            variant="destructive"
            onClick={() => handleDelete(product.id)}
            className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition duration-300"
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
