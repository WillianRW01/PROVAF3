const database = require('../config/database');

class Projeto {
    constructor() {
        this.model = database.define('projeto', {
            id: {
                type: database.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            titulo: {
                type: database.Sequelize.STRING,
            },
            descricao: {
                type: database.Sequelize.STRING,
            },         
            id_usuario: {
                type: database.Sequelize.INTEGER,
                references: {
                    model: 'users',
                    key: 'id'
                }
            }
        });
    }
}

module.exports = (new Projeto()).model;
