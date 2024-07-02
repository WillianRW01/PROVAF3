const Projeto = require('../models/projeto')
const UserController = require('../controllers/user')

class ProjetoController{
    async criarProjeto(nome,descricao,id_usuario){
    if(!nome||!descricao||!id_usuario){
        throw new Error('Nome, descrição e id_usuario são obrigatórios'+ nome + descricao +"  :  "+ id_usuario)
    }

    await UserController.buscarPorId(Number(id_usuario))

    if(nome.length >100){
        throw new error ('Prezado usuario seu nome der no minimo ate 100 caracteres')
    }
    const projet = await Projeto.create({
        nome,
        descricao,
        id_usuario
    })
    return projet
    }

  async BuscarProjeto(id){
    
    if(!id){
        throw new Error('Id é obrigatório.')
    }
    const projet = await Projeto.findByPk(id)
    {
        if(!projet){
            throw new Error('Projeto não encontrado.')
        }
    }
    return projet
  } 

  async AlterarProjeto (id,nome,descricao,id_projeto,){
    if(!id||!nome||!descricao||!id_projeto){
        throw new Error('Id, Nome, descrição e id_usuario são obrigatórios.') 
    }

    const projet = await this.BuscarProjeto(id)
        if(projet.id ===id){
            projet.nome = nome
            projet.descricao = descricao
            projet.id_projeto = id_projeto
            projet.save()
            
        return projet
        }else{
            throw new Error('Usuario invalido.')
        }
  }
async deletarProjeto(id,id_usuario){
    if(!id||id_usuario){
        throw new Error('Id é obrigatório.')
    }
    const projet = await this.BuscarProjeto(id)
    projet.destroy()

    return
}

}
module.exports = new ProjetoController()