const mongoose = require('mongoose');

const Matricula = mongoose.model('Matricula', {
  aluno: { type: mongoose.Schema.Types.ObjectId, ref: 'Aluno', required: true },
  disciplina: { type: mongoose.Schema.Types.ObjectId, ref: 'Disciplina', required: true },
  dataMatricula: { type: Date, default: Date.now },
  status: { type: String, default: "ativo" }
});

module.exports = Matricula;
