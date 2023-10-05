import express from 'express';
import bodyParser from 'body-parser';
import "reflect-metadata"
import { AppDataSource } from './data-source';
import { todoController } from './controlleres/TodoController';

const app = express();
const port = 3001;
app.use(bodyParser.json());

app.use('/api/v1', todoController);

AppDataSource.initialize()
    .then(() => {
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}!`);
        });
    })
    .catch((error) => {
        console.log(error);
    });


