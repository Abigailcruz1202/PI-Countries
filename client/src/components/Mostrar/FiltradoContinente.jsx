import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { filtrarContinente } from '../../redux/actions'
import { NavLink } from 'react-router-dom';
import Paginado from '../Home/Paginado/paginadp';

import './FiltradoContinente.css'

export function FiltradoContinente(props) {
    console.log(props,'soy filtrado')
    // let params = props.match.params.nombre;
    // let params = props.Continente
    let estado = props.continentess
    const [pag, setPag] = useState(1);
    const [numPaises] = useState(12)
    const indexOfLastCountry = pag * numPaises
    const indexOfFirstCountry = indexOfLastCountry - numPaises
    const pais = estado?.slice(indexOfFirstCountry, indexOfLastCountry)
    const pagina = numeroPagina => setPag(numeroPagina)


    useEffect(() => {
        let params = props.Continente
        setTimeout(() => props.filtrarContinente(params), 1000)
    }, [])

    return (
        <div className='imagen'>
            <Paginado numPaises={numPaises}
                todosPaises={estado.length}
                pagina={pagina} />
                <div className='ordenn'>
                {pais ? 
                    pais.map((e, id)=>{
                       return  <div key={e.id} className='continentes'>
                       <h2 className='color'>{e.nombre}</h2>
                       <NavLink to={`/detalle/${e.id}`}>
                           <img src={e.imagen} width='180px' alt='bandera' />
                       </NavLink>
                       <h3 className='color'>{e.continente}</h3>
                   </div> 
                   })
                   :<p>cargando</p>
                }
                </div>
        </div>
    )
}
function mapStateToProps(state) {
    return {
        continentess: state.continentes,
        detalles: state.todasActividades
    }
}
export default connect(mapStateToProps, { filtrarContinente })(FiltradoContinente)