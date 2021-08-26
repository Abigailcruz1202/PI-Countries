import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getByID } from '../../redux/actions';
import NavBar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';


import './Detalle.css';

export function Detalle(props) {
    console.log('props detalle ,', props, 'state detalle: ', props.detalles)
    let stateDetalle = props.detalles
    useEffect(() => {
        let id = props.match.params.id;
        props.getByID(id)
    }, [])

    return (
        <>
        <NavBar/>
        <Link className='volver' to='/home'>
        <h4 >Volver</h4>
        </Link>
            <div key={stateDetalle.id}>
                <span><span style={{fontWeight:'bold'}}>ID: </span>{stateDetalle.id}</span>
                <h1>{stateDetalle.nombre}</h1>
                <h3>Capital: {stateDetalle.capital}</h3>
                <img src={stateDetalle.imagen} width='300px' alt='bandera'/>
                <h4>Continente: {stateDetalle.continente}</h4>
                <h5>Subregión: {stateDetalle.subregion}</h5>
                <h5>Área: {stateDetalle.area}km2</h5>
                <h5>Población: {stateDetalle.poblacion}</h5>
                <div>
                    <h4>Actividades:</h4>
                    <ul>  
                        {Array.isArray(stateDetalle.activities) && stateDetalle.activities.length >=1 ? stateDetalle.activities.map((e)=>{
                            return  <Link to='/actividades'><li>{e.nombre}</li></Link>
                        }) 
                    : <p>Sin actividades..</p> 
                    }
                    </ul>
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
export default connect(mapStateToProps, { getByID })(Detalle)