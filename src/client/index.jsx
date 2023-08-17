import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Entry from './entry';

window.addEventListener("load", (event) => {
    debugger
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Entry />
        }
    ]);
    
    ReactDOM.createRoot(document.getElementById("app")).render(
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );
});