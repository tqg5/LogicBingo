import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Entry from './entry';
import Card from './card';

window.addEventListener("load", (event) => {
    debugger
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Entry />
        },
        {
            path: "/card",
            element: <Card />
        }
    ]);
    
    ReactDOM.createRoot(document.getElementById("app")).render(
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );
});