import React, { useState, useEffect } from 'react';

const Card = () => {
    const [card, setCard] = useState(null);

    useEffect(() => {
        (async() => {
            const data = await fetch('api/card');

            debugger
        })();
    }, []);

    return (
        {card}
    )
}

export default Card;