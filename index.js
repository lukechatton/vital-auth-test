var OAuthClient = require('client-oauth2');
var express = require('express');

var app = express();

var auth = new OAuthClient({
    clientId: 'vital',
    clientSecret: 'vitalrocks',
    accessTokenUri: 'https://account-public-service-prod03.ol.epicgames.com/account/api/oauth/token',
    authorizationUri: 'https://accounts.epicgames.com/login',
    redirectUri: 'https://flame.gg',
    scopes: ['fortnite']
});

app.get('/auth', (req, res) => {
    var uri = auth.code.getUri();

    res.redirect(uri);
});

app.get('/auth/callback', (req, res) => {
    auth.code.getToken(req.originalUrl)
        .then(user => {
            console.log(user);

            user.refresh().then(updatedUser => {
                console.log(updatedUser !== user) //=> true
                console.log(updatedUser.accessToken)
            });

            return res.send(user);
        })
        .catch(err => {
            console.log(err);
        })
})

app.listen(3000);
console.log('Listening on port 3000.');