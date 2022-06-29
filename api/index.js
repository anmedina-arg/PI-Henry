//import funcion-que-carga-paises-en-BD from ("./funciones")
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
//const { PORT } = process.env;
const { uploadCountries } = require("./src/functions/uploadCountries")

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    uploadCountries// <-- llamar a la función que carga todos los paises en la BD
    console.log(`%s listening at 3001`);
    //console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
  });
});