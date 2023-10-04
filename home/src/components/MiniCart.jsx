import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { currency, fireRefreshCart } from "home/logic";
import { useStore } from "../state";

export default function MiniCart() {
  const { cart, clearCart, loggedIn, refreshCart, jwt } = useStore();
  const [showCart, setShowCart] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowCart(false);
      }
    };

    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    fireRefreshCart(loggedIn, refreshCart, jwt);
  }, [showCart]);

  return (
    <>
      <span onClick={() => setShowCart(!showCart)} id="showcart_span">
        <i className="ri-shopping-cart-2-fill text-2xl" id="showcart"></i>
        {cart.items.length}
      </span>
      {showCart && (
        <>
          <div
            ref={ref}
            className="absolute p-5 border-4 border-blue-500 bg-white text-black"
            style={{
              width: 305,
              top: 52,
              left: 131.5,
            }}
          >
            {cart.items.length == 0 ? (
              <div className="text-2xl">There are no items in your cart.</div>
            ) : (
              <>
                <div
                  className="grid gap-3 text-sm"
                  style={{
                    gridTemplateColumns: "1fr 3fr 10fr 2fr",
                  }}
                >
                  {cart.items.map((item) => (
                    <React.Fragment key={item.id}>
                      <div>{item.quantity}</div>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="max-h-6"
                      />
                      <div>{item.name}</div>
                      <div className="text-right">
                        {currency.format(item.quantity * item.price)}
                      </div>
                    </React.Fragment>
                  ))}
                  <div></div>
                  <div></div>
                  <div></div>
                  <div>
                    {currency.format(
                      cart.items.reduce((a, v) => a + v.quantity * v.price, 0)
                    )}
                  </div>
                </div>
                <div className="flex">
                  <div className="grow">
                    <button
                      id="clearcart"
                      className="bg-white border border-green-800 text-green-800 py-2 px-5 text-sm font-bold"
                      onClick={clearCart}
                    >
                      Clear Cart
                    </button>
                  </div>
                  <div className="flex-end">
                    <Link to="/cart">
                      <button
                        className="bg-black text-white py-2 px-5 text-sm font-bold"
                        onClick={() => setShowCart(false)}
                      >
                        Checkout
                      </button>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
