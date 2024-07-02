const Tarefa = require('../models/tarefa');
const ProjetoController = require('../controllers/projeto'); 
const UserController = require ('../controllers/user')
const jwt = require('jsonwebtoken');
const {TOT_SECRET_KEY} = require ('../controllers/user')

class TarefaController {
    async CriarTarefa(titulo, descricao, id_projeto, id_usuario) {
        if (!titulo || !descricao || !id_projeto || !id_usuario) {
            throw new Error('Título, Descrição, id_projeto e id_usuario são obrigatórios.');
        }
        await UserController.buscarPorId(Number(id_usuario))
        
        if (titulo.length > 100) {
            throw new Error('Titulo deve ter no maximo 100 caracteres')
        }

        const tarefa = await Tarefa.create({
            titulo,
            descricao,
            id_projeto,
            id_usuario,
            status: 'pendente'
        });
        return tarefa;
    }

    async BuscarTarefa(id) {

        if (!id) {
            throw new Error('Id é obrigatório.');
        }

        const tarefa = await Tarefa.findByPk(id);

        if (!tarefa) {
            throw new Error('Tarefa não encontrada.');
        }

        return tarefa;
    }

    async AlterarTarefa(id, titulo, descricao, status, id_projeto, id_usuario) {
        if (!id || !titulo || !descricao || !status || !id_projeto || !id_usuario) {
            throw new Error('Id, título, descrição, status, id_projeto e id_usuario são obrigatórios.');
        }
        
       
        const tarefa = await this.BuscarTarefa(id);

        tarefa.titulo = titulo;
        tarefa.descricao = descricao;
        tarefa.status = status;
        tarefa.id_projeto = id_projeto;
        tarefa.id_usuario = id_usuario;
        await tarefa.save();

        return tarefa;
    }

    async DeletarTarefa(id,id_usuario) {
        if (!id||id_usuario) {
            throw new Error('Id é obrigatório.');
        }
        
        const tarefa = await this.findByPk(id);
        await tarefa.destroy();

        return;
    }
    async validarToken(token) {
        try {
            const payload = jwt.verify(token, TOT_SECRET_KEY);
            return payload;
        } catch (error) {
            console.error('Token inválido:', error);
            throw new Error('Token inválido');
        }
    }
}

module.exports = new TarefaController();
