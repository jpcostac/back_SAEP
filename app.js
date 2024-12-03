const express = require('express');
const database = require("./src/database")
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())

app.get('/usuario', (req, res) => {
    database.query('SELECT * FROM usuario', (err, result) => {
        if (err) {
            return res.status(500).json(err)
        }

        if(result.length > 0) {
            return res.status(200).json(result)
        }
        
        return res.status(200).json({message: 'Nenhum usuario cadastrado!'})
        
    })
})

app.post('/usuario', (req, res) => {
    let nome = req.body.nome
    let email = req.body.email

    if (!nome ||!email) {
        return res.status(400).json({message: 'Todos os dados são obrigatórios'})
    }

    database.query('INSERT INTO usuario(nome, email) VALUES (?, ?)', [nome, email], (err, result) => {
        if(err){
            return res.status(500).json(err)
        }

        return res.status(201).json({message: 'Usuario cadastrado com sucesso!', usuario: result.insertId})
    })

})

app.delete('/usuario/:id', (req, res) => {
    let id = req.params.id

    database.query('DELETE FROM usuario WHERE id = ?', [id], (err, result) => {
        if(err){
            return res.status(500).json(err)
        }

        if(result.affectedRows > 0){
            return res.status(200).json({message: 'Usuario deletado com sucesso!'})
        }

        return res.status(404).json({message: 'Usuario não encontrado!'})

    })
})

app.put('/Usuario/:id', (req, res) => {
    let id = req.params.id
    let nome = req.body.nome
    let email = req.body.email

    database.query('UPDATE Usuario SET nome=?, email=? WHERE id=?', [nome, email, id], (err, result) => {
        if(err){
            return res.status(500).json(err)
        }

        if(result.affectedRows > 0){
            return res.status(200).json({message: 'Usuario atualizada com sucesso!'})
        }
        
        return res.status(404).json({message: 'Usuario não encontrada!'})
    })
})

//Rotas das tarefas
app.get('/tarefas', (req, res) => {
    database.query('SELECT * FROM tarefas', (err, result) => {
        if (err) {
            return res.status(500).json(err)
        }

        if(result.length > 0){
            return res.status(200).json(result)
        }

        return res.status(200).json({message: 'Nenhuma tarefa cadastrada!'})
    })
})

//POST
app.post('/tarefas', (req, res) => {
    let idUsuario = req.body.idUsuario
    let descricao = req.body.descricao
    let setor = req.body.setor
    let prioridade = req.body.prioridade
    let data_cadastro = req.body.data_cadastro
    let status = req.body.status

    if (!idUsuario ||!descricao ||!setor ||!prioridade ||!status) {
        return res.status(400).json({message: 'Todos os dados são obrigatórios'})
    }

    database.query('INSERT INTO tarefas(idUsuario, descricao, setor, prioridade, data_cadastro, status) VALUES(?, ?, ?, ?, ?, ?)', [idUsuario, descricao, setor, prioridade, data_cadastro, status], (err, result) => {
        if(err){
            return res.status(500).json(err)
        }

        return res.status(201).json({message: 'Tarefa cadastrada com sucesso!', tarefas: result.insertId})
    })
})

app.delete('/tarefas/:id', (req, res) => {
    let id = req.params.id

    database.query('DELETE FROM tarefas WHERE id =?', [id], (err, result) => {
        if(err){
            return res.status(500).json(err)
        }

        if(result.affectedRows > 0){
            return res.status(200).json({message: 'Tarefa deletada com sucesso!'})
        }

        return res.status(404).json({message: 'Tarefa não encontrada!'})
    })
})

//UPDATE
app.put('/tarefas/:id', (req, res) => {
    let id = req.params.id
    let descricao = req.body.descricao
    let setor = req.body.setor
    let prioridade = req.body.prioridade
    let data_cadastro = req.body.data_cadastro
    let status = req.body.status

    if (!descricao ||!setor ||!prioridade ||!status) {
        return res.status(400).json({message: 'Todos os dados são obrigatórios'})
    }

    database.query('UPDATE tarefas SET descricao=?, setor=?, prioridade=?, data_cadastro=?, status=? WHERE id=?', [descricao, setor, prioridade, data_cadastro, status, id], (err, result) => {
        if(err){
            return res.status(500).json(err)
        }

        if(result.affectedRows > 0){
            return res.status(200).json({message: 'Tarefa atualizada com sucesso!'})
        }

        return res.status(404).json({message: 'Tarefa não encontrada!'})
    })
})


app.listen(3000, () => console.log(`Servidor rodando na porta ${3000}.`))