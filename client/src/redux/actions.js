import axios from 'axios'
export const GET_COUNTRIES = 'GET_COUNTRIES';
export const GET_BY_NAMES = 'GET_BY_NAMES';
export const GET_BY_ID = 'GET_BY_ID';
export const POST_ACTIVITY = 'POST_ACTIVITY';
export const FILTER_CONTINENT = 'FILTER_CONTINENT';
export const FILTER_ACTIVITY = 'FILTER_ACTIVITY';
export const GET_ALL = 'GET_ALL'
export const GET_ACTIVITIES = 'GET_ACTIVITIES'
export const CAMBIOS = 'CAMBIOS'
//react select
let URL_COUNTRIES = 'http://localhost:3001/countries'
let URL_ACTIVITY = 'http://localhost:3001/activity'
// tipoOrden = nombre || poblacion; order = asc || desc; offSet = omitir desde X numero
export function getCountries(tipoOrden, order, offSet) {
    // console.log('order???',order)
    // console.log('actions??????', 'tipo: ',tipo, ' order: ', order, ' offset: ', offSet)
    !offSet ? offSet = 0 : offSet = offSet;
    // order === undefined || order === 'ASC' ? order = 'ASC' : order = order;
    // let tipoOrden;
    // !tipo || tipo === 'nombre' ? tipoOrden = 'nombre'  :  tipoOrden = 'poblacion'
    
    // console.log('getCountries actions??????', 'tipo: ', tipoOrden, ' order: ', order, ' offset: ', offSet)
    
    if ( tipoOrden && order) {
        return function (dispatch) {
            console.log(' action, if?')
            return fetch(`${URL_COUNTRIES}?offset=${offSet}&order=${order}&tipo=${tipoOrden}`)
                .then(res => res.json())
                .then(json => {
                    // console.log('json tipo, orden, offset', json)
                    dispatch({
                        type: GET_COUNTRIES,
                        payload: json // json.data?
                    })
                })
        }
    } else if ( order ) {
        return function (dispatch) {
            console.log(' action, order?')
            return fetch(`${URL_COUNTRIES}?order=${order}&offset=${offSet}`)
                .then(res => res.json())
                .then(json => {
                    // console.log('json orden', json)
                    dispatch({
                        type: GET_COUNTRIES,
                        payload: json // json.data?
                    })
                })
        }
    }else if(tipoOrden){
        return function (dispatch) {
            console.log(' action, tipo?')
            return fetch(`${URL_COUNTRIES}?tipo=${tipoOrden}&offset=${offSet}`)
                .then(res => res.json())
                .then(json => {
                    // console.log('json tipo', json)
                    dispatch({
                        type: GET_COUNTRIES,
                        payload: json // json.data?
                    })
                })
        }
    }else{
        return function (dispatch) {
            // console.log('else')
            return fetch(`${URL_COUNTRIES}?offset=${offSet}`)
                .then(res => res.json())
                .then(json => {
                    // console.log('json action getCountries', json)
                    dispatch({
                        type: GET_COUNTRIES,
                        payload: json 
                    })
                })
        }
    }
}

export function getByNames(nombre,offSet) {
    offSet === undefined ? offSet = 0 : offSet = offSet;
    console.log('nombre???????????',nombre)
    console.log('offset',offSet)
    return function (dispatch) {
        return fetch(`${URL_COUNTRIES}?name=${nombre}&offset=${offSet}`)
            .then(res => res.json())
            .then(json => {
                // console.log('estoy en action getbynames', json)
                dispatch({
                    type: GET_BY_NAMES,
                    payload: json
                })
            })
    }
}

export function getByID(id) {
    return function (dispatch) {
        return fetch(`${URL_COUNTRIES}/${id}`)
            .then(res => res.json())
            .then(json => {
                dispatch({
                    type: GET_BY_ID,
                    payload: json 
                })
            })
    }
}

// export function postActivity(actividad) {
//     console.log('actividad "input",', actividad)
//     return function (dispatch) {
//         return fetch(`${URL_ACTIVITY}`, {
//             method: 'POST',
//             body: JSON.stringify(actividad),
//             headers: { 'Content-Type': 'application/json' }
//         })
//             .then(res => res.json())
//             .then(json => {
//                 dispatch({
//                     type: POST_ACTIVITY,
//                     payload: json
//                 })
//             })
//     }
// }
export function postActivity(actividad){
    console.log('actividad?????', actividad)
   
    return function(dispatch){
        axios.post(`${URL_ACTIVITY}`,actividad)
        .then((resp)=>{
            dispatch({
                type: POST_ACTIVITY,
                payload: resp.data
            })
        })
    }
}

export function todo(){
    return function (dispatch) {
        // console.log('todo action')
        return fetch(`http://localhost:3001/todo`)
            .then(res => res.json())
            .then(json => {
                // console.log('json todo', json)
                dispatch({
                    type: GET_ALL,
                    payload: json 
                })
            })
    }
}

export function todasActividades(){
    return function (dispatch){
    return fetch('http://localhost:3001/activity/todas')
    .then(res => res.json())
    .then(json =>{
        // console.log(json)
        dispatch({
            type: GET_ACTIVITIES,
            payload: json
        })
    })
}
}
export function filtrarContinente(continente){
    // console.log('action filter continent',continente,'???')
    return {
        type: FILTER_CONTINENT,
        payload: continente
    }
}
export function cambiosBusqueda(cambios){
    console.log('action CAMBIOS',cambios,'???')
    return {
        type: CAMBIOS,
        payload: cambios
    }
}
export function filtrarActividad(nombreAct){
    return{
        type: FILTER_ACTIVITY,
        payload: nombreAct
    }
}