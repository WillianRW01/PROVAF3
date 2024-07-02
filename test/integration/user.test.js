const app = require('../index');
const request = require('supertest');
const { sequelize, User } = require('../models');

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    await sequelize.close();
});

describe('Teste de API para usuário', () => {
    test('POST /api/user deve retornar o nome, email e senha (hash)', async () => {
        const newUser = {
            nome: 'batata',
            email: 'batata@gmail.com',
            senha: 'senha123'
        };

        const response = await request(app)
            .post('/api/user')
            .send(newUser)
            .expect(201);

        expect(response.body.nome).toBe(newUser.nome);
        expect(response.body.email).toBe(newUser.email);
        expect(response.body.senha).toBeDefined();
        expect(response.body.senha).not.toBe(newUser.senha); 
    });
});
