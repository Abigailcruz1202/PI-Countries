import { GET_COUNTRIES, GET_BY_NAMES, GET_BY_ID, POST_ACTIVITY, FILTER_CONTINENT , GET_ALL, GET_ACTIVITIES} from './actions';

const initialState = {
    paises: [],
    nombres: [],
    detalle: [],
    actividades: [],
    todo:[],
    continentes:[],
    todasActividades:[]
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                paises: action.payload
            };
        case GET_BY_NAMES:
            return {
                ...state,
                nombres: action.payload
            };
        case GET_BY_ID:
            return {
                ...state,
                detalle: action.payload
            };
        case POST_ACTIVITY:
            console.log('estoyn es post reducer')
            return {
                ...state,
                actividades: state.actividades.concat(action.payload)
            };
        case FILTER_CONTINENT:
            return{
                ...state,
                continentes:  state.todo.filter((pais)=> pais.continente === action.payload)
            }
        case GET_ALL:
            return{
                ...state,
                todo: action.payload
            }
        case GET_ACTIVITIES:
            return {
                ...state,
                todasActividades: state.todasActividades.concat(action.payload)
            }
        default:
            return state;
    }
}
console.log('state redur: ' ,initialState)
export default rootReducer;