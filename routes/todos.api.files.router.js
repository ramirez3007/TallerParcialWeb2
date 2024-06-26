const router = require('express').Router()
// Para leer archivos con file system
const fs = require('fs');
// para llamar lo que hay en otro modulo
const {leerArchivo,escribirArchivo} = require('../src/files')

//RUTAS

// INDEX

router.get('/todos', (req,res) => {
    //Leer archivo
    const todos = leerArchivo('./db.json')
    //Enviar respuesta
    res.send(todos)
})

//SHOW

router.get('/todos/:id', (req,res)=> {
    const id = req.params.id
    const todos = leerArchivo('./db.json')
    const todo = todos.find(todo => todo.id === parseInt(id))
    //No existe
    if(todo == undefined){ // es lo mismo que colocar en la condicion if(!todo)
        res.status(404).send('No existe')
        return // actua como un break de un ciclo
    }
    //Existe
    res.send(todo)
})

// STORE

router.post('/todos', (req,res) => {
    const todo = req.body
    const todos = leerArchivo('./db.json')
    todo.id = todos.length + 1
    todos.push(todo)
    //Escribir archivo
    escribirArchivo('./db.json',todos)
    res.status(201).send(todo)
})

// UPDATE

router.put('/todos/:id', (req,res) => {
    //buscamos la tarea con el id recibido en la url
    const id = req.params.id
    const todos =  leerArchivo('./db.json')
    const todo = todos.find(todo => todo.id === parseInt(id))
    //no existe
    if(! todo){
        res.status(404).send('No existe')
        return
    }
    //Existe
    //Actualizar la tarea
    const newTodo = {...todo, ...req.body} //spread operator
    const index = todos.indexOf(todo)
    todos[index] = newTodo

    //escribir en el archivo
    escribirArchivo('./db.json', todos)
    res.send(newTodo)
})

//DESTROY

router.delete('/todos/:id', (req,res) => {
    const id = req.params.id
    const todos =  leerArchivo('./db.json')
    const todo = todos.find(todo => todo.id === parseInt(id))
    //no existe
    if(! todo){
        res.status(404).send('No existe')
        return
    }
    //si existe

    const index = todos.indexOf(todo)
    todos.splice(index, 1)

    //Escribir archivo
    escribirArchivo('./db.json', todos)
    res.send(todo)
})

module.exports = router