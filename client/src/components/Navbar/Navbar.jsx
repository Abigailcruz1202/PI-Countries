import React from "react";
import { NavLink } from "react-router-dom";
import  SearchBar  from "../Search/Search.jsx";

import './Navbar.css'

export default function NavBar(){

    return(
        <header style={{display:'flex', backgroundColor:'#005f97'}}>
            <div>
                <NavLink to='/'>
                    <img src='https://www.flaticon.es/svg/static/icons/svg/61/61212.svg' alt='logo avion' width='50px' />
                </NavLink>
            </div>
            <nav style={{width:'100%', display:'flex', backgroundColor:'#005f97'}}>
                <ul className='lista'>
                    <li className='items'>
                        <NavLink className='estilo' to='/home'>Inicio</NavLink>
                    </li>
                    <li>
                        <NavLink className='estilo' to='/agregar-actividad'>Nueva Actividad</NavLink>
                    </li>
                    <li>
                        <NavLink className='estilo' to='/actividades-todas'>Actividades</NavLink>
                    </li>
                    <li>
                        <SearchBar />
                    </li>
                </ul>
            </nav>
        </header>
    )
}