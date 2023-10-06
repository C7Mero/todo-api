import { Todo } from "../types/todo";

export const updateTodo = (todo: Todo, name: string, isDone: boolean) => {
    if (name) todo.name = name;
    if (isDone) todo.isDone = isDone;
    return todo;
}