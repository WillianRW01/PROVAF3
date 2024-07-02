const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;
const TOT_SECRET_KEY = 'exemplo';

class UserController {
    async criarUsuario(nome, email, senha) {
        if (!nome || !email || !senha) {
            throw new Error('Nome, email e senha são obrigatórios');
        }
        const senhaCriptografado = await bcrypt.hash(senha, saltRounds);

        const newUser = await User.create({ nome, email, senha: senhaCriptografado });

        return newUser;
    }

    async buscarPorId(id) {
        if (!id) {
            throw new Error('Id é obrigatório');
        }
        const foundUser = await User.findByPk(id);

        if (!foundUser) {
            throw new Error('Usuário não encontrado');
        }

        return foundUser;
    }

    async alterarUsuario(id, nome, email, senha) {
        if (!id || !nome || !email || !senha) {
            throw new Error('Id, nome, email e senha são obrigatórios');
        }

        const user = await this.buscarPorId(id);

        user.nome = nome;
        user.email = email;
        const senhaCriptografado = await bcrypt.hash(senha, saltRounds);
        user.senha = senhaCriptografado;
        await user.save();

        console.log('Usuário alterado com sucesso');
        return { message: 'Usuário alterado com sucesso' };
    }

    async deletarUsuario(id) {
        if (!id) {
            throw new Error('Id é obrigatório');
        }

        const user = await this.buscarPorId(id);

        await user.destroy();

        console.log('Usuário deletado com sucesso');
        return { message: 'Usuário deletado com sucesso' };
    }

    async listarUsuarios() {
        console.log('Listando usuários');
        return User.findAll();
    }

    async login(nome, email, senha) {
        if (!nome || !email || !senha) {
            throw new Error('Nome, email e senha são obrigatórios');
        }
        const foundUser = await User.findOne({ where: { email } });

        if (!foundUser) {
            throw new Error('Usuário não encontrado');
        }

        const senhaValida = await bcrypt.compare(senha, foundUser.senha);
        if (!senhaValida) {
            throw new Error('Senha inválida');
        }

        const jwtToken = jwt.sign({ id: foundUser.id }, TOT_SECRET_KEY);

        if (jwtToken) {
            console.log('Usuário logado com sucesso');
            return { token: jwtToken };
        } else {
            console.error('Erro ao gerar token JWT');
            throw new Error('Erro ao gerar token JWT');
        }
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

module.exports = new UserController();
