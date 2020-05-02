'use strict';
module.exports = (sequelize, DataTypes) => {
  const ingrediente = sequelize.define('ingrediente', {
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING
  }, {});
  ingrediente.associate = function(models) {
    ingrediente.belongsToMany(models.hamburguesa, {
      through: 'hamburguesaingredientes',
      as: 'ingredientes',
      foreignKey: 'ingrediente_id'
    });
  };
  return ingrediente;
};