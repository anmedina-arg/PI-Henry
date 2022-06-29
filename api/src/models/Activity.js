const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le inyectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Activity', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dificult: {
      type: DataTypes.FLOAT,
            validate:{
                min:1,
                max:5
            },
            allowNull: false,
    },
    time: {
      type: DataTypes.FLOAT,
            validate:{
                min:1,
                max:24
            },
            allowNull: false,
    },
    season: {
      type: DataTypes.ENUM('Summer','Outumn','Winter','Spring'),
      
    }
  },
    {
      timestamps: false
  });
};
