import { useMemo } from 'react'
import usePresupuesto from '../hooks/usePresupuesto'
import { formatearDinero } from '../helpers'

// react-circular-progressbar
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"


const MostrarPresupuesto = () => {

    const {state, dispatch} = usePresupuesto()

    const totalPresupuesto = state.presupuesto
    const totalGastado = useMemo(() => state.gastos.reduce((total, gasto) => total + gasto.cantidad, 0),[state.gastos])
    const totalDisponible = useMemo(() => totalPresupuesto - totalGastado, [totalGastado])
    const porcentaje = Math.round((totalGastado / totalPresupuesto) * 100)
    

  return (
    <div className=" grid md:grid-cols-2 gap-8 items-center">
        <div className=' mx-auto'>
            <CircularProgressbar 
            styles={buildStyles({
                pathColor: porcentaje > 70 ? '#DC2626' : '#3B82F6',
                trailColor: '#F5F5F5',
                textColor: porcentaje > 70 ? '#DC2626' : '#3B82F6',
                textSize: 14
            })}
            text={`${porcentaje}% Gastado`}
            value={porcentaje}
            />
        </div>
        <div className=' space-y-5'>
            <button
                onClick={() => dispatch({type: 'reiniciar-app'})}
                type='button'
                className=' text-center uppercase text-white font-bold py-2 w-full rounded-md bg-rose-600'
            >
                Resetear App
            </button>
            <p className=' font-bold text-xl text-center'><span className=' text-sky-600'>Presupuesto: </span>{formatearDinero(totalPresupuesto)}</p>
            <p className=' font-bold text-xl text-center'><span className=' text-sky-600'>Disponible: </span>{formatearDinero(totalDisponible)}</p>
            <p className=' font-bold text-xl text-center'><span className=' text-sky-600'>Gastado: </span>{formatearDinero(totalGastado)}</p>
        </div>
    </div>
  )
}

export default MostrarPresupuesto