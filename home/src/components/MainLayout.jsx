import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "home/Header";
import Footer from "home/Footer";
import HomeContent from "home/HomeContent";
import pdpRoutes from "pdp/routes"; // <PDPContent /> is imported here
import PDPContent from "pdp/PDPContent";
import CartContent from "cart/CartContent";
import ErrorBoundary from "./ErrorBoundary";
import "../index.scss";
import "remixicon/fonts/remixicon.css";

export default function MainLayout() {
  return (
    <Router>
      <div className="text-3xl mx-auto max-w-8xl border-4 border-blue-500">
        <Header />
        <div className="m-10">
          <ErrorBoundary>
            <Routes>
              <Route exact path="/" element={<HomeContent />} />
              <Route path="/cart" element={<CartContent />} />
              {pdpRoutes.length === 0 ? (
                <Route path="/product/:id" element={<PDPContent />} />
              ) : (
                pdpRoutes.map((route) => (
                  <Route
                    key={`/product${route.path}`}
                    path={`/product${route.path}`}
                    element={route.element}
                  />
                ))
              )}
            </Routes>
          </ErrorBoundary>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
