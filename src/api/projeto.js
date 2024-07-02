const ProjetoController = require('../controllers/projeto')
const Projeto = require('../models/projeto')

class ProjetoApi {
    async criarProjeto(req, res) {
        const { nome, descricao} = req.body
        const id_usuario = req.body.id_usuario;
        
        try {
            const project = await ProjetoController.criarProjeto(nome, descricao, id_usuario)
            return res.status(201).send(project)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao criar um projeto ${e.message}`})
        }
    }

    async AlterarProjeto(req, res) {

        const { id } = req.params

        const nome = req.body.nome;
        const descricao = req.body.descricao;
        const id_usuario = req.body.id_usuario;
        try {
            const project = await ProjetoController.AlterarProjeto(Number(id), nome, descricao, id_usuario)
            return res.status(200).send(project)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao alterar o Projeto ${e.message}`})
        }
    }

    async deletarProjeto(req, res) {
        const { id } = req.params

        try {
            await ProjetoController.deletarProjeto(Number(id))
            return res.status(204).send()
        } catch (e) {
            return res.status(400).send({ error: `Erro ao deletar o Projeto  ${e.message}`})
        }
    }

    async BuscarProjeto(req, res) {
        const {id} = req.params
        try {
            const projects = await ProjetoController.BuscarProjeto(id)
            return res.status(200).send(projects)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao listar os Projetos  ${e.message}`})
        }

    }
   
}

module.exports = new ProjetoApi()