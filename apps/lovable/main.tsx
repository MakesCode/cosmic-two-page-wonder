import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { createRouter } from "@lovable/router";

const router = createRouter();

createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />);
