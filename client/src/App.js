import './App.css';
import {BrowserRouter, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing.jsx';
import Home from './components/Home/Home';
import Form  from './components/PostActivity/PostActivity';
// import NavBar from './components/Navbar/Navbar';
import Detalle from './components/Detalle/Detalle';
import Actividades from './components/Actividades/Actividades';
import Act from './components/Mostrar/Act';
import { todo } from '../src/redux/actions';
import React from 'react';
// import React,{useEffect} from 'react';
// import { useDispatch } from 'react-redux'


function App() {
//   const dispatch=useDispatch()
//   useEffect(()=>{
//     dispatch(todo())
// },[])
  return (
    <React.Fragment>
    <BrowserRouter>
    <Route exact path='/' component= {Landing} />
    {/* <Route path='/home/' component={NavBar}/> */}
    <Route path='/home' component={Home} />
    <Route path='/agregar-actividad' component={Form}/>
    <Route path='/detalle/:id' component={Detalle} />
    <Route path='/actividades-todas' component={Actividades}/>
    <Route path='/actividades/:nombre' component={Act}/>
    </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
