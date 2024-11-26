const express = require('express');
const router = express.Router();

const Usuario = require('../models/usuario');

const bcrypt = require('bcryptjs');  // <------------- criptografando a senha
const jwt = require('jsonwebtoken'); // <------------- JWT

require('dotenv').config(); //          <------------- Acessar variáveis de ambiente

const auth = require('../middlewares/auth'); // <------------- Usar camada de autenticação
//router.use(auth);    // <------------- Todos os métodos serão autenticados


router.get('/', auth, async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.post('/', async (req, res) => {
    const { nome, email, senha, ativo } = req.body;
    const senhaCrypt = await bcrypt.hash(senha, 10); // <------------- criptografando a senha
    
    const usuario = {
        nome, 
        email, 
        senha: senhaCrypt, // <------------- Auth JWT
        ativo   
    }

    try {
        await Usuario.create(usuario);
        res.status(201).json(usuario);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get('/:id', auth, async (req, res) => {
    const id = req.params.id;

    try {
        const usuario = await Usuario.findById(id); // findOne
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.patch('/:id', auth, async (req, res) => {
    try {
        const id = req.params.id;
        const { nome, usuario, senha, ativo } = req.body;

        const usu = {
            nome, usuario, senha, ativo
        }

        const updateUsu = await Usuario.updateOne({ _id: id }, usu);

        if (updateUsu.matchedCount === 0) {
            res.status(422).json({ mensagem: "Usuario não encontrado" });
            return
        }
        
        res.status(200).json(usu);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const id = req.params.id;
        const usuario = await Usuario.findById({ _id: id });

        if (!usuario) {
            res.status(422).json({ mensagem: "Usuario não encontrado" });
            return;
        }

        await Usuario.deleteOne({ _id: id });

        res.status(200).json({ mensagem: `${id} - Excluído com sucesso!` });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.post('/login', async (req, res) => {
    console.log(req.body);
    
    const { email, senha } = req.body;
    const usuario = await Usuario.find({ email: email });
    
    if (!usuario) {
        res.status(402).send('Usuário não encontrado');
    }
    
    if (await bcrypt.compare(senha, usuario[0].senha)) {
        const token = jwt.sign({ id: usuario[0].id, 
                                    nome: usuario[0].nome, 
                                    email: usuario[0].email }, 
                                process.env.JWT_PASSWORD, 
                                { expiresIn: '2d' });
        
        res.status(200).json({
            nome: usuario[0].nome,
            token: token
        });
        
    }
    else {
        res.status(401).send('Senha incorreta!');
    }
});


module.exports = router;