import express from 'express';
import { TodoService } from '../services/TodoService';
import { controllErrorResponse } from '../utils/controllerErrorResponse';

export const todoController = express.Router();

todoController.get('/', async (req, res) => {
    try {
        const todos = await TodoService.getTodos();
        res.json(todos);
    } catch (error) {
        controllErrorResponse(res, error);
    }
});
todoController.post('/add', async (req, res) => {
    try {
        const { name } = req.body;
        const newTodo = await TodoService.addTodo(name);
        res.json(newTodo);
    } catch (error) {
        controllErrorResponse(res, error);
    }
});
todoController.put('/:id', async (req, res) => {
    try {
        const { name, isDone } = req.body;
        const id = req.params.id;
        const editTodo = await TodoService.editTodo(name, isDone, id);
        res.json(editTodo);
    } catch (error) {
        controllErrorResponse(res, error);
    }
});
todoController.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await TodoService.deleteTodo(id);
    } catch (error) {
        controllErrorResponse(res, error);
    }
});

