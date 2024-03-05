import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Entry from './entry';
import Card from './card';
import Config from './config';

window.addEventListener("load", (event) => {
    const router = createBrowserRouter([
        {
            path: "/bingo",
            element: <Entry />
        },
        {
          path: "bingo/config",
          element: <Config />
      },
        {
          path: "/bingo/card",
                    element: <Card />
        }
      ]);
    
    
    ReactDOM.createRoot(document.getElementById("app")).render(
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );
});