import React from 'react';
import ReactDOM from 'react-dom/client';
import List from './list';

window.addEventListener("load", (event) => {
    ReactDOM.createRoot(document.getElementById("app")).render(
        <React.StrictMode>
            <List />
        </React.StrictMode>
    );
});