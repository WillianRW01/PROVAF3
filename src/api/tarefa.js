const TarefaController = require('../controllers/tarefa');
const tarefa = require('../models/tarefa');

class TarefaApi {
    
    async CriarTarefa(req, res) {
        const titulo = req.body.titulo;
        const descricao = req.body.descricao;
        const id_projeto = req.body.id_projeto;
        const id_usuario = req.body.id_usuario;
        const status = req.body.status;
        try {
            const task = await TarefaController.CriarTarefa(titulo,descricao, id_projeto,id_usuario,status)
            return res.status(201).send(task)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao criar uma tárefa ${e.message}`})
        }
    
    }

    async AlterarTarefa(req, res) {
        const { id } = req.params
        const titulo = req.body.titulo;
        const descricao = req.body.descricao;
        const id_projeto = req.body.id_projeto;
          const id_usuario = req.body.id_usuario;
          const status = req.body.status
        try {
            const task = await TarefaController.AlterarTarefa(Number(id), titulo, descricao,id_usuario, id_projeto,status)
            return res.status(200).send(task)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao alterar tárefa ${e.message}`})
        }
    }

    async DeletarTarefa (req, res) {
        const { id } = req.params

        try {
            await TarefaController.DeletarTarefa(Number(id))
            return res.status(201).send()
        } catch (e) {
            return res.status(400).send({ error: `Erro ao deletar tárefa ${e.message}`})
        }
    }

    async BuscarTarefa(req, res) {
        const { id } = req.params
        try {
            const tasks = await TarefaController.BuscarTarefa(id)
            return res.status(200).send(tasks)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao listar tárefa ${e.message}`})
        }
    }
   
}

module.exports = new TarefaApi()