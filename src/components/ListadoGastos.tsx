import { formatearFecha, formatearDinero } from "../helpers"
import { Gastos } from "../types"
import { categories } from '../data/categorias'

import { 
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
 } from 'react-swipeable-list'
 import "react-swipeable-list/dist/styles.css"
import usePresupuesto from "../hooks/usePresupuesto"

type ListadoGastosProps = {
    gasto: Gastos
}

const ListadoGastos = ({gasto} : ListadoGastosProps) => {    

    const {dispatch} = usePresupuesto()

    const icono = categories.find(categoria => categoria.id === gasto.categoria)    

    const leadingActions = () => ( // Cambiamos las llaves a parentesis para usar un componente
        // console.log('Editar')
        <LeadingActions>
            <SwipeAction onClick={() => dispatch({type: 'modify-gasto', payload: { id : gasto.id}})}>
                Editar
            </SwipeAction>
        </LeadingActions>
    )
    
    const trailingActions = () => (
        // console.log('Eliminar')
        <TrailingActions>
            <SwipeAction 
                onClick={() => dispatch({type: 'remove-gasto', payload: { id : gasto.id}})}
                destructive={true}
            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

  return (
    <SwipeableList>
        <SwipeableListItem
            leadingActions={leadingActions()}
            trailingActions={trailingActions()}
        >
            <div className=" bg-white shadow-lg p-5 w-full border-b border-gray-200 flex gap-5 items-center">
                <div className=" w-20">
                    <img src={`/icono_${icono?.icon}.svg`} alt="Icono Categoria" />
                </div>
                <div className=" flex-1 space-y-2">
                    <p className=" text-sm font-bold uppercase text-slate-500">{icono?.name}</p>
                    <p>{gasto.nombre}</p>
                    <p className=" text-slate-600 text-sm">{formatearFecha(gasto.fecha)}</p>
                </div>
                <div>
                    <p className=" text-2xl font-bold">{formatearDinero(gasto.cantidad)}</p>
                </div>
            </div>
        </SwipeableListItem>
    </SwipeableList>
  )
}

export default ListadoGastos