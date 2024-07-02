const database = require('../config/database');
const { Sequelize } = require('sequelize');

class Tarefa {
    constructor() {
        this.model = database.define('tarefas', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            titulo: {
                type: Sequelize.STRING,
            },
            descricao: {
                type: Sequelize.STRING,
            },
            status: {
                type: Sequelize.ENUM('pendente', 'em progresso', 'concluido'),
                defaultValue: 'pendente'
            },
            id_projeto: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'projetos',
                    key: 'id'
                }
            },
            id_usuario: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'users',
                    key: 'id'
                }
            }
        });
    }
}

module.exports = (new Tarefa()).model;
