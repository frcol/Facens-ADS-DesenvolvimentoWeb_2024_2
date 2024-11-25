const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.json());

const mongoose = require('mongoose');
//const { MongoClient, ServerApiVersion } = require('mongodb');

const usuarioController = require('./controllers/usuarioController');
app.use('/usuarios', usuarioController);

require('dotenv').config();
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD



const url = 'mongodb://127.0.0.1:27017/aula_12';
//const url = "mongodb+srv://"+DB_USER+":"+DB_PASSWORD+"@frcol.isbucyt.mongodb.net/?retryWrites=true&w=majority&appName=frcol";
console.log(url);

app.get('/', (req, res) => {
    res.send('Hello World');
});


// ============================================
mongoose.connect(url)
    .then(() => {
        app.listen(27017, () => {
            console.log('Conectado ao mongoDB');
            console.log('Servidor MongoDB iniciado');
        })
    })
    .catch((err) => {
        console.log(err);
    });

// ============================================
app.listen(3000, () => {
    console.log('Server NodeJS is running on http://localhost:3000');
    });
