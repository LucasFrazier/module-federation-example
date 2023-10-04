import React from "react";
import ErrorBoundary from "./ErrorBoundary";
import Reviews from "./Reviews";
import "tailwindcss/tailwind.css";

export default function ReviewsContent() {
  return (
    <ErrorBoundary>
      <Reviews />
    </ErrorBoundary>
  );
}
