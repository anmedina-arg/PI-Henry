const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const countryRoute = require("./country")
const activityRoute = require("./activity")

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//configurar mis middlewars
router.use("/country", countryRoute) //  "/country" + "/", "/:name", "/:countryId/activity/:activityId"
router.use("/activity", activityRoute)

module.exports = router;
