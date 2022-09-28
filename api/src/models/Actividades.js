const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  sequelize.define("actividades", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nombreDeporte: {
      type: DataTypes.STRING,
    },
    dificultad: {
      type: DataTypes.FLOAT,
    },
    duracion: {
      type: DataTypes.FLOAT,
    },
    temporada: {
      type: DataTypes.STRING,
    },
    descripcion: {
      type: DataTypes.TEXT,
    },
    icono: {
      type: DataTypes.STRING,
    },
    imagen: {
      type: DataTypes.STRING,
    },
  });
}
