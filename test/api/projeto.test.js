const app = require('../index');
const request = require('supertest');

describe('Teste de API para projeto', () => {
    test('POST /api/projeto deve retornar o nome, descricao e idUsuario', async () => {
        const newProjeto = {
            nome: 'Projeto ',
            descricao: 'Descrição do Projeto',
            idUsuario: 1
        };

        const response = await request(app)
            .post('/api/projeto')
            .send(newProjeto)
            .expect(201);

        expect(response.body.nome).toBe(newProjeto.nome);
        expect(response.body.descricao).toBe(newProjeto.descricao);
        expect(response.body.idUsuario).toBe(newProjeto.idUsuario);
    });
});
