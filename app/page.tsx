"use client";
import Image from "next/image";
import img1 from "../public/background-1.jpg";
import img2 from "../public/background-2.jpg"; // Add your second image
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      text: "Fashion Week",
      img: img1,
      description: "Some introductory text goes here.",
    },
    {
      text: "The Next One",
      img: img2,
      description: "Next introductory text goes here.",
    },
  ];

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-900 overflow-y-scroll overflow-x-hidden relative ">
      <div
        className="relative w-full h-full flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative w-full flex-shrink-0 h-full">
            <Image
              src={slide.img}
              alt="Background"
              layout="fill"
              objectFit="cover"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>{" "}
            {/* Black backdrop */}
            <div className="absolute top-40 left-20 p-4">
              <h1 className="text-white text-7xl font-extrabold">
                {slide.text}
              </h1>
              <p className="text-white mt-2">{slide.description}</p>
              <Button className="mt-10 bg-white text-black rounded-none hover:bg-white hover:text-green-500">
                Shop Now
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute top-[85%] right-20 transform -translate-y-1/2 z-10 flex space-x-2">
        <Button
          onClick={handlePrev}
          className="rounded-full bg-white text-black px-4 py-2 w-16 h-16  hover:bg-white hover:text-green-500"
        >
          <FaArrowLeft />
        </Button>
        <Button
          onClick={handleNext}
          className="rounded-full bg-white text-black px-4 py-2 w-16 h-16  hover:bg-white hover:text-green-500"
        >
          <FaArrowRight />
        </Button>
      </div>
    </div>
  );
}
