//import funcion-que-carga-paises-en-BD from ("./funciones")
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
require('dotenv').config();
const { PORT } = process.env;
const { uploadCountries } = require("./src/functions/uploadCountries");

// Syncing all the models at once.
conn.sync({ force: true })
  .then(() => {
    server.listen(PORT, () => {
      uploadCountries(); // Llamar a la función que carga todos los países en la BD
      console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
    });
  })
  .catch(err => {
    console.error('Error syncing database:', err); // Manejo de errores al sincronizar la base de datos
  });