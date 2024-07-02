const express = require('express');
const cors = require('cors');
const database = require('./src/config/database');
const userApi = require('./src/api/user');
const userRouter = require('./src/router/user');
const TarefaRouter = require('./src/router/tarefa');
const ProjetoRouter = require('./src/router/projeto');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello World' });
});

// Rotas sem token
app.post('/api/v1/login', userApi.login);
app.post('/api/v1/user', userApi.criarUsuario);

// Rotas com token
app.use(userApi.validarToken)
app.use('/api/v1/user', userRouter);
app.use('/api/v1/tarefa', TarefaRouter);
app.use('/api/v1/projeto', ProjetoRouter);

database.sync()
    .then(() => {
        app.listen(3010, () => {
            console.log('Server is running on port 3010');
        });
    })
    .catch((error) => {
        console.error('Error connecting to the database', error);
    });
