const { Router } = require('express');
const { Country, Activity } = require("../db");
const axios = require("axios");
const { Op } = require('sequelize');

const router = Router();

//Este es el primer enrutado para el get de countries, no tiene la consulta a la api
router.get("/", async (req, res, next) => {
    try{
        return await Country.findAll({
            include: Activity
        })
        .then((country) => {
            res.send(country)
        })
    }
    catch (error) {
        next(error)
    }
})

router.get("/:name", async (req, res, next) => {
    let {name} = req.params
    try {
        return await Country.findAll({
            include: Activity,
            where: {
                name: { [Op.iLike]: `%${name}%` },
            }
        })
        .then((country) => {
            res.json(country)
        })
    } catch (error) {
        next(error)
    }
})

//En la siguiente ruta lo que hago es matchear una actividad con un país. Esta relación se guarda en la tabla intermedia "ActivityCountry" así:
//         createdAt         |         updatedAt         | ActivityId | CountryId
//---------------------------+---------------------------+------------+-----------
//2022-06-19 02:12:56.32+00 | 2022-06-19 02:12:56.32+00 |          1 | SPM

// router.post("/:countryId/activity/:activityId", async (req, res, next) => {
//     try {
//         const {countryId, activityId} = req.params
//         const country = await Country.findByPk(countryId)
//         await country.addActivity(activityId) // addActivity es un mixin de sequelize, se forman así...
//         res.send(200)
//     } catch (error) {
//         next(error)
//     }
// })

module.exports = router;