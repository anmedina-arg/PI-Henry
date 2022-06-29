const axios = require ("axios");
const { Country } = require ("../db.js")
require('dotenv').config(); // la librería dotenv sirve para configurar las variables de entorno
//const { API } = process.env // <-- lo dejo comentado porque no puedo incluirlo dentro del () del axios...

const uploadCountries = async function () {
    try {
        const getCountriesApi = await axios.get(`https://restcountries.com/v3/all`)
        //console.log(getCountriesApi)
        const arrayCountries = getCountriesApi.data.map( (country) => {
            const {cca3, name, flags, continents, capital, subregion, area, population} = country;
            return {
                id : cca3,
                name: name.common,
                img_flag: flags[0],
                continent: continents[0],
                capital: capital || ["Has no capital"],
                subregion: subregion || "Does not have",
                area,
                population
            }
        })
        //console.log(arrayCountries)
        //SET CLIENT_ENCODING TO 'utf8' <-- he usado esta configuración para solucionar un error que me salía por consola, donde uno de los datos no coincidia con la codificación por defecto de postgres
        arrayCountries.forEach( (country) => {
            const {id, name, img_flag, continent, capital, subregion, area, population} = country
            Country.create({
                id,
                name,
                img_flag,
                continent,
                capital: capital || "Has no capital",
                subregion: subregion || "Does not have",
                area,    
                population
            })
        })
    }
    catch (error) {
        console.log(error)
    }
}

//export default

//uploadCountries()
module.exports = uploadCountries();

// create({
//     id : 1,
//     name: "arg",
//     img_flag: "impor-im-ade",
//     continent: "america",
//     capital: "buenos aires",
//     subregion: "e.subregion",
//     area: "e.area",
//     population: 1250
// })