const app = require('../../index');
const request = require('supertest');

describe('Teste de API para prova', () => {
    test('POST /api/user deve retornar o nome, email e senha', async () => {
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
        expect(response.body.senha).toBe(newUser.senha);
    });
});
