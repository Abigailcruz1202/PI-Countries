const { Router } = require('express');
const axios = require('axios');
const { Country, Activity } = require('../db');

const router = Router();
// Nombre
// Dificultad
// Duración
// Temporada
router.post('/', async(req, res) => {
    const { nombre, dificultad,duracion, temporada, paises} = req.body;
    // console.log( nombre, dificultad, duracion, temporada,'?',paises)
    try {
        const nuevaAct = await Activity.create({ nombre, dificultad, duracion, temporada })

        if (!Array.isArray(paises)) {
            const pais = await Country.findOne({
                where : { id : paises },
                // attributes: ['nombre']
            })
            // console.log('linea 21', pais)
            await nuevaAct.addCountry(pais)
            // console.log('?')
            return res.send(`${nuevaAct.nombre} se creo la conexión con ${pais.nombre}`)
        } else {
            paises.forEach(async(paisId) => {
                const pais = await Country.findByPk(paisId)
                await nuevaAct.addCountry(pais)
            })
            return res.send(`${nuevaAct.nombre} se creo la conexión con ${paises}`)
        }
    } catch (err) {
        // console.log(err)
        res.sendStatus(400)
    }
    // const { nombre, dificultad, duracion, temporada, pais } = req.body;
    // console.log( nombre, dificultad, duracion, temporada,'?',pais)
    // // try {
    //     let nuevaAct = await Activity.create({
    //         nombre, dificultad, duracion, temporada
    //     })
    //     // let actividad = 
    //      nuevaAct.setPaiss(pais)
    //     // console.log('¿',actividad,'?')
    //     return res.status(200).send(nuevaAct)
    // // }
    // // catch (error) {
    // //     console.log('e',error,'?')
    // //     res.sendStatus(400)
    // // }
})
module.exports = router;
