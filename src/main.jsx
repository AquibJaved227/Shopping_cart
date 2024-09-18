import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App';
import Homepage from "./Components.jsx/Homepage";
import Products from "./Components.jsx/Products"; // New component for displaying products

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "Homepage",
    element: <Homepage />,
    children: [
      {
        path: "category/:categoryName",
        element: <Products /> // Display products for the selected category
      }
    ]
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
