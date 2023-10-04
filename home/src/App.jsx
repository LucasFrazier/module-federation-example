import React from "react";
import { createRoot } from "react-dom/client";
import "remixicon/fonts/remixicon.css";
import MainLayout from "./components/MainLayout";
import "./index.scss";

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<MainLayout />);
