const express = require('express');
const usuarioController = require('./usuarioController');

const app = express();

app.use(express.json());
app.use('/usuario', usuarioController);

// Start server
app.listen(3000, () => console.log('Server is running on port 3000'));