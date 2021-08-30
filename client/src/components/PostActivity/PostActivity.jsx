import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { postActivity, getCountries, getByNames, todo } from '../../redux/actions';
import NavBar from '../Navbar/Navbar';

import './PostActivity.css'

export function Form(props) {// nombre, dificultad,duracion, temporada, paises
    // console.log('soy From',props)
    //const
    const [paises, setPaises] = React.useState([])
    const [nombre, setActividad] = React.useState('');
    const [dificultad, setDificultad] = React.useState('');
    const [duracion, setDuracion] = React.useState('');
    const [temporada, setTemporada] = React.useState('');
    const [paisesAgregados, setPaisesAgregados] = React.useState([]);

    console.log('states: paises: ', paises, 'nombre: ', nombre, 'Dificultad: ', dificultad, 'Duracion: ', duracion, 'Temporada: ', temporada)

    const [nombres, setNombres] = React.useState('')
    // console.log('estado nombres: ',nombres)
    const temporadas = ['Verano', 'Otoño', 'Invierno', 'Primavera'];

    useEffect(() => {
        props.getCountries()
    }, [])
    useEffect(() => {
        props.getTodo()
    }, [])


    const handleClick = (e) => {
        if (e.target.name === 'temporada') {
            setTemporada(e.target.value)
        }
        if (e.target.name === 'dificultad') {
            setDificultad(e.target.value)
        }
    };
    function agregarPais(e) {
        e.preventDefault()
        if (paises.includes(nombres)) {
            alert('No es posble volver a agregar el mismo pais')
        } else {
            setPaises([...paises, nombres])
            setPaisesAgregados([...paisesAgregados, nombres])
            console.log(paisesAgregados,'agregaoss?')
        }
    }
    function cambioPais(e) {
        setNombres(e.target.value)
    }
    function sacarPais(e){
        setPaises( paisesAgregados.filter((p)=> p !== e.target.value))
        setPaisesAgregados( paisesAgregados.filter((p)=> p !== e.target.value))
        
        setNombres('')
        alert(`Se eliminó ${e.target.value}` )
    }
    function cambios(e) {
        if (e.target.name === 'actividad') setActividad(e.target.value)
        if (e.target.name === 'dificultad') setDificultad(e.target.value)
        if (e.target.name === 'duracion') setDuracion(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        e.target.reset()
        if (nombre && dificultad && duracion && temporada && paises) {
            props.postActivity({ nombre, dificultad, duracion, temporada, paises })
            alert('Se creo correctamente la actividad')
        }
        
        setPaises([])
        setActividad('')
        setDificultad('')
        setDuracion('')
        setTemporada('')
        // setNombres('')
    }

    return (
        <form className='fondoPost' onSubmit={handleSubmit}>
            <NavBar />
            <h1 className='h1Actividad'>Crear Actividad</h1>
            <div className='divForm'>
                <div className='labels'>
                    <label>Nombre: </label>
                    <input className='inputs' type='text' name='actividad' placeholder='nombre..' onChange={(e) => cambios(e)} value={nombre} />
                </div>
                <div className='labels'>
                    <label>Dificultad: </label>
                    {/* <input className='inputs'  type='text' name='dificultad' placeholder='dificultad..' onChange={(e)=>cambios(e)} value={dificultad} /> */}
                    <div>
                        <input type='radio' name='dificultad' value='1' onChange={handleClick} />
                        <label className='labelsTemporada'>1</label>
                        <input type='radio' name='dificultad' value='2' onChange={handleClick} />
                        <label className='labelsTemporada'>2</label>
                        <input type='radio' name='dificultad' value='3' onChange={handleClick} />
                        <label className='labelsTemporada'>3</label>
                        <input type='radio' name='dificultad' value='4' onChange={handleClick} />
                        <label className='labelsTemporada'>4</label>
                        <input type='radio' name='dificultad' value='5' onChange={handleClick} />
                        <label className='labelsTemporada'>5</label>

                    </div>
                </div>
                <div className='labels'>
                    <label>Duracion: </label>
                    <input className='inputs' type='text' name='duracion' placeholder='duracion..' onChange={(e) => cambios(e)} value={duracion} />
                </div>
                <label className='labels'>Temporada: </label>
                <div>
                    <input type='radio' name='temporada' value={temporadas[0]} onChange={handleClick} />
                    <label className='labelsTemporada'>{temporadas[0]}</label>
                    <input type='radio' name='temporada' value={temporadas[1]} onChange={handleClick} />
                    <label className='labelsTemporada'>{temporadas[1]}</label>
                    <input type='radio' name='temporada' value={temporadas[2]} onChange={handleClick} />
                    <label className='labelsTemporada'>{temporadas[2]}</label>
                    <input type='radio' name='temporada' value={temporadas[3]} onChange={handleClick} />
                    <label className='labelsTemporada'>{temporadas[3]}</label>
                </div>

                <label className='labels'>Paises: </label>
                <div>
                    <select onChange={(e) => cambioPais(e)}>
                        <option >Seleccionar paises</option>

                        {props.todos.map((pais) => {
                            return <>
                                <option key={pais.id} value={pais.nombre}>{pais.nombre}</option>
                            </>
                        })}
                    </select>
                    <button onClick={agregarPais}>agregar</button>
                </div>
                {paises.length > 0 ?
                    <div>
                        <select  onChange={sacarPais}>
                            <option >Paises seleccionados</option>
                            {paises.map((p) => {
                                return <>
                                    <option key={p.id} value={p}> {p + '.... X'}</option>
                                </>
                            })}
                        </select>
                    </div>
                    : null}
                <div className='divInput'>
                    <button type="submit" >Crear</button>
                </div>
            </div>
        </form>
    )
}
function mapStateToProps(state) {
    return {
        paises: state.paises,
        nombres: state.nombres,
        todos: state.todo,
        actividades: state.actividades

    }
}
function mapDispatchToProps(dispatch) {
    return {
        postActivity: (actividad) => dispatch(postActivity(actividad)),
        getCountries: () => dispatch(getCountries()),
        getByNames: (nombre) => dispatch(getByNames(nombre)),
        getTodo: () => dispatch(todo())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Form)

// function current(e){
//     let btnContainer = document.getElementsByClassName("page-number");
//     for (let i = 0; i < btnContainer.length; i++) {
//         if(btnContainer[i].classList.contains('active')) btnContainer[i].classList.remove('active')          
//     }
//     e.target.className = 'page-number active'
// }    