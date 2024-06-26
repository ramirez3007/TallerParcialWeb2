const router = require('express').Router();
// Para leer el cliente de postgres
const connectClient = require('../db/postgres');

const sequelize = require('../db/sequelize');

const Todo  = require("../src/models/todoModel");

// Index
router.get("/", async (req, res) => {
    try {
        const todos = await Todo.findAll();
        res.render('todos/index', { todos: todos });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Ruta para renderizar la vista de edición
router.get("/editar/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findByPk(id);
        if (todo) {
            res.render('todos/editar', { todo });
        } else {
            res.status(404).send("Tarea no encontrada");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Store (Create)
router.post("/", async (req, res) => {
    try {
        const { title, completed } = req.body;
        await Todo.create({ title, completed: completed === 'on' ? true : false });
        res.redirect('todospanel');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Ruta para actualizar una tarea
router.post("/:id", async (req, res) => { 
    try {
        const { id } = req.params;
        const { title, completed } = req.body;
        const todo = await Todo.findByPk(id);
        if (todo) {
            await todo.update({
                title,
                completed: completed === 'on' ? true : false
            });
            res.redirect('/api/v1/todospanel'); // Redirige al panel de tareas
        } else {
            res.status(404).send("Tarea no encontrada");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Ruta para eliminar una tarea
router.post("/:id/delete", async (req, res) => { // Cambiado de DELETE a POST
    try {
        const { id } = req.params;
        const todo = await Todo.findByPk(id);
        if (todo) {
            await todo.destroy();
            res.redirect('/api/v1/todospanel'); // Redirige al panel de tareas después de la eliminación
        } else {
            res.status(404).send("Tarea no encontrada");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;


