import React, { useEffect } from 'react';
import { connect,useSelector } from 'react-redux';
import { todasActividades } from '../../redux/actions';
import NavBar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';

import './Actividades.css'

export function Actividades(props){
    let actividades = useSelector((state)=> state.todasActividades)
    // console.log('¿',actividades,'??????????????')
    useEffect(()=>{
        props.todasActividades()
    },[])
    return(
        <div>
            <NavBar/>
            <div className='fondo-actividades'>
                <div className='contenedor-Act'>
            {actividades.map((act)=>{
                return <div className='divsAct' key={act.id}>
                    <Link to={`/actividades/${act.nombre}`}><h3>{act.nombre}</h3></Link>
                    <h4 className='margin'>dificultad: {act.dificultad}</h4>
                    <h4 className='margin'>duracion: {act.duracion}</h4>
                    <h4 className='margin'>temporada: {act.temporada}</h4>

                </div>
            })}
            </div>
            </div>
        </div>
    )
}

export default connect(null, {todasActividades})(Actividades)
// nombre: 
//dificultad: 
// duracion: 
// id: 
// temporada: 
