import React from 'react';
import { connect,useSelector } from 'react-redux';
import { getByNames } from '../../redux/actions';
import { NavLink } from "react-router-dom";
import { cambiosBusqueda } from '../../redux/actions';


export function SearchBar(props){
    // console.log('props Search',props)
    const [input, setInput] = React.useState({
        nombres:''
    })
    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    function handleClick(e){
        e.preventDefault()
        props.getByNames(input.nombres)
        setInput({nombres:''})
        props.cambiosBus('nombre')

    }
    console.log(input,'input buscador ')
    return (
        <form className='search'>
            <input type='search' placeholder='Search..' name='nombres' value={input.nombres} onChange={handleChange} />
            <NavLink to='/search'>
            <button type='submit' onClick={handleClick} >BUSCAR</button>
            </NavLink>
        </form>
    )
}
function mapStateToProps(state){
    return {
        nombres: state.nombres
    }
}
function mapDispatchToProps(dispatch){
    return {
        getByNames: (nombre) => dispatch(getByNames(nombre)),
        cambiosBus: (cambio) => dispatch(cambiosBusqueda(cambio))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchBar)