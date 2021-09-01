import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getByNames } from '../../redux/actions';
import Paginado from '../Home/Paginado/paginadp';

export function BusquedaNombre(){
    const estado =useSelector(state=> state.nombres)
    const [pag, setPag] = useState(1);
    const [numPaises] = useState(12)
    const indexOfLastCountry = pag * numPaises
    const indexOfFirstCountry = indexOfLastCountry - numPaises
    const pais = estado?.slice(indexOfFirstCountry, indexOfLastCountry)
    const pagina = numeroPagina => setPag(numeroPagina)

    useEffect(() => {
        console.log('estoy en useEffect')
    }, [])

    return (
        <div>
            busqueda nombre
            <Paginado numPaises={numPaises}
                todosPaises={estado.length}
                pagina={pagina} />
                <div className='orden'>
                {
                    pais ? 
                    pais.map((e, id)=>{
                       return  <div key={e.id} style={{ width: '300px', height: '260px', margin: '5px', border: 'solid 2px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: ' rgb(0 0 0 / 28%)' }}>
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
export default connect(null, {getByNames})(BusquedaNombre)