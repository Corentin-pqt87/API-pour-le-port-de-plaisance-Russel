const express = require('express');
const app = express();
const userService = require('./services/users');

app.use(express.json());

// route login
app.post('/login', userService.authenticate);

// page d'accueil
app.get('/html', (req, res) => {
    res.type('text/html');
    res.send('<h1>API pour le port de plaisance Russel</h1>');
});

// si la page n'est pas trouvée
app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 page non trouvée');
});

module.exports = app;