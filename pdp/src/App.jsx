import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import routes from "./routes";
import Header from "home/Header";
import Footer from "home/Footer";
import "./index.scss";
import "remixicon/fonts/remixicon.css";

const App = () => (
  <Router>
    <div className="text-3xl mx-auto max-w-8xl">
      <Header />
      <div className="m-10">
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div>
      <Footer />
    </div>
  </Router>
);

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);
