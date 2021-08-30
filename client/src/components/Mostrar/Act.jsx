import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { todo, filtrarActividad, todasActividades } from '../../redux/actions';
import { Link } from 'react-router-dom';
import NavBar from '../Navbar/Navbar';

import './Act.css'

const gif = 'https://i.pinimg.com/originals/04/8c/8e/048c8e251c1a6a1a9f8b35f68dcd8b52.gif'
//----PROBANDO...----

export function Act(props) {
    // console.log(props)
    let params = props.match.params.nombre
    const filtrado = useSelector(state => state.actividades)
    const todasAct = useSelector(state => state.todasActividades)
    let detAct = [];
    todasAct.filter((e) => {
        if (e.nombre === params) {
            if (!detAct.includes(params))
                detAct.push(e)
        }
    })
    // console.log(detAct, '?')
    // console.log(filtrado, '¿?')

    useEffect(() => {
        props.todasActividades()
        props.todo();
    }, [])
    useEffect(() => {
        let params = props.match.params.nombre;
        setTimeout(() => props.filtrarActividad(params), 1000)
        // props.filtrarActividad(params)
    }, [params])
    return (
        <div className='fondo-Act'>
            <NavBar />
            <div className='contenedor-act'>
                {detAct.length >= 1 ?
                    <>
                        <div className='act'>
                            <h5>ID: {detAct[0].id}</h5>
                            <h3>Nombre: {detAct[0].nombre}</h3>
                            <h3>Dificultad: {detAct[0].dificultad}</h3>
                            <h3>duración: {detAct[0].duracion}</h3>
                            <h3>Temporada: {detAct[0].temporada}</h3>
                        </div>
                        <h3>Paises</h3>
                        <div className='contenedor'>
                            {/* <ul> */}
                            {filtrado ?
                                filtrado.length > 5 ?
                                    <div className='paises-act'>
                                        {filtrado.map((p) => {
                                            return <div className='divsPaises' key={p.id}>
                                                <Link className='links' to={`/detalle/${p.id}`}><h4>•{p.nombre}</h4></Link>
                                            </div>
                                            // <li key={p.id}>{p.nombre}</li>
                                        })}
                                    </div>
                                    : <div className='paiss-act'>
                                        {filtrado.map((p) => {
                                            return <div className='divPaises' key={p.id}>
                                                <Link className='links' to={`/detalle/${p.id}`}><h4>•{p.nombre}</h4></Link>
                                            </div>
                                            // <li key={p.id}>{p.nombre}</li>
                                        })}
                                    </div>
                                : console.log('no hay nada para mostrar')}
                            {/* </ul> */}
                        </div>
                    </>
                    : null
                }
            </div>
        </div>
    )
}
export default connect(null, { todo, filtrarActividad, todasActividades })(Act)
//  p.activities.map((a) => {
    //     // console.log('a',a)
    //     <div key={a.id} >
    //         {console.log(a.nombre,'estoy en ultimo return',a)}
    //         {a}
    //         <h2>{a}</h2>
//         <h5>dificultad: {a.dificultad}</h5>
//         <h5>duracion: {a.duracion}</h5>
//         <h5>temporada: {a.temporada}</h5>
//     </div>
// })

// console.log(estadoTodo)
// let filtrado = [];
// let sinAct = []
// let conAct = []
// estadoTodo.forEach((p) => {
    //     if (p.activities.length > 0) {
        //         conAct.push(p)
//         p.activities.filter((a) => a.nombre === params ? filtrado.push(p) : console.log('no'))
//     } else {
//         sinAct.push(p)
//     }
// })
// // console.log(sinAct)
// console.log('final', conAct); console.log('filtrado', filtrado)