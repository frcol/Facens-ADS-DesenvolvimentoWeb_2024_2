const express = require('express');
const router = express.Router();
const Matricula = require('../models/matricula');
const Aluno = require('../models/aluno');
const Disciplina = require('../models/disciplina');

// Rota para matricular aluno em várias disciplinas
router.post('/', async (req, res) => {
    const { alunoId, disciplinasIds } = req.body;

    try {
        // Atualiza o array de disciplinas no Aluno
        await Aluno.findByIdAndUpdate(alunoId, { $addToSet: { fk_idDisciplina: { $each: disciplinasIds } } });

        // Atualiza o array de alunos em cada Disciplina
        await Disciplina.updateMany(
            { _id: { $in: disciplinasIds } },
            { $addToSet: { fk_idAluno: alunoId } }
        );

        // Cria documentos de Matricula para dados adicionais
        const matriculas = disciplinasIds.map(disciplinaId => ({
            aluno: alunoId,
            disciplina: disciplinaId
        }));

        await Matricula.insertMany(matriculas);
        res.status(200).json(matriculas);
    } catch (error) {
        console.error(error);
        res.status(500).json({mensagem: 'Erro ao matricular o aluno nas disciplinas', error: error.message});
    }
});

module.exports = router;