import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createHashRouter } from "react-router";

import { App } from "./App";
import { BallsGamePage, HomePage, MatchesGamePage, RulesPage } from "./modules";

const router = createHashRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/balls",
        element: <BallsGamePage />,
      },
      {
        path: "/matches",
        element: <MatchesGamePage />,
      },
      {
        path: "/rules",
        element: <RulesPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
