// import { useEffect, useState } from "react";
import { connect } from 'react-redux';//, useSelector 
import { getCountries } from '../../redux/actions'
import NavBar from "../Navbar/Navbar";
import  Mostrar  from "../Mostrar/Mostar";
// import { NavLink } from 'react-router-dom';
import './Home.css'

// const gif = 'https://i.pinimg.com/originals/04/8c/8e/048c8e251c1a6a1a9f8b35f68dcd8b52.gif'

function Home(props) {
    // console.log(props)
    
    return (
        <div >
            <NavBar/>
            <Mostrar/>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        paises: state.paises,
    }
}

export default connect(mapStateToProps, { getCountries })(Home)

// const [tipoOrden, setTipo] = useState('');
// const [order, setOrder] = useState('');
// const [offSet, setOffSet] = useState(0);
// const [pagina, setPagina] = useState(0);
// console.log('pagina', pagina, 'offset', offSet)

// const [cargando, setCargando] = useState(false)
// useEffect(() => {
    //     setCargando(false)
// }, [props])
// useEffect(() => {
    //     props.getCountries(tipoOrden, order, offSet)
//     setCargando(true)
// }, [tipoOrden, order, offSet])

// function sigPagina() {
//     setOffSet(offSet + 10)
//     setPagina(pagina + 1)
//     setCargando(true)
    
// }
// function sigPag() {
//     setOffSet(offSet + 5)
//     setPagina(pagina + 1)
//     setCargando(true)

// }
// function prevPagina() {
    //     if (offSet >= 10) {
//         setOffSet(offSet - 10)
//         if (pagina >= 1) setPagina(pagina - 1)
        
//     } else if (offSet === 0 || offSet < 10) {
//         console.log('no se puede restar 10 ')
//     }
// }
// function prevPag() {
    //     if (offSet >= 5) {
//         setOffSet(offSet - 5)
//         if (pagina >= 1) setPagina(pagina - 1)
//     } else if (offSet === 0) {
//         console.log('no se puede restar 5 a 0')
//     }
// }
// // function ascendente() {
// //     setOrder('ASC')
// //     setOffSet(0)
// //     console.log('estoy en ascendente ', order)
// // }
// // function descendente() {
// //     setOrder('DESC')
// //     setOffSet(0)
// //     console.log('estoy en descendente ', order)
// // }
// // function poblacion() {
    // //     setTipo('poblacion')
    // //     setOffSet(0)
// //     console.log('estoy en poblacion ', tipoOrden)
// // }
// // function nombre() {
    // //     setTipo('nombre')
// //     setOffSet(0)
// //     console.log('function nombre')
// //     if (order === 'DESC') {
    // //         setOrder('ASC')
// //         console.log('estoy en nombre ', tipoOrden)
// //     }
// // }


// function cambiosTipo(e) {
//     if (e.target.value === 'nombre') {
//         setTipo('nombre')
//         setOffSet(0)
//         setPagina(0)

//     } else if (e.target.value === 'poblacion') {
    //         setTipo('poblacion')
//         setOffSet(0)
//         setPagina(0)

//     }
// }
// function cambiosOrden(e) {
    //     if (e.target.value === 'ASC') {
        //         setOrder('ASC')
        //         setOffSet(0)
//         setPagina(0)

//         console.log('estoy en ascendente ', order)
//     } if (e.target.value === 'DESC') {
//         setOrder('DESC')
//         setOffSet(0)
//         setPagina(0)

//         console.log('estoy en descendente ', order)
//     }
// }
/* {props.paises.length === 0 ? <img className='tamañoGif' src={gif} alt='gif avion' />
    : <div className='imagen'>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button style={{ margin: '5px' }} onClick={prevPag}>-5</button>
            <button style={{ margin: '4px' }} onClick={prevPagina}>←</button>
            <h4 style={{ margin: '5px' }} >{pagina}</h4>
            <button style={{ margin: '5px' }} onClick={sigPagina}>→</button>
            <button style={{ margin: '4px' }} onClick={sigPag}>+5</button>
            <br />
        </div>
        <div>
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
            </div>
        <br />

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>

        {!cargando ? props.paises.map((e) => {
                return <div key={e.id} className='tarjetas' style={{ width: '300px', height: '260px', margin: '5px', border: 'solid 2px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: ' rgb(0 0 0 / 28%)' }}>
                    <h2>{e.nombre}</h2>
                    <img src={e.imagen} width='180px' alt='bandera' />
                    <h3>{e.continente}</h3>
                </div>
            }) : <img className='tamañoGif' src={gif} alt='gif avion' />}
        </div>
    </div>
} */