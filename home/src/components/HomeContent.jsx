import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "home/state";
import { currency } from "../logic";

export default function HomeContent() {
  const { products, addToCart } = useStore();

  return (
    <div className="grid grid-cols-4 gap-5">
      {products.map((product) => (
        <div key={product.id}>
          <Link to={`/product/${product.id}`}>
            <img className="mx-auto" src={product.image} alt={product.name} />
          </Link>
          <div className="font-bold text-lg">
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </div>
          <div className="text-base">{currency.format(product.price)}</div>
          <div className="text-sm mt-4">{product.description}</div>
          <div className="mt-2">
            <button
              className="bg-black hover:bg-blue-700 text-white text-sm font-bold py-2 px-4"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
