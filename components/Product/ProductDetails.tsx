/* import AddToCart from "./AddToCart"; */

type ProductDetailsProps = {
  title: string;
  desc: string;
  price: number;
  off?: string;
  orig_price: number;
  img: string;
};

const ProductDetails = ({
  title,
  desc,
  price,
  off,
  orig_price,
  img,
}: ProductDetailsProps) => {
  return (
    <section className="grid gap-4 p-4 md:py-16 md:px-7">
      <span className=" text-orange font-bold uppercase text-xs tracking-wider">
        Sneaker Company
      </span>
      <h1 className=" text-3xl font-bold md:text-5xl">{title}</h1>
      <p className=" text-darkGrayishBlue md:text-lg">{desc}</p>
      <div className="font-bold flex justify-between md:flex-col">
        <p className="flex gap-3 text-2xl items-center md:text-3xl">
          ${price}.00
          <span className="text-base text-orange bg-paleOrange px-1.5 rounded-md">
            {off}
          </span>
        </p>
        <span className="text-grayishBlue line-through">${orig_price}.00</span>
      </div>
      {/*  <AddToCart price={price} title={title} img={img} /> */}
    </section>
  );
};

export default ProductDetails;
