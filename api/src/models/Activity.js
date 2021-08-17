const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    id:{
      type:  DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    dificultad:{
        type: DataTypes.ENUM({
        values: ['1','2','3','4','5'] // verificamos que sea del 1 al 5
    })
    },
    duracion:{
        type: DataTypes.STRING //verificar despues
    },
    temporada:{
        type: DataTypes.ENUM({
            values: ['verano', 'otoño', 'invierno', 'primavera']
        })
    }
  });
};
// Actividad Turística con las siguientes propiedades:
// ID
// Nombre
// Dificultad (Entre 1 y 5)
// Duración
// Temporada (Verano, Otoño, Invierno o Primavera)