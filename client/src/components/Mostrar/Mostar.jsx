import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { getCountries, filtrarContinente, todo, getByNames, cambiosBusqueda, todasActividades, filtrarActividad } from '../../redux/actions';
import { NavLink } from 'react-router-dom';
import FiltradoContinente from './FiltradoContinente';

import './mostrar.css'

const gif = 'https://i.pinimg.com/originals/04/8c/8e/048c8e251c1a6a1a9f8b35f68dcd8b52.gif'

export function Mostrar(props) {
    // console.log('continentes',props.continentess,'paises',props.paises)
    let estado = props.continentess // donde se me guardan los paises filtrados por continente
    let actividads = props.detalles

    const busqueda = useSelector(state => state.cambiosBus)

    const [Continente, setContinente] = React.useState({});
    const [cargando, setCargando] = React.useState(false)
    const [tipoOrden, setTipo] = useState('');
    const [order, setOrder] = useState('');
    const [pagina, setPagina] = useState(0);
    const [offSet, setOffSet] = useState(0);

    useEffect(() => {
        if (busqueda === 'todo' || busqueda === '') {
            props.getCountries(tipoOrden, order, offSet)
            setCargando(true)
        }

    }, [tipoOrden, order, offSet, busqueda])
    useEffect(() => {
        if (busqueda === 'nombre') {
            setOffSet(0)
            setPagina(0)
        }
    }, [props, busqueda])
    useEffect(() => {
        setCargando(false)
    }, [props])

    useEffect(() => {
        props.filtrarContinente(Continente)
    }, [Continente])
    useEffect(() => {
        props.todo()
        props.todasActividades()
    }, [])
    function cambiosBusquedas(e) {
        e.preventDefault()
        props.cambiosBusqueda('todo')
        setOffSet(0)
        setPagina(0)
    }
    function cambioContinente(e) {
        if (e.target.value === 'seleccionar') {
            setContinente({})
        }
        if (e.target.value === 'Americas') {
            setContinente('Americas')
        }
        if (e.target.value === 'Asia') {
            setContinente('Asia')
        }
        if (e.target.value === 'Oceania') {
            setContinente('Oceania')
        }
        if (e.target.value === 'Europe') {
            setContinente('Europe')
            setContinente('Africa')
        }
    }
    function cambiosTipo(e) {
        if (e.target.value === 'nombre') {
            setTipo('nombre')
            setOffSet(0)
            setPagina(0)
        } else if (e.target.value === 'poblacion') {
            setTipo('poblacion')
            setOffSet(0)
            setPagina(0)
        }
    }
    function cambiosOrden(e) {
        if (e.target.value === 'ASC') {
            setOrder('ASC')
            setOffSet(0)
            setPagina(0)
        } if (e.target.value === 'DESC') {
            setOrder('DESC')
            setOffSet(0)
            setPagina(0)
        }
    }
    function sigPagina(e) {
        e.preventDefault()
        setOffSet(offSet + 10)
        setPagina(pagina + 1)
        setCargando(true)
    }
    function prevPagina(e) {
        e.preventDefault()
        if (offSet >= 10) {
            setOffSet(offSet - 10)
            if (pagina >= 1) setPagina(pagina - 1)
        } else if (offSet === 0 || offSet < 10) {
            console.log('no se puede restar 10 ')
        }
    }
    function redir(e) {
        window.location.href = `http://localhost:3000/actividades/${e.target.value}`
    }
    return (
        <>
            <div className='imagen'>
                <div className='imagen'>
                    {props.paises.length !== 0 ?
                        <div >
                            <select onChange={(e) => cambioContinente(e)}>
                                <option value='seleccionar'>Seleccionar Continente</option>
                                <option value='Americas'>America</option>
                                <option value='Asia'>Asia</option>
                                <option value='Oceania'>Oceania</option>
                                <option value='Europe'>Europa</option>
                                <option value='Africa'>Africa</option>
                            </select>
                            <select onChange={(e) => cambiosOrden(e)}>
                                <option>Ordenar por:</option>
                                <option value='ASC'>Ascendente</option>
                                <option value='DESC'>Descendente</option>
                            </select>
                            <select onChange={(e) => cambiosTipo(e)}>
                                <option>Ordenar por tipo:</option>
                                <option value='nombre'>Nombre</option>
                                <option value='poblacion'>Poblacion</option>
                            </select>
                            <select onChange={(e) => redir(e)}>
                                <option>Filtar Actividad</option>
                                {Array.isArray(actividads) && actividads.length >= 1 ?
                                    actividads.map((e) => {
                                        return <option key={e.id} value={e.nombre}>{e.nombre}</option>
                                    })
                                    : null
                                }
                            </select>
                            <button onClick={cambiosBusquedas}>Todo</button>
                        </div>
                        : null
                    }
                    <div>
                        {estado.length !== 0 ?
                            Continente === 'Americas' || Continente === 'Asia' || Continente === 'Oceania' || Continente === 'Europe' || Continente === 'Africa'
                                ? <FiltradoContinente Continente={Continente} />
                                : <div>
                                    {props.paises.length === 0 ?
                                        //paiseses don tengo mi info ... si mi estado esta vacio me muestra un gif
                                        <img className='tamañoGif' src={gif} alt='gif avion' />
                                        : <div >
                                            {/* de lo contrario si mi estado esta cargado me va a mostrar la info */}
                                            <div className='paginadoTodo' >
                                                <button style={{ margin: '4px' }} onClick={prevPagina}>←</button>
                                                <h4 className='marginPaginadoTodo' >{pagina}</h4>
                                                <button className='marginPaginadoTodo'  onClick={sigPagina}>→</button>
                                                <br />
                                            </div>
                                            <div className='ContenedorTodo'>

                                                {cargando === false ?
                                                    //me muestra un gif cada vez que cambia la pagina 
                                                    props.paises.length <= 4 ?
                                                        <div className='divPocosPaises'>
                                                            {props.paises.map((e) => {
                                                                return <div key={e.id} className='tarjetas'>
                                                                    <h2 className='color'>{e.nombre}</h2>
                                                                    <NavLink to={`/detalle/${e.id}`}>
                                                                        <img src={e.imagen} width='180px' height='100px' alt='bandera' />
                                                                    </NavLink>
                                                                    <h3 className='color'>{e.continente}</h3>
                                                                </div>
                                                            })}
                                                        </div>

                                                        : <div className='divPaisess'>
                                                            {props.paises.map((e) => {
                                                                return <div key={e.id} className='tarjetas'>
                                                                    <h2 className='color'>{e.nombre}</h2>
                                                                    <NavLink to={`/detalle/${e.id}`}>
                                                                        <img src={e.imagen} width='180px' height='100px' alt='bandera' />
                                                                    </NavLink>
                                                                    <h3 className='color'>{e.continente}</h3>
                                                                </div>
                                                            })}
                                                        </div>
                                                    : <img className='tamañoGif' src={gif} alt='gif avion' />
                                                }

                                            </div>
                                        </div>
                                    }
                                </div>
                            : null
                        }
                    </div>
                </div>

            </div>
        </>
    )
}
function mapStateToProps(state) {
    return {
        paises: state.paises,
        continentess: state.paises,
        detalles: state.todasActividades,
    }
}
export default connect(mapStateToProps, { todo, getCountries, filtrarContinente, getByNames, cambiosBusqueda, todasActividades })(Mostrar)