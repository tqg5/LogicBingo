import React from 'react';
import ReactDOM from 'react-dom/client';
import Entry from './entry';

window.addEventListener("load", (event) => {
    ReactDOM.createRoot(document.getElementById("app")).render(
        <React.StrictMode>
            <Entry />
        </React.StrictMode>
    );
});

export default Entry;