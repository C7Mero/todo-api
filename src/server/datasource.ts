import { DataSource } from "typeorm"

const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "tomo0112",
    database: "todos",
    synchronize: true, // DBとのスキーマ同期(開発用)
    dropSchema: true, // スキーマ削除(開発用)
    entities: ['src/entities/**/*.ts'],
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })