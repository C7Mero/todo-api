import { Todo } from "../entities/Todo";
import { findTodoById } from "../utils/findTodoById";
import { getRepository } from "../utils/getRepository";
import { updateTodo } from "../utils/updateTodo";

export class TodoService {
    static todoRepo = getRepository();

    static async getTodos() {
        try {
            return await TodoService.todoRepo.find();
        } catch (error) {
            throw new Error('Failed to get todos: ' + error);
        }
    }
    static async addTodo(name: string) {
        try {
            if (!name) return;
            const newTodo = new Todo();
            newTodo.name = name;
            return await TodoService.todoRepo.save(newTodo);
        } catch (error) {
            throw new Error('Failed to add todo: ' + error);
        }
    }
    static async editTodo(name: string, isDone: boolean, id: string) {
        try {
            const targetEditTodo = await findTodoById(id);
            if (!targetEditTodo) return;
            updateTodo(targetEditTodo, name, isDone);
            return await TodoService.todoRepo.save(targetEditTodo);
        } catch (error) {
            throw new Error('Failed to edit todo: ' + error);
        }
    };
    static async deleteTodo(id: string) {
        try {
            const targetDeleteTodo = await findTodoById(id);
            if (!targetDeleteTodo) return;
            return await TodoService.todoRepo.remove(targetDeleteTodo);
        } catch (error) {
            throw new Error('Failed to edit todo: ' + error);
        }
    };
}
