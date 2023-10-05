import express from 'express';
import bodyParser from 'body-parser';
import "reflect-metadata"
import { Todo } from "./entities/Todo"
import { AppDataSource } from './data-source';
// import { TodoController } from './controlleres/TodoController';
import { TodoService } from './services/TodoService';
import { todoController } from './controlleres/TodoController';

const app = express();
const port = 3001;
// const todoController = new TodoController();

app.use(bodyParser.json());

// const todoService = new TodoService();
// const todoController = new TodoController(todoService);
// // ルーティングの設定
// app.put('/api/v1/add', todoController.addTodo);

// import express from 'express';
// import { todoController } from './path/to/todoController';

app.use('/api/v1', todoController);

// Todo一覧取得
// app.get('/api/v1/', async (req, res) => {
//     try {
//         const todoRepo = AppDataSource.getRepository(Todo);
//         const todos = await todoRepo.find();
//         res.json(todos);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch todos' });
//     }
// });

// Todo更新
// app.put('/api/v1/:id', async (req, res) => {
//     try {
//         const { name, isDone } = req.body;
//         const id = req.params.id;
//         const todoRepo = AppDataSource.getRepository(Todo);
//         const todo = await todoRepo.findOneBy({ id: id })
//         if (!todo) {
//             return res.status(404).json({ error: 'Todo not found' });
//         }
//         if(name) todo.name = name;
//         if(isDone) todo.isDone = isDone;
//         await todoRepo.save(todo);
//         res.json(todo);
//     } catch (error) {
//         res.status(500).json({ error: error});
//     }
// });

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


