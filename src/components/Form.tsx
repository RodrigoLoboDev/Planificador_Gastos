import { useMemo, useState } from "react"
import usePresupuesto from "../hooks/usePresupuesto"

const Form = () => {

    const [presupuesto, setPresupuesto] = useState<number>(0)

    const {dispatch} = usePresupuesto()

    // Leer el valor del formulario
    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setPresupuesto(+e.target.value)
    }

    // Validacion del formulario
    const isValid = useMemo(() => presupuesto > 0 , [presupuesto])    

    // Submit
    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        dispatch({type: 'definir-presupuesto', payload: {presupuesto: presupuesto}})
    }

  return (
    <form 
        onSubmit={handleSubmit}
        className="space-y-5"
    >
        <div className=" space-y-5">
            <label 
                className=" text-center text-blue-600 text-2xl font-bold block"
                htmlFor="presupuesto"
            >Definir Presupuesto</label>
            <input
                value={presupuesto}
                onChange={handleChange}
                id="presupuesto" 
                className=" w-full border border-slate-300 py-2 px-4 rounded-md"
                type="number" 
                name="presupuesto"
            />
        </div>

        <input 
            className=" w-full rounded-sm py-2 text-center uppercase font-bold text-white bg-blue-600 hover:bg-blue-800 cursor-pointer transition-colors disabled:opacity-40"
            type="submit"
            value={'Definir Presupuesto'} 
            disabled={!isValid}
        />
    </form>
  )
}

export default Form