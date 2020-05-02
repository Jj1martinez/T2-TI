
const Hamburguesa = require('../models').hamburguesa;
const Hamburguesaingrediente= require('../models').hamburguesaingredientes;
const Ingrediente= require('../models').ingrediente;
const pathfuturo= "https://lasburgas.herokuapp.com/"
module.exports = {
  list(req, res) {
    return Hamburguesa
      .findAll({
      })
      .then((hamburguesas)=>{
          var hs_i= []
          hamburguesas.forEach(h => {
            hs_i.push(h.getIngredientes())
          })
          Promise.all([Promise.all(hs_i),hamburguesas])
          .then((values)=>{
              var burgas=[]
            //   console.log(values[0])
              for (let index = 0; index < values[1].length; index++) {
                  const hamburguesa = values[1][index]
                  const ingredientes = values[0][index]
                  console.log(ingredientes)
                  var paths=[]
                  ingredientes.forEach(element => {
                    paths.push({path: pathfuturo+ "ingrediente/"+ element.id.toString()})
                });
                  burgas.push({id: hamburguesa.id,
                    nombre: hamburguesa.nombre,
                    precio: hamburguesa.precio,
                    descripcion: hamburguesa.descripcion,
                    imagen:hamburguesa.imagen,
                    ingredientes: paths })
              }  
              return res.status(200).send(burgas)
          })
      })
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return Hamburguesa
      .findByPk(req.params.id,{
        include: [{
            model: Ingrediente,
            as: 'ingredientes'
          }]
      })
      .then((hamburguesa) => {
        if (!hamburguesa) {
          return res.status(404).send({
            message: 'Hamburguesa Not Found',
          });
        }
        hamburguesa.getIngredientes().then((ingredientes)=>{
            var paths = []
            console.log(ingredientes)
            ingredientes.forEach(element => {
                paths.push({path: pathfuturo+ "ingrediente/"+ element.id.toString()})
            });
            return res.status(200).send({id: hamburguesa.id,
                nombre: hamburguesa.nombre,
                precio: hamburguesa.precio,
                descripcion: hamburguesa.descripcion,
                imagen:hamburguesa.imagen,
                ingredientes: paths });
        })
       
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return Hamburguesa
      .create({
        nombre: req.body.nombre,
        precio: req.body.precio,
        descripcion: req.body.descripcion,
        imagen: req.body.imagen
      })
      .then((hamburguesa) => res.status(201).send(hamburguesa))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Hamburguesa
      .findByPk(req.params.id)
      .then(hamburguesa => {
        if (!hamburguesa) {
          return res.status(404).send({
            message: 'Hamburguesa Not Found',
          });
        }
        return hamburguesa
          .update({
            nombre: req.body.nombre,
            precio: req.body.precio,
            descripcion: req.body.descripcion,
            imagen: req.body.imagen
          })
          .then(() => {
            hamburguesa.getIngredientes().then((ingredientes)=>{
                var paths = []
                console.log(ingredientes)
                ingredientes.forEach(element => {
                    paths.push({path: pathfuturo+ "ingrediente/"+ element.id.toString()})
                });
                return res.status(200).send({id: hamburguesa.id,
                    nombre: hamburguesa.nombre,
                    precio: hamburguesa.precio,
                    descripcion: hamburguesa.descripcion,
                    imagen:hamburguesa.imagen,
                    ingredientes: paths });
                })
          })
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Hamburguesa
      .findByPk(req.params.id)
      .then(hamburguesa => {
        if (!hamburguesa) {
          return res.status(400).send({
            message: 'Hamburguesa Not Found',
          });
        }
        return hamburguesa
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  addIngredient(req, res) {
    return Hamburguesa
        .findByPk(req.params.id)
        .then((hamburguesa) => {
          if (!hamburguesa) {
            return res.status(404).send({
              message: 'Hamburguesa Not Found',
            });
          }
          Ingrediente.findByPk(req.params.id2).then((ingrediente) => {
            if (!ingrediente) {
              return res.status(404).send({
                message: 'Ingrediente Not Found',
              });
            }
            Hamburguesaingrediente
            .create({
            hamburguesa_id: hamburguesa.id,
            ingrediente_id: ingrediente.id
            }).then(() => res.status(201).send({message: "Ingrediente added"}))   

        })
        })
        .catch((error) => res.status(400).send(error));
  },
  sacarIngredient(req, res) {
    return Hamburguesa
        .findByPk(req.params.id)
        .then((hamburguesa) => {
          if (!hamburguesa) {
            return res.status(404).send({
              message: 'Hamburguesa No existe',
            });
          }
          Ingrediente.findByPk(req.params.id2).then((ingrediente) => {
            if (!ingrediente) {
              return res.status(404).send({
                message: 'Ingrediente No existe',
              });
            }
            Hamburguesaingrediente
            .findAll({where:{hamburguesa_id:req.params.id,
            ingrediente_id:req.params.id2}
            }).then((esta) => {
                if (esta[0]) {
                    esta[0].destroy()
                    return res.status(200).send({message: "Ingrediente sacado"})
                }else{
                    return res.status(404).send({message: "Ingrediente inexistente en la hamburguesa"})
                }
                
            })   

        })
        })
        .catch((error) => res.status(400).send(error));
  },
  


};
