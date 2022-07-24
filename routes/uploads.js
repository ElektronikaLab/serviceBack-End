const { Router } = require("express");
const { actualizarImagen, mostrarImagen } = require("../controllers/uploads");



const router = Router();

router.put('/:coleccion/:id', actualizarImagen);
router.get('/:coleccion/:id', mostrarImagen);


module.exports = router;