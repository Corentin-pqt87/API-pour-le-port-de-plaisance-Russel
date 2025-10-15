// ---serveur web---
const express = require('express');
const app = express();
const port = 8080;

// si le lien est '/' alors :
app.get('/html',(req, res) => {
    res.type('text/html');
    res.send('<h1>API pour le port de plaisance Russel</h1>');
})

// si la page n'est pas trouver
app.use( (req , res ) => {
    res.type('text/plain');
    res.status( 404 );
    res.send('404 page non trouvée');
})

app.listen(port, () => {
    console.log('Server app listening on port ' + port);
})