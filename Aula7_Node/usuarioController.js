const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.json({mensagem:'lista de usuarios'});
});

router.get('/:id', (req, res) => {
    return res.json({mensagem:'Pegou usuario pelo id '+req.params.id});
});

module.exports = router;