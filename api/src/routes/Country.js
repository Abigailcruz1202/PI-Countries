const { Router } = require('express');
const axios = require('axios');
// Imagen de la bandera
// Nombre
// Continente
const Sequelize = require("sequelize");
const { Country, Activity } = require('../db');
const router = Router();

router.get('/', async (req, res) => {
    const nombree = req.query.name;
    let orden = req.query.order; // 'ASC' || 'DESC'
    let tipo = req.query.tipo; //nombre || poblacion
    let offSet = req.query.offset;
    console.log('offset',offSet,'?')
    let tipoOrden;
    console.log('queryNombre', nombree, 'order', orden)
    orden === undefined || orden === 'ASC' ? orden = 'ASC' : orden = orden;
    !tipo || tipo === 'nombre' ? tipoOrden = [['nombre' ,orden]] :  tipoOrden = [['poblacion', orden.toUpperCase()]]
    // !offSet ? offSet = 0 : offSet = offSet;
    // console.log('offSet??',offSet , 'order', orden, 'tipo? ', tipoOrden)// [[tipo, orden]]
    if (!nombree ) {
        // orden = 'ASC'
        try {
            let datosApi = await axios.get(`https://restcountries.eu/rest/v2/all`)
            // console.log('datos?', datosApi.data, '??') // [{},{},{}] //datosApi.data[0].name,
            let respApi = datosApi.data;
            respApi.forEach((e) => {
                Country.findOrCreate({
                    where: {
                        id: e.alpha3Code,
                        nombre: e.name,
                        imagen: e.flag,
                        continente: e.region,
                        capital: e.capital,
                        subregion: e.subregion,
                        area: e.area? e.area : 0,
                        poblacion: e.population
                    }
                })
            })
            let pais = await Country.findAll({
                // attributes: ['id','nombre', 'imagen', 'continente', 'poblacion'],
                order: tipoOrden,
                include: Activity,
                offset: offSet,
                limit:12

            })
            return res.status(200).send(pais)
        } catch (error) {
            console.log('error ', error)
            return res.status(400).send('hubo un error')
        }
    } else if (nombree) {
        try {
            let NOMBRE = nombree[0].toUpperCase() + nombree.slice(1).toLowerCase();
            // console.log(NOMBRE, 'NOMBRE')
            const resultadoDb = await Country.findAll({
                where: {
                    [Sequelize.Op.or]: [
                        {
                            nombre: {
                                [Sequelize.Op.iLike]: "%" + NOMBRE + "%",
                            },
                        },
                    ],
                },
                include: Activity,
                // where: { nombre: NOMBRE },//req.query
                order: [['nombre','ASC']], //[['nombre', orden]],
                offset: offSet,
                limit:12,
                attributes: ['id','nombre', 'imagen', 'continente'],
            })
            // console.log(resultadoDb, 'db?')
            return res.status(200).send(resultadoDb)
        }
        catch (error) {
            // console.log('e', error ,'????')
            res.send('Lo siento hubo un error, puede que no se halla encontrado lo que busca')
        }
    }
})
// let db = await Country.findAll();
// if (db.length === 0) {
//     try {
//         let datosApi = await axios.get(`https://restcountries.eu/rest/v2/all`)
//         let respApi = datosApi.data;
//         respApi.forEach((e) => {
//             Country.create({
//                 id: e.alpha3Code,
//                 nombre: e.name,
//                 imagen: e.flag,
//                 continente: e.region,
//                 capital: e.capital,
//                 subregion: e.subregion,
//                 area: e.area,
//                 poblacion: e.population
//             })
//         })
//         let pais = await Country.findAll({
//             attributes: ['nombre', 'imagen', 'continente']
//         })
//         // console.log('pais????', pais, '??')
//         return res.status(200).send(pais)
//     }
//     catch (error) {
//         return res.status(400).send('hubo un error')
//     }
// }
// let pais = await Country.findAll({
//     attributes: ['nombre', 'imagen', 'continente'],
//     limit: 10
// })
// // console.log('pais else', pais, '?')
// res.status(200).send(pais) 27.657.145 27.478.000

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    let ID = id.toUpperCase()
    // console.log(ID, 'id')
    let paises = await Country.findOne({
        where: { id: ID },
        include: [Activity]
    })
    // console.log(paises,'?')
    res.status(200).send(paises)
})

module.exports = router;