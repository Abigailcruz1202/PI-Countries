import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

export default function Landing(){

    return (
        <div className='fondo'>
             <div style={{display: 'flex',
    alignItems: 'flex-end',
    position: 'relative',
    left: '63%'}}> 
               <h1 className='titulo'>Bienvenidos...</h1> 
               <Link to='/home'>
               <img src='https://www.flaticon.es/svg/static/icons/svg/61/61212.svg' alt='logo avion' width='50px' />
               </Link>
            </div>
            
        </div>
    )
}