import { Todo } from "../entities/Todo";
import { getTodoById } from "../utils/getTodoById";
import { getRepository } from "../utils/getRepository";
import { updateTodo } from "../utils/updateTodo";
import { serviceErrorResponse } from "../utils/serviceErrorResponse";

export class TodoService {
    static todoRepo = getRepository();

    static async getTodos() {
        try {
            return await TodoService.todoRepo.find();
        } catch (error) {
            serviceErrorResponse('Failed to get todos: ' + error);
        }
    }
    static async addTodo(name: string) {
        try {
            if (!name) return;
            const newTodo = new Todo();
            newTodo.name = name;
            return await TodoService.todoRepo.save(newTodo);
        } catch (error) {
            serviceErrorResponse('Failed to add todos: ' + error);
        }
    }
    static async editTodo(name: string, isDone: boolean, id: string) {
        try {
            const targetTodo = await getTodoById(id);
            if(!targetTodo) return;
            updateTodo(targetTodo, name, isDone);
            return await TodoService.todoRepo.save(targetTodo);
        } catch (error) {
            serviceErrorResponse('Failed to edit todos: ' + error);
        }
    };
    static async deleteTodo(id: string) {
        try {
            const targetTodo = await getTodoById(id);
            if(!targetTodo) return;
            return await TodoService.todoRepo.remove(targetTodo);
        } catch (error) {
            serviceErrorResponse('Failed to delete todos: ' + error);
        }
    };
}
