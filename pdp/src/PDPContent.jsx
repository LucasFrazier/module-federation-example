import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "home/state";
import { currency } from "home/logic";
import ReviewsContent from "reviews/ReviewsContent";
import "tailwindcss/tailwind.css";

export default function PDPContent() {
  const { id } = useParams();
  const { products, addToCart } = useStore();
  const [product, setProduct] = useState();

  useEffect(() => {
    setProduct(products.find((item) => item.id == id));
  }, []);

  return (
    <>
      {product && (
        <>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <img
                className="h-1/2 mx-auto"
                src={product.image}
                alt={product.name}
              />
            </div>
            <div>
              <div className="flex">
                <h1 className="font-bold text-3xl grow">{product.name}</h1>
                <div className="font-bold text-3xl flex-end">
                  {currency.format(product.price)}
                </div>
              </div>
              <button
                className="bg-black hover:bg-blue-700 text-white text-sm font-bold py-3 px-14 mt-4"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
              <div className="mt-10">{product.description}</div>
              <div className="mt-10">{product.longDescription}</div>
            </div>
          </div>
          <ReviewsContent />
        </>
      )}
    </>
  );
}
