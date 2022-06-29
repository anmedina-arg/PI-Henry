const { Router } = require('express');
const { Activity, Country } = require('../db');

const router = Router();

router.get("/", (req, res, next) => {
    return Activity.findAll()
    .then((activity) => {
        res.send(activity)
    })
    .catch((error)=> {
        next(error)
    })
})

router.post("/", async (req, res, next) => {
    try {
        const {name, dificult, time, season, country} = req.body
        const newActivity = await Activity.create({
            name,
            dificult,
            time,
            season
        })
        country.forEach(async(count) => {
            let countryActivity = await Country.findOne({where: {name: count}})
            newActivity.addCountry(countryActivity)
        })
        res.send(newActivity)
    } catch (error) {
        next(error)
    }
})

/*
router.put("/update/:id", async (req, res, next) => {
    const {id} = req.params;
    //id = parseInt(id)
    const {name, dificult, time, season} = req.body;
    try{
        await Activity.update({
            name: name,
            dificult: dificult,
            time: time,
            season: season
        },{
            where:{
                id: parseInt(id)
            }
        })
        res.send("Actualizado")

    } catch (error) {
        next(error)
    }
    //res.send("soy put de /activity")
})
*/

module.exports = router;