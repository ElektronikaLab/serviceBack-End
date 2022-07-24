const { Router } = require("express");
const { tiendaGet, tiendaPost, tiendaPut, tiendaBusquedaGet, tiendaGetCliente, totalesGet } = require("../controllers/tienda");


const router = Router();

router.get('/total',totalesGet)

router.get('/', tiendaGet )
router.get('/cliente/:id', tiendaGetCliente)
router.get('/buscar/:termino', tiendaBusquedaGet,)
router.post('/',tiendaPost)
router.put('/:id', tiendaPut)

module.exports = router