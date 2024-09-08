import { useMemo, useState, useEffect } from 'react'

import { categories } from "../data/categorias"
import usePresupuesto from '../hooks/usePresupuesto'
import { Gasto } from '../types'


const FormItems = () => {

    const { state, dispatch } = usePresupuesto()

    const [gasto, setGasto] = useState<Gasto>({
        nombre: '',
        cantidad: 0,
        categoria: '',
        fecha: ''
    })   

    // console.log(!Object.values(gasto).includes('') && gasto.cantidad !== 0);
    

    const isValid = useMemo(() => !Object.values(gasto).includes('') && gasto.cantidad !== 0, [gasto])

    useEffect(() => {
      if (state.gastoId) {
        const gasto = state.gastos.filter(gasto => gasto.id === state.gastoId)[0]
        // console.log(gasto);
        setGasto(gasto)
      }
    }, [state.gastoId])
    

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        console.log(state.presupuesto)
        console.log(state.disponible)

        // verificar si tengo disponible
        if (state.disponible > gasto.cantidad) {
            dispatch({type: 'add-gasto', payload: { gasto: gasto }})
        } else {
            alert('No tengo suficiente disponible');   
        }

        // Cerrar el modal
        dispatch({type: 'hide-modal'})
    }


  return (
    <form 
        className=" space-y-5"
        onSubmit={handleSubmit}
    >
        <legend className=" uppercase font-black text-center border-b-4 border-blue-500 text-2xl py-2">Nuevo Gasto</legend>

        <div className=" space-y-2">
            <label 
                htmlFor="nombre"
                className=" block text-xl"
            >Nombre Gasto:</label>
            <input 
                className=" w-full py-2 px-4 bg-slate-100"
                type="text" 
                id="nombre"
                placeholder="Añade el nombre del gasto" 
                name="nombre"
                value={gasto.nombre}
                onChange={(e) => setGasto({
                    ...gasto,
                    nombre: e.target.value
                })}
            />
        </div>

        <div className=" space-y-2">
            <label 
                htmlFor="cantidad"
                className=" block text-xl"
            >Cantidad:</label>
            <input 
                className=" w-full py-2 px-4 bg-slate-100"
                type="number" 
                id="cantidad"
                placeholder="Añade la cantidad del gasto. Ej 300" 
                name="cantidad"
                value={gasto.cantidad}
                onChange={(e) => setGasto({
                    ...gasto,
                    cantidad: +e.target.value
                })}
            />
        </div>

        <div className=" space-y-2">
            <label 
                htmlFor="categoria"
                className=" block text-xl"
            >Categoría:</label>
            <select 
                name="categoria" 
                id="categoria" 
                className=" w-full py-2 px-4 bg-slate-100"
                value={gasto.categoria}
                onChange={(e) => setGasto({
                    ...gasto,
                    categoria: e.target.value
                })}
            >
                <option value="">-- Seleccione --</option>
                {categories.map(categoria => (
                    <option key={categoria.id} value={categoria.id}>{categoria.name}</option>
                ))}
            </select>
        </div>

        <div className=" space-y-2">
            <label 
                htmlFor="fecha"
                className=" block text-xl"
            >Fecha:</label>
            <input 
                className=" w-full py-2 px-4 bg-slate-100"
                type="date" 
                id="fecha"
                name="fecha"
                value={gasto.fecha}
                onChange={e => setGasto({
                    ...gasto,
                    fecha: e.target.value
                })}
            />
        </div>

        <input 
            type="submit" 
            value={state.gastoId ? 'Modificar Gasto' : 'Registrar Gasto'} 
            className=" mt-5 w-full py-2 text-center uppercase text-white font-black bg-blue-600 rounded-md cursor-pointer disabled:opacity-10"
            disabled={!isValid}
        />
    </form>
  )
}

export default FormItems