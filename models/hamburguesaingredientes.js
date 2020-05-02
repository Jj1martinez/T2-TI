'use strict';
module.exports = (sequelize, DataTypes) => {
  const hamburguesaingredientes = sequelize.define('hamburguesaingredientes', {
    hamburguesa_id: DataTypes.INTEGER,
    ingrediente_id: DataTypes.INTEGER
  }, {});
  hamburguesaingredientes.associate = function(models) {
    // associations can be defined here
  };
  return hamburguesaingredientes;
};