import { createContext, useReducer, Dispatch, ReactNode } from "react";
import { inicialState } from "../reducers/presupesto-reducer";
import { presupuestoReducer } from "../reducers/presupesto-reducer";
import { PresupuestoActions, PresupuestoState } from "../reducers/presupesto-reducer";

type PresupuestoContextProps = {
    state: PresupuestoState
    dispatch: Dispatch<PresupuestoActions>
}

type PresupuestoProviderProps = {
    children: ReactNode
}

export const PresupestoContext = createContext<PresupuestoContextProps>(null!)


export const PresupuestoProvider = ({children} : PresupuestoProviderProps) => {

    const [state, dispatch] = useReducer(presupuestoReducer, inicialState)

  return (
    <PresupestoContext.Provider
        value={{
            state,
            dispatch
        }}
    >
        {children}
    </PresupestoContext.Provider>
  )
}
