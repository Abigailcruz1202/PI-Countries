import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { getCountries, filtrarContinente, todo, getByNames, cambiosBusqueda } from '../../redux/actions';
import { NavLink } from 'react-router-dom';


const gif = 'https://i.pinimg.com/originals/04/8c/8e/048c8e251c1a6a1a9f8b35f68dcd8b52.gif'


export function Mostrar(props) {
    // console.log('continentes',props.continentess,'paises',props.paises)
    let estado = props.continentess // donde se me guardan los paises filtrados por continente
    //    console.log('estado',estado)

    const busqueda = useSelector(state => state.cambiosBus)
    // console.log('busqieda mostrar',busqueda,'?')

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
            console.log(busqueda, '??')
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
        } if (e.target.value === 'Africa') {
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
    // function sigPag(e) {
    //     e.preventDefault()
    //     setOffSet(offSet + 5)
    //     setPagina(pagina + 1)
    //     setCargando(true)
    // }
    // function prevPag(e) {
    //     e.preventDefault()
    //     if (offSet >= 5) {
    //         setOffSet(offSet - 5)
    //         if (pagina >= 1) setPagina(pagina - 1)

    //         console.log('estoy en prevPagina ', offSet, '-5')
    //     } else if (offSet === 0) {
    //         console.log('no se puede restar 5 a 0')
    //     }
    // }


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
                            <button onClick={cambiosBusquedas}>Todo</button>
                        </div>
                        : null
                    }
                    <div>
                        {estado.length !== 0 ?
                            //estado es props.continentess.. si estado no esta vacio me va a filtar por continente
                            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                                {console.log('continentes?')}
                                {estado.map((e) => {
                                    return <div key={e.id} style={{ width: '300px', height: '260px', margin: '5px', border: 'solid 2px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: ' rgb(0 0 0 / 28%)' }}>
                                        <h2 className='color'>{e.nombre}</h2>
                                        <NavLink to={`/detalle/${e.id}`}>
                                            <img src={e.imagen} width='180px' alt='bandera' />
                                        </NavLink>
                                        <h3 className='color'>{e.continente}</h3>
                                    </div>
                                })}
                            </div>
                            : <div>
                                {props.paises.length === 0 ?
                                    //paiseses don tengo mi info ... si mi estado esta vacio me muestra un gif
                                    <img className='tamañoGif' src={gif} alt='gif avion' />
                                    : <div >
                                        {/* de lo contrario si mi estado esta cargado me va a mostrar la info */}
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {/* <button style={{ margin: '5px' }} onClick={prevPag}>-5</button> */}
                                            <button style={{ margin: '4px' }} onClick={prevPagina}>←</button>
                                            <h4 style={{ margin: '5px' }} >{pagina}</h4>
                                            <button style={{ margin: '5px' }} onClick={sigPagina}>→</button>
                                            {/* <button style={{ margin: '4px' }} onClick={sigPag}>+5</button> */}
                                            <br />
                                        </div>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>

                                            {cargando === false ?
                                                //me muestra un gif cada vez que cambia la pagina 
                                                props.paises.length <= 4 ?
                                                    <div style={{ height: '527px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                                                        {props.paises.map((e) => {
                                                            return <div key={e.id} className='tarjetas' style={{ width: '300px', height: '260px', margin: '5px', border: 'solid 2px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: ' rgb(0 0 0 / 28%)' }}>
                                                                <h2 className='color'>{e.nombre}</h2>
                                                                <NavLink to={`/detalle/${e.id}`}>
                                                                    <img src={e.imagen} width='180px' height='100px' alt='bandera' />
                                                                </NavLink>
                                                                <h3 className='color'>{e.continente}</h3>
                                                            </div>
                                                        })}
                                                    </div>

                                                    : <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                                                        {props.paises.map((e) => {
                                                            return <div key={e.id} className='tarjetas' style={{ width: '300px', height: '260px', margin: '5px', border: 'solid 2px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: ' rgb(0 0 0 / 28%)' }}>
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

                                        <br />



                                    </div>
                                }
                            </div>
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
        continentess: state.continentes,
    }
}
export default connect(mapStateToProps, { todo, getCountries, filtrarContinente, getByNames, cambiosBusqueda })(Mostrar)
// const [input, setInput] = React.useState({ nombreContinente: '' })
// useEffect(() => {
    //     props.getCountries()
// },[input])
// function handleChange(e) {
    //     setInput({
        //         ...input,
        //         [e.target.name]: e.target.value
        //     })
// }
// function handleSubmit(e) {
    //     e.preventDefault()
    //     props.filtrarContinente(input.nombreContinente)
    //     console.log(input.nombreContinente, '"input buscador" ')

    //     setInput({ nombreContinente: '' })
    // }
/* <input type='text' placeholder='Buscar...' name='nombreContinente' value={input.nombreContinente} onChange={handleChange} />
<button style={{ backgroundColor: 'black', color: 'aqua', cursor: 'pointer' }} type='submit' onClick={handleSubmit} >Buscar</button> */
//     <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>

//     {!cargando ? props.paises.map((e) => {
//         return <div key={e.id} className='tarjetas' style={{ width: '300px', height: '260px', margin: '5px', border: 'solid 2px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: ' rgb(0 0 0 / 28%)' }}>
//             <h2>{e.nombre}</h2>
//             <NavLink  to={`/detalle/${e.id}`}>
//                 <img src={e.imagen} width='180px' alt='bandera' />
//             </NavLink>
//             <h3>{e.continente}</h3>
//         </div>
//     }) : <img className='tamañoGif' src={gif} alt='gif avion' />}
//     {/* <img src='https://images.thenorthface.com/is/content/TheNorthFaceBrand/loading-transparent' alt='gif' /> */}
// </div>