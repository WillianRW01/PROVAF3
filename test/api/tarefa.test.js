const app = require('../index');
const request = require('supertest');

describe('Teste de API para tarefa', () => {
    test('POST /api/tarefa deve retornar o titulo, descricao, idUsuario e idProjeto', async () => {
        const newTarefa = {
            titulo: 'Tarefa ',
            descricao: 'Descrição da Tarefa ',
            idUsuario: 1,
            idProjeto: 1
        };

        const response = await request(app)
            .post('/api/tarefa')
            .send(newTarefa)
            .expect(201);

        expect(response.body.titulo).toBe(newTarefa.titulo);
        expect(response.body.descricao).toBe(newTarefa.descricao);
        expect(response.body.idUsuario).toBe(newTarefa.idUsuario);
        expect(response.body.idProjeto).toBe(newTarefa.idProjeto);
    });
});
