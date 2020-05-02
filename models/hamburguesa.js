'use strict';
module.exports = (sequelize, DataTypes) => {
  const hamburguesa = sequelize.define('hamburguesa', {
    nombre: DataTypes.STRING,
    precio: DataTypes.INTEGER,
    descripcion: DataTypes.STRING,
    imagen: DataTypes.STRING
  }, {});
  hamburguesa.associate = function(models) {
    hamburguesa.belongsToMany(models.ingrediente, {
      through: 'hamburguesaingredientes',
      as: 'ingredientes',
      foreignKey: 'hamburguesa_id'
    });
  };
  return hamburguesa;
};