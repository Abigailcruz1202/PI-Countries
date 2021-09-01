import { useSelector} from 'react-redux'

function Paginado ({numPaises,todosPaises, pagina}){
//numPaises= paises por pagina 
//todosPaises = todos los paises 
// pagina = paginacion 
// numeroPagina = numero de paginas 

const continentess =useSelector(state=> state.continentes)
console.log('continentes paginado', continentess)
const numeroPagina =[]
for (let i= 1; i<= Math.ceil(todosPaises/numPaises); i++){
    numeroPagina.push(i)

}
console.log(numeroPagina)   
return(
        <>
        <div>
            <ul className='pag' >
                {numeroPagina.map(e=>(
                    <li key={e} className= "numeroPg"> 
                         <button onClick={()=> pagina(e)}>
                             {e}
                         </button>
                    </li>
                )
                )}
            </ul>
        </div>
        </>
    )
}

export default Paginado