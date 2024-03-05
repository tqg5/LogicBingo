import React, { useState, useEffect } from 'react';

const Config = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        (async() => {
            setData( await fetch('api/card'));

            debugger
        })();
    }, []);

    return (
        <div>
            {data}
        </div>
    )
}

export default Config;