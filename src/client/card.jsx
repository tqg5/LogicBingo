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
        <div>
            Show card info
        {card}
        </div>
    )
}

export default Card;