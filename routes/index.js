var express = require('express');
var router = express.Router();


const hamburguesaController = require('../controllers').hamburguesa;
const ingredienteController = require('../controllers').ingrediente;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Hamburguesa Router */
router.get('/hamburguesa', hamburguesaController.list);
router.get('/hamburguesa/:id', hamburguesaController.getById);
router.post('/hamburguesa', hamburguesaController.add);
router.patch('/hamburguesa/:id', hamburguesaController.update);
router.delete('/hamburguesa/:id', hamburguesaController.delete);
router.put('/hamburguesa/:id/ingrediente/:id2', hamburguesaController.addIngredient);
router.delete('/hamburguesa/:id/ingrediente/:id2', hamburguesaController.sacarIngredient);



router.get('/ingrediente', ingredienteController.list);
router.get('/ingrediente/:id', ingredienteController.getById);
router.post('/ingrediente', ingredienteController.add);
router.patch('/ingrediente/:id', ingredienteController.update);
router.delete('/ingrediente/:id', ingredienteController.delete);


module.exports = router;
