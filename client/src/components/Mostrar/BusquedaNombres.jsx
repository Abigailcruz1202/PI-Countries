import React, {useEffect, useState} from 'react';
import { connect, useSelector } from 'react-redux';
import { getByNames } from '../../redux/actions';
import { NavLink } from 'react-router-dom';
import NavBar from '../Navbar/Navbar';


const gif = 'https://i.pinimg.com/originals/04/8c/8e/048c8e251c1a6a1a9f8b35f68dcd8b52.gif'
//----PROBANDO...----

export function Nombres(props){
    console.log(props)
// const estadoNombres = useSelector(state=> state.nombres)
let estadoNombres = props.estadoNombres
console.log('estado',estadoNombres)

    return (
        <div> 
            
        <div style={{display:'flex', flexWrap:'wrap',justifyContent:'space-evenly',padding: '27px'}}>
            {estadoNombres? estadoNombres.map((pais)=>{
                return <div key={pais.id} className='tarjetas' style={{ width: '300px', height: '260px', margin: '5px', border: 'solid 2px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: ' rgb(0 0 0 / 28%)' }}>
                <h2>{pais.nombre}</h2>
                <NavLink to={`/detalle/${pais.id}`}>
                    <img src={pais.imagen} width='180px' height='100px' alt='bandera' />
                </NavLink>
                <h3>{pais.continente}</h3>
            </div>
            }) : console.log('no hay nada para mostrar')}
        </div>
        </div>
    )
}
export default connect(null,{getByNames})(Nombres)
