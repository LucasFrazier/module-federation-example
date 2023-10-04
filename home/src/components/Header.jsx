import React from "react";
import { Link } from "react-router-dom";
import MiniCart from "./MiniCart";
import Login from "./Login";
import logo from "../images/logo.svg";
import "tailwindcss/tailwind.css";

export default function Header() {
  return (
    <div className="p-5 bg-blue-500 text-white text-2xl font-bold">
      <div className="flex items-center">
        <div className="grow flex">
          <Link to="/" className="flex items-center">
            <img
              className="h-full"
              src={logo}
              alt="hand making devil horns, the symbol of rock and roll"
            />
            <span>Music Store</span>
          </Link>
        </div>
        <div className="flex-end relative">
          <Link id="pdp" to="/">
            Home
          </Link>
          <span className="mx-5">|</span>
          <Link id="pdp" to="/product/2">
            PDP
          </Link>
          <span className="mx-5">|</span>
          <Link id="cart" to="/cart">
            Cart
          </Link>
          <span className="mx-5">|</span>
          <MiniCart />
          <span className="mx-5">|</span>
          <Login />
        </div>
      </div>
    </div>
  );
}
