import React from "react";
import ProductImage from "./ProductImage";
import ProductDetails from "./ProductDetails";
import Lightbox from "../Lightbox";

const Product = () => {
  return (
    <div className="md:grid md:grid-cols-2 md:my-20 md:gap-16">
      <ProductImage />
      <ProductDetails
        title="Fall Limited Edition Sneakers"
        desc="These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer."
        off="50%"
        price={125}
        orig_price={250}
        img={"/images/1.jpg"}
      />
    </div>
  );
};

export default Product;
