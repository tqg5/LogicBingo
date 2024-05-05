import React, { useState, useEffect } from 'react';

const twitch = window.Twitch.ext;
const boardSize = 9;
const savedIndexesSet = new Set();

twitch.configuration.onChanged(function() {
    if (twitch.configuration.broadcaster) {
        var config = JSON.parse(twitch.configuration.broadcaster.content);
        console.log('parsed config', config)
        createBoard();

    }
});

// onAuthorized callback called each time JWT is fired
twitch.onAuthorized((auth) => {
    // save our credentials
    console.log('auth', auth) 
    fetch(`https://api.twitch.tv/helix/users?id=${auth.userId}`, {
        method: 'GET',
        headers: { "Authorization": 'Bearer ' + auth.token },
    })
    .then(res => res.json())
    .then(res => console.log(res))

  });

  twitch.onContext(context => {
    
  })


const createBoard = () => {
    var { options } = JSON.parse(twitch.configuration.broadcaster.content);

    let count = 0;

    while(count < boardSize) {
        const val = options[Math.floor(Math.random() * (( boardSize-0 ) + 1 ) + 0)];

        if(savedIndexesSet.has(val)) {
            continue
        }
        else {
            savedIndexesSet.add(val)
            count++;
        }
    }

    console.log('savedIndexes', savedIndexesSet)
}

const printTable = options => {
    const rows = [];
    let cells = []
    
    options.forEach((option, idx) => {
        cells.push(
            <td style={{border: '1px solid red'}}>
                {option}
            </td>
        )

        if((idx + 1) % 3 === 0) {
            rows.push(<tr style={{ textAlign: 'center' }}>{cells}</tr>);
            cells = [];
        }

        console.log('idx', (idx + 1))
console.log((idx + 1) % 3)
        
    })

    return (
        <table style={{borderCollapse: 'collapse', height: '100%'}}>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
}

const Entry = () => {
    const [ bingoOptions, setBingoOptions ] = useState(null);
    
    useEffect(() => {
        savedIndexesSet.size && setBingoOptions(savedIndexesSet);
    }, [ savedIndexesSet ])


    if(!bingoOptions) return;

    return printTable([...bingoOptions]);
}

export default Entry;