import { useContext } from "react"
import { PresupestoContext } from "../context/PresupuestoProvider"

const usePresupuesto = () => {
  const context = useContext(PresupestoContext)
  if(!context) {
      throw new Error('useBudget must be used within a BudgetProvider')
  }
  return context
}

export default usePresupuesto