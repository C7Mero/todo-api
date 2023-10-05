import { AppDataSource } from "../data-source";
import Todo from "../entities/Todo";

export const getRepository = () => AppDataSource.getRepository(Todo);