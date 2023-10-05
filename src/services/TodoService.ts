import { AppDataSource } from "../data-source";
import { Todo } from "../entities/Todo";
import { getRepository } from "../utils/getRepository";

export class TodoService {
    static async getTodos() {
        try {
            const todoRepo = getRepository();
            return await todoRepo.find();
        } catch (error) {
            throw new Error('Failed to get todos: ' + error);
        }
    }
    static async addTodo(name: string) {
        try {
            const todoRepo = getRepository();
            if (!name) return;
            const todo = new Todo();
            todo.name = name;
            await todoRepo.save(todo);
            return todo;
        } catch (error) {
            throw new Error('Failed to add todo: ' + error);
        }
    }
    static async editTodo(name:string, isDone:boolean, status:string, id:string) {
        try {
            const todoRepo = getRepository();
            const todo = await todoRepo.findOneBy({ id: id })
            if(!todo) return;
            if(name) todo.name = name;
            if(isDone) todo.isDone = isDone;
            if(status) todo.status = status;
            return await todoRepo.save(todo);
        } catch (error) {
            throw new Error('Failed to edit todo: ' + error);
        }
    };
    static async deleteTodo(id:string) {
        try {
            const todoRepo = getRepository();
            const todo = await todoRepo.findOneBy({ id: id })
            if (!todo) return;
            return await todoRepo.remove(todo);
        } catch (error) {
            throw new Error('Failed to edit todo: ' + error);
        }
    };
}
