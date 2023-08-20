import React from 'react';
import { Outlet, Link } from "react-router-dom";

const Entry = () => (
    <>
        <h3>
            Press this button to allow the logged in twitch account to be authorized
            to read your chat and listen to commands
        </h3>
        <a target="_blank" href="https://id.twitch.tv/oauth2/authorize?force_verify=true&response_type=code&client_id=cad637fzoef5uhrhgsg9jfcd7k7e0t&redirect_uri=http://localhost:3000/token&scope=chat%3Aedit+chat%3Aread&state=c3ab8aa609ea11e793ae92361f002671" target="_blank">Authorize</a>
    </>
)

export default Entry;