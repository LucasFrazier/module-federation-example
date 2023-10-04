import React from "react";

import PDPContent from "./PDPContent";
import ErrorBoundary from "./ErrorBoundary";

const routes = [
  {
    path: "/:id",
    element: (
      <ErrorBoundary>
        <PDPContent />
      </ErrorBoundary>
    ),
  },
];

export default routes;
