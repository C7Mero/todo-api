import Todo from "../entities/Todo";
import { TodoService } from "../services/TodoService";

export const findTodoById = async (id: string): Promise<Todo | null> => {
  try {
    return await TodoService.todoRepo.findOneBy({ id: id });
  } catch (error) {
    throw new Error('Failed to find todo: ' + error);
  }
};
