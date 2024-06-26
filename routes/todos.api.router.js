const router = require('express').Router()
// Para leer archivos con file system
const fs = require('fs');
// para llamar lo que hay en otro modulo
const {leerArchivo,escribirArchivo} = require('../src/files')
// Para leer el cliente de postgres
const client = require('../db/postgres');

const todoModel = require("../src/models/todoModel");

// INDEX

router.get('/todos', async (req,res) => {
    try{
        const todos = await todoModel.findAll();
        res.json(todos);
    }
    catch(error){
        res.status(500).send(error.message);
    }
})

//SHOW

router.get('/todos/:id', async (req,res)=> {
    const id = req.params.id
    //Obtener todos los "todos" de la BD
    const client = await connectClient();

    try{
        const result = await client.query(`SELECT * FROM todos WHERE id = ${id}`);
        res.render('todos/index', {todos: result.rows})
    }
    catch(error){
        res.status(500).send(error.message);
    }
    finally{
        await client.end();
    }

})

// STORE

router.post('/', async(req,res) => {
    console.log(req.body);

    try{
        const todo = await todoModel.create({title: req.body.title, completed: req.body.completed = 'on' ? true: false});
        res.redirect('/todospanel');
    }catch(error){
        res.status(500).send(error.message);
    }
})

// UPDATE

router.put('/todos/:id', async (req,res) => {
    const id = req.params.id
    //Obtener todos los "todos" de la BD
    await client.connect()
    const result = await client.query('UPDATE todos SET title = $1, completed = $2',[req.body.title, req.body.completed])
    console.log(result)
    await client.end()
    //Enviar respuesta
    res.json(result.rows)
})

//DESTROY

router.delete('/todos/:id', async (req,res) => {
    const id = req.params.id
    await client.connect()
    const result = await
    client.query(`DELETE FROM todos WHERE id = ${id}`)
    console.log(result)
    await client.end()
    res.status(201).send('Todo deleted')

})

module.exports = router