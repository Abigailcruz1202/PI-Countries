import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { todasActividades } from '../../redux/actions';
import NavBar from '../Navbar/Navbar';

export function Actividades(){
    return(
        <div>
            <NavBar/>
            actividades
        </div>
    )
}

export default connect(null, {todasActividades})(Actividades)