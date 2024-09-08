import { generarId } from "../helpers"
import { Categirias, Gasto, Gastos } from "../types"

// Mis action -> acciones
export type PresupuestoActions = 
{ type: 'definir-presupuesto', payload: { presupuesto : number} } |
{ type: 'disponible' } |
{ type: 'add-gasto', payload: { gasto : Gasto} } |
{ type: 'remove-gasto', payload: { id : Gastos['id']} } |
{ type: 'modify-gasto', payload: { id : Gastos['id']} } |
{ type: 'filtrar-gasto', payload: { categoria : Categirias['id']} } |
{ type: 'show-modal' } |
{ type: 'hide-modal' } |
{ type: 'reiniciar-app'} 

// Type para los state
export type PresupuestoState = {
    presupuesto: number
    disponible: number
    modal: boolean
    gastos: Gastos[]
    gastoId: Gastos['id']
    categoriaId: Categirias['id']
}


// Local Storage
const inicialPresupuesto = () : number => {
    const localStoragePresupuesto = localStorage.getItem('presupuesto')
    return localStoragePresupuesto ? +localStoragePresupuesto : 0
}

const inicialGasto = () : Gastos[] => {
    const localStorageGasto = localStorage.getItem('gastos')
    return localStorageGasto ? JSON.parse(localStorageGasto) : []
}

// Mi inicial state
export const inicialState : PresupuestoState = {
    presupuesto: inicialPresupuesto(),
    disponible: 0,
    modal: false,
    gastos: inicialGasto(),
    gastoId: '',
    categoriaId: ''
}


// Mi reducer
export const presupuestoReducer = (
    state: PresupuestoState = inicialState,
    action: PresupuestoActions
) => {

	if (action.type === 'definir-presupuesto') {
        
        return {
            ...state,
            presupuesto: action.payload.presupuesto,
            disponible: action.payload.presupuesto
        }
    }

    if (action.type === 'disponible') {
        
        return {
            ...state,
            disponible: state.presupuesto - (state.gastos.reduce((total, gasto) => total + gasto.cantidad, 0))
        }
    }

    if (action.type === 'show-modal') {
        
        return {
            ...state,
            modal: true
        }
    }

    if (action.type === 'hide-modal') {
        
        return {
            ...state,
            modal: false,
            gastoId: ''
        }
    }

    // Agregar nuevo Gasto
    if (action.type === 'add-gasto') {

        let newGasto : Gastos[] = [];

        if (!state.gastoId) {
            // nuevo gasto
            newGasto = [...state.gastos, {
                ...action.payload.gasto,
                id: generarId()
            }]
        } else {
            // gasto modificado
            newGasto = state.gastos.map( gasto => {
                if (gasto.id === state.gastoId) {
                    return {
                        id: state.gastoId,
                        ...action.payload.gasto
                    }
                }
                return gasto
            })
        }
        
        

        return {
            ...state,
            gastos: newGasto,
            gastoId: ''
        }
    }

    // Eliminar un Gasto
    if (action.type === 'remove-gasto') {
        
        return {
            ...state,
            gastos: state.gastos.filter( gasto => gasto.id !== action.payload.id)
        }
    }

    // Modificar un Gasto
    if (action.type === 'modify-gasto') {
        
        return {
            ...state,
            modal: true,
            gastoId: action.payload.id
        }
    }

    // Filtrar Gastos
    if (action.type === 'filtrar-gasto') {
        
        return {
            ...state,
            categoriaId: action.payload.categoria
        }
    }

		// REINICIAR TODOS LOS STATE PARA QUE NO DE ERROR
    if (action.type === 'reiniciar-app') {
        return {
            presupuesto: 0,
            disponible: 0,
            modal: false,
            gastos: [],
            gastoId: '',
            categoriaId: ''
        }
    }

    return state
}