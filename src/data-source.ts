import { DataSource } from "typeorm";
import Todo from "./entities/Todo";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "tomo0112",
    database: "todos",
    entities: [Todo],
    migrations: ["src/db/migrations/**/*.ts"],
    synchronize: false,
    logging: false,
})