import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getByID, todasActividades,filtrarActividad } from '../../redux/actions';
import NavBar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';


import './Detalle.css';

export function Detalle(props) {
    // console.log('props detalle ,', props, 'state detalle: ', props.detalles)
    let stateDetalle = props.detalles
    useEffect(() => {
        let id = props.match.params.id;
        props.getByID(id)
    }, [])
    useEffect(() => {
        props.todasActividades()
    }, [])

    function redir(e){
        let params = e.target.value
        props.filtrarActividad(params)
    //    setTimeout((e)=>window.location.href = `http://localhost:3000/actividades/${nombre}`,2000)
        window.location.href = `http://localhost:3000/actividades/${e.target.value}`
    }

    return (
        <>
            <NavBar />
            <div className='fondo-detalle' >
                <Link className='volver' to='/home'>
                    <h4 >Volver</h4>
                </Link>
                <div key={stateDetalle.id} className='detalle-pais'>
                    <span><span style={{ fontWeight: 'bold' }}>ID: </span>{stateDetalle.id}</span>
                    <h1 className='margin'>{stateDetalle.nombre}</h1>
                    <h3 className='margin'>Capital: {stateDetalle.capital}</h3>
                    <img src={stateDetalle.imagen} width='300px' alt='bandera' />
                </div>
                    <div className='posicion'>
                    <h3 className='margin'>Continente: {stateDetalle.continente}</h3>
                        <h3>Subregión: {stateDetalle.subregion}</h3>
                        <h3>Área: {stateDetalle.area}km2</h3>
                        <h3>Población: {stateDetalle.poblacion}</h3>
                        <div>
                            <h4>Actividades:</h4>
                            <select onChange={(e)=> redir(e)}>
                            <option>...</option>
                            {Array.isArray(stateDetalle.activities) && stateDetalle.activities.length >= 1 ? 
                            stateDetalle.activities.map((e)=>{
                                return <option value={e.nombre}>{e.nombre}</option>
                            })
                            :<p>Sin actividades..</p>
                            }
                            </select>
                            {/* <ul>
                                {Array.isArray(stateDetalle.activities) && stateDetalle.activities.length >= 1 ? stateDetalle.activities.map((e) => {
                                    return <Link to={`/actividades/${e.nombre}`}><li key={e.id}>{e.nombre}</li></Link>
                                })
                                    : <p>Sin actividades..</p>
                                }
                            </ul> */}
                        </div>
                    </div>
            </div>
        </>
    )
}
function mapStateToProps(state) {
    return {
        detalles: state.detalle
    }
}
export default connect(mapStateToProps, { getByID, todasActividades,filtrarActividad })(Detalle)