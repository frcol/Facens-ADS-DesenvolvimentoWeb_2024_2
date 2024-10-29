const express = require('express');
const app = express();

app.use(express.json());

const usuarioController = require('./controllers/usuarioController');
app.use('/usuarios', usuarioController);

app.listen(3000, () => { 
    console.log('Server running on port 3000');
});