const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

const disciplinaController = require('./controllers/disciplinaController');
const alunoController = require('./controllers/alunoController');
app.use('/disciplina', disciplinaController);
app.use('/aluno', alunoController);

// =============================================
mongoose.connect('mongodb://127.0.0.1:27017/aula10_tarefa')
    .then(() => {
        app.listen(27017, () => {
            console.log('Conectado ao mongoDB');
            console.log('Servidor iniciado na porta 27017');
        })
    })
    .catch((err) => {
        console.log(err);
    });


// =============================================
app.listen(3000, () => {
  console.log('Aplicação ouvindo na porta 3000');
});