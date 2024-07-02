const express = require ('express')

const TarefaApi = require('../api/tarefa')
const { route } = require('./projeto')
const router = express.Router()

router.put('/:id', TarefaApi.AlterarTarefa)
router.post('/',TarefaApi.CriarTarefa)
router.delete('/:id', TarefaApi.DeletarTarefa)
router.get('/:id',TarefaApi.BuscarTarefa)

module.exports = router