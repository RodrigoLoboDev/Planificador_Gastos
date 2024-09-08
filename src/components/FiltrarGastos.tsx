import { categories } from "../data/categorias"
import usePresupuesto from "../hooks/usePresupuesto"


const FiltrarGastos = () => {

    const { dispatch } = usePresupuesto()

  return (
    <div className=" bg-white p-10 rounded-lg shadow-lg mb-5">
        <form action="">
            <div className=" space-y-2">
                <label 
                    className=" uppercase text-gray-600 font-bold"
                    htmlFor="categoria"
                >Categoría:</label>
                <select
                    className=" block w-full bg-gray-100 py-2 px-5 rounded-md text-center border border-gray-500 "
                    name="categoria" 
                    id="categoria"
                    onChange={e => dispatch({type: 'filtrar-gasto', payload: {categoria: e.target.value}})}
                >
                    <option value="">--Seleccione una Categoría--</option>
                    {categories.map(categoria => (
                        <option key={categoria.id} value={categoria.id}>{categoria.name}</option>
                    ))}
                </select>
            </div>
        </form>
    </div>
  )
}

export default FiltrarGastos