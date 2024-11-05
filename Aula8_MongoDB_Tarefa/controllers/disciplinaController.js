const express = require('express');
const router = express.Router();

const Disciplina = require('../models/disciplina');
const Aluno = require('../models/aluno');

router.get('/', async (req, res) => {
    try {
        const disciplinas = await Disciplina.find();
        res.json(disciplinas);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const disciplinaId = req.params.id;

        // Busca a disciplina e popula os dados dos alunos associados
        const disciplinaComAlunos = await Disciplina.findById(disciplinaId);

        if (!disciplinaComAlunos) {
            return res.status(404).json({ mensagem: "Disciplina não encontrada" });
        }

        const alunos = await Aluno.find({ fk_idDisciplina: disciplinaId });

        res.status(200).json({disciplinaComAlunos, alunos});
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao buscar disciplina e alunos", erro: error.message });
    }
});




router.post('/', async (req, res) => {
    const {nome, cargaHoraria, sala, fk_idAluno} = req.body;
    
    const disciplina = {
        nome,
        cargaHoraria,
        sala,
        fk_idAluno
    }

    try {
        await Disciplina.create(disciplina);
        res.status(201).json(disciplina);
    } catch(error) {
        res.status(500).json(error.message);
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateFields = req.body;

        const updatedDisciplina = await Disciplina.findByIdAndUpdate(id, updateFields, { new: true });

        if (!updatedDisciplina) {
            return res.status(422).json({ mensagem: "Disciplina não encontrada" });
        }

        res.status(200).json(updatedDisciplina);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao atualizar Disciplina", erro: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Aluno.deleteMany({ fk_idDisciplina: id });  

        const disciplina = await Disciplina.findByIdAndDelete(req.params.id);
        
        if (!disciplina) {
            return res.status(422).json({ mensagem: "disciplina não encontrado" });
        }

        res.status(200).json({ mensagem: "Excluído com sucesso!" });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao excluir disciplina", erro: error.message });
    }
});



module.exports = router;