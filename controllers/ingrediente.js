const Ingrediente = require('../models').ingrediente;
const Hamburguesaingredientes= require('../models').hamburguesaingredientes;


module.exports = {
  list(req, res) {
    return Ingrediente
      .findAll({
      })
      .then((ingredientes) => {
        var i= []
        ingredientes.forEach(e => {
          i.push({id:e.id,nombre: e.nombre,descripcion:e.descripcion})
        })
        return res.status(200).send(i)
      })
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return Ingrediente
      .findByPk(req.params.id)
      .then((e) => {
        if (!e) {
          return res.status(404).send({
            message: 'Ingrediente Not Found',
          });
        }
        return res.status(200).send({id:e.id,nombre: e.nombre,descripcion:e.descripcion});
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return Ingrediente
      .create({
        nombre: req.body.nombre,
        precio: req.body.precio,
        descripcion: req.body.descripcion,
        imagen: req.body.imagen
      })
      .then((e) => res.status(201).send({id:e.id,nombre: e.nombre,descripcion:e.descripcion}))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Ingrediente
      .findByPk(req.params.id)
      .then(ingrediente => {
        if (!ingrediente) {
          return res.status(404).send({
            message: 'Ingrediente Not Found',
          });
        }
        return ingrediente
          .update({
            nombre: req.body.nombre,
            precio: req.body.precio,
            descripcion: req.body.descripcion,
            imagen: req.body.imagen
          })
          .then(() => res.status(200).send({id:ingrediente.id,nombre: ingrediente.nombre,descripcion:ingrediente.descripcion}))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Ingrediente
      .findByPk(req.params.id)
      .then(ingrediente => {
        if (!ingrediente) {
          return res.status(400).send({
            message: 'Ingrediente Not Found',
          });
        }
        Hamburguesaingredientes.findAll({
          where:{ingrediente_id: ingrediente.id}
        }).then((esta)=>{
          if (!esta[0]) {
            return ingrediente
            .destroy()
            .then(() => res.status(200).send())
            .catch((error) => res.status(400).send(error));
          } else {
            return res.status(409).send({message:"Ingrediente no se puede borrar, se encuentra presente en una hamburguesa"})
          }
        })
        
      })
      .catch((error) => res.status(400).send(error));
  },
};