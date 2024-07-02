const express = require ('express')

const ProjetoApi = require('../api/projeto')
const router = express.Router()

router.put('/:id', ProjetoApi.AlterarProjeto)
router.post('/', ProjetoApi.criarProjeto)
router.get('/:id', ProjetoApi.BuscarProjeto)
router.delete('/:id', ProjetoApi.deletarProjeto)

module.exports = router
