const express = require('express')
const todosFilesRouter = require('./todos.api.files.router')
const todosApiRouter = require('./todos.api.router')
const todosRouter = require('./todos.router')


function routerTodos(app){
    const router = express.Router()

    app.use('/api/v1',router)

    router.use('/todospanel', todosRouter)
    router.use('/files', todosFilesRouter)
    router.use('', todosApiRouter)
}

module.exports = routerTodos