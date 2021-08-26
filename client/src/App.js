import './App.css';
import {BrowserRouter, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing.jsx';
import Home from './components/Home/Home';
import Form  from './components/PostActivity/PostActivity';
// import NavBar from './components/Navbar/Navbar';
import Detalle from './components/Detalle/Detalle';
import Mostrar from './components/Mostrar/BusquedaNombres';
import Actividades from './components/Actividades/Actividades';

function App() {
  return (
    <BrowserRouter>
    <Route exact path='/' component= {Landing} />
    {/* <Route path='/home/' component={NavBar}/> */}
    <Route path='/home' component={Home} />
    <Route path='/agregar-actividad' component={Form}/>
    <Route path='/detalle/:id' component={Detalle} />
    <Route path='/prueba' component={Mostrar}/>
    <Route path='/actividades' component={Actividades}/>
    </BrowserRouter>
  );
}

export default App;
