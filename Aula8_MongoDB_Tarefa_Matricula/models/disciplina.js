const mongoose = require('mongoose');

const Disciplina = mongoose.model('Disciplina', {
    nome: String,
    cargaHoraria: Number,
    sala: String,
    fk_idAluno: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Disciplina' 
    }]
});

module.exports = Disciplina;