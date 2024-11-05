const express = require('express');
const router = express.Router();

const Aluno = require('../models/aluno');
const Disciplina = require('../models/disciplina');

router.get('/', async (req, res) => {
    try {
        const alunos = await Aluno.find().populate('fk_idDisciplina');
        res.json(alunos);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao buscar alunos", erro: error.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const aluno = await Aluno.findOne({ _id: id }).populate('fk_idDisciplina');

        if (!aluno) {
            res.status(422).json({ mensagem: "Aluno não encontrado" });
            return;
        }

        res.status(200).json(aluno);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    const { nome, idade, ra, fk_idDisciplina } = req.body;

    try {

        const aluno = {
            nome,
            idade,
            ra,
            fk_idDisciplina
        }

        await Aluno.create(aluno);

        res.status(201).json(aluno);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao criar aluno", erro: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateFields = req.body;

        const updatedAluno = await Aluno.findByIdAndUpdate(id, updateFields, { new: true });

        if (!updatedAluno) {
            return res.status(422).json({ mensagem: "Aluno não encontrada" });
        }

        res.status(200).json(updatedAluno);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao atualizar Aluno", erro: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const aluno = await Aluno.findByIdAndDelete(req.params.id);
        
        if (!aluno) {
            return res.status(422).json({ mensagem: "aluno não encontrado" });
        }

        res.status(200).json({ mensagem: "Excluído com sucesso!" });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao excluir aluno", erro: error.message });
    }
});

module.exports = router;


