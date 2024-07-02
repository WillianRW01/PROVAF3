const express = require('express')

const userApi = require('../api/user')
const router = express.Router()

router.put('/:id', userApi.alterarUsuario)
router.get('/',userApi.listarUsuario)
router.delete('/:id',userApi.deletarUsuario)

module.exports = router