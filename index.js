const http = require('http');
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const bot = require('./bot');
const db = require('./db');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/token', (req, res) => {
console.log('token query', req.query)
    try {
        (async() => {
            const res = await fetch('https://id.twitch.tv/oauth2/token', {
                method:  'post',
                body: JSON.stringify({
                    //twitch application creds
                    client_id: 'cad637fzoef5uhrhgsg9jfcd7k7e0t',
                    client_secret: '4hesvu6qfoyjkowap8dwtnk1gztqak',
                    code: req.query.code,
                    grant_type: 'authorization_code',
                    redirect_uri: 'http://localhost:3000/auth'
                }),
                headers: {'Content-Type': 'application/json'}
            });

            const data = await res.json()
            bot(data.access_token)
            console.log('data', data)
        })()
    }
    catch(e) {
        console.log(e)
    }

    res.send('bot started')
});

app.get('/auth', (req, res) => {
    console.log('auth', req)

    res.send('finished auth')
});


app.get('/card', async(req, res) => {
    console.log('getting card');

    res.send(await db.getData("/arraytest/card"))
})
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});