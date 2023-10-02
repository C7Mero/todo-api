import express from 'express';
import bodyParser from 'body-parser';
import "reflect-metadata"
import { DataSource, getRepository } from "typeorm"
import { Todo } from "./entities/Todo"
// import mysql from "mysql";

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'tomo0112',
//     database: 'todos'
// })

// connection.connect();
const app = express();
const port = 3001;

// type todo = {
//     name: string,
//     id: number,
//     isDone: boolean,
//     createdAt: string
// }

// JSON ボディをパースするためのミドルウェアを追加
app.use(bodyParser.json());

// app.post('/api/v1/add', (req, res) => {
//     const { name, isDone } = req.body;
//     const insertQuery = "INSERT INTO todo_list (name, isDone) VALUES (?, ?)";
//     const insertValues = [name, isDone];
//     connection.query(insertQuery, insertValues, (error) => {
//         if (error) {
//             res.status(500).json({ error: "Failed to add todo" });
//         } else {
//             res.json({ done: false, task: name });
//         }
//     });
// });

// app.get('/api/v1/', (req: Request, res: Response) => {
//     const getQuery = "select * from todos.todo_list";
//     connection.query( getQuery, (error, results) => {
//         if (error) {
//             res.status(500).json({ error: 'Internal Server Error' });
//         }else {
//             res.send(results);
//         }
//     })
// })

// app.put('/api/v1/:id', (req, res) => {
//     const { name, isDone } = req.body;
//     const id = req.params.id;
//     const updateQuery = "UPDATE todo_list SET name = ?, isDone = ? WHERE id = ?";
//     const updateValues = [name, isDone, id];

//     connection.query(updateQuery, updateValues, (error) => {
//         if (error) {
//             res.status(500).json({ error: "Failed to update todo" });
//         } else {
//             res.json({ success: true });
//         }
//     });
// });

// app.delete('/api/v1/:id', (req, res) => {
//     const id = req.params.id;
//     const deleteQuery = "DELETE FROM todo_list WHERE id = ?";
//     connection.query(deleteQuery, id, (error) => {
//         if (error) {
//             res.status(500).json({ error: "Failed to delete todo" });
//         } else {
//             res.json({ success: true });
//         }
//     });
// });

// app.listen(port, () => console.log(`Example apps listening on port ${port}!`));
// import { todo } from "./entity/todo"
// import { AppDataSource } from "./index"

const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "tomo0112",
    database: "todos",
    entities: [Todo],
    synchronize: true,
    logging: false,
})
// Todo追加
app.post('/api/v1/add', async (req, res) => {
    const { name } = req.body;
    const todo = new Todo()
    todo.name = name;
    if (!todo.name) return;
    const todoRepo = AppDataSource.getRepository(Todo);
    await todoRepo.save(todo);
    res.json({ task: todo.name });
});
// Todo一覧取得
app.get('/api/v1/', async (req, res) => {
    try {
        const todoRepo = AppDataSource.getRepository(Todo);
        const todos = await todoRepo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch todos' });
    }
});
// Todo更新
app.put('/api/v1/:id', async (req, res) => {
    try {
        const { name, isDone } = req.body;
        const id = req.params.id;
        const todoRepo = AppDataSource.getRepository(Todo);
        const todo = await todoRepo.findOneBy({ id: id })
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        if(name) todo.name = name;
        if(isDone) todo.isDone = isDone;
        await todoRepo.save(todo);
        res.json(todo);
    } catch (error) {
        res.status(500).json({ error: error});
    }
});
// todo削除
app.delete('/api/v1/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const todoRepo = AppDataSource.getRepository(Todo);
        const todo = await todoRepo.findOneBy({ id: id })
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        await todoRepo.remove(todo);
        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error});
    }
});

AppDataSource.initialize()
    .then(() => {
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}!`);
        });
    })
    .catch((error) => {
        console.log(error);
    });


