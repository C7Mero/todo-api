import express from 'express';
import { TodoService } from '../services/TodoService';

export const todoController = express.Router();

todoController.get('/', async (req, res) => {
    try {
        const todos = await TodoService.getTodos();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch todos' });
    }
});
todoController.post('/add', async (req, res) => {
    try {
        const { name } = req.body;
        const addTodo = await TodoService.addTodo(name);
        res.json(addTodo);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});
todoController.put('/:id', async (req, res) => {
    try {
        const { name, isDone, status } = req.body;
        const id = req.params.id;
        const editTodo = await TodoService.editTodo(name, isDone, status, id);
        res.json(editTodo);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});
todoController.delete(':id', async (req, res) => {
    try {
        const id = req.params.id;
        await TodoService.deleteTodo(id);
        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

