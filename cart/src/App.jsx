import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createRoot } from "react-dom/client";

import "remixicon/fonts/remixicon.css";

import "./index.scss";

import Header from "home/Header";
import Footer from "home/Footer";
import CartContent from "./CartContent";

const App = () => (
  <Router>
    <div className="mx-auto max-w-8xl">
      <Header />
      <div className="m-10">
        <CartContent />
      </div>
      <Footer />
    </div>
  </Router>
);

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);
