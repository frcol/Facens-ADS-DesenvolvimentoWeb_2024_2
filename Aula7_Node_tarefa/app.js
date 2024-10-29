const express = require('express');
const app = express();
const { randomUUID } = require('crypto');

app.use(express.json());

const pessoas = [
    { id: 1, nome: 'João', celular: '99999-9999' },
    { id: 2, nome: 'Maria', celular: '88888-8888' },
    { id: 3, nome: 'José', celular: '77777-7777' }
];


//=========================================================================
// ROTAS

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/pessoas', (req, res) => {
    res.json(pessoas);
});

app.get('/pessoas/:id', (req, res) => {
    let { id } = req.params;

    let pessoa = pessoas.find(p => p.id == id);
    
    if (pessoa == undefined) {
        res.status(404).json({ message: 'Pessoa não encontrada' });
    }

    res.json(pessoa);
});

app.post('/pessoa', (req, res) => {
    const {nome, celular} = req.body;

    const pessoa = {
        id: randomUUID(),
        nome: nome,
        celular: celular
    };

    pessoas.push(pessoa);

    res.json(pessoa);
});

app.put('/pessoa/:id', (req, res) => {
    const { id } = req.params;
    const { nome, celular } = req.body;
    
    const index = pessoas.findIndex(p => p.id == id);

    if (index === -1) {
        return res.status(404).json({ message: 'Pessoa não encontrada' });
    }

    pessoas[index].nome = nome;
    pessoas[index].celular = celular;

    res.json(pessoas[index]);
});

app.delete('/pessoa/:id', (req, res) => {
    const { id } = req.params;

    const index = pessoas.findIndex(p => p.id == id);

    if (index === -1) {
        return res.status(404).json({ message: 'Pessoa não encontrada' });
    }

    pessoas.splice(index, 1);

    res.json({ message: `Pessoa com id ${id} removida com sucesso` });
});

//=========================================================================
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
