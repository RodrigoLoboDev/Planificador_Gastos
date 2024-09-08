import { useMemo, useEffect } from "react"
import Form from "./components/Form"
import Modal from "./components/Modal"
import MostrarPresupuesto from "./components/MostrarPresupuesto"
import usePresupuesto from "./hooks/usePresupuesto"
import ListadoGastos from "./components/ListadoGastos"
import FiltrarGastos from "./components/FiltrarGastos"


function App() {

  const {state, dispatch} = usePresupuesto()

  const isValidPresupuesto = useMemo(() => state.presupuesto === 0, [state.presupuesto])

  // GASTOS FILTRADOS
  const gastosFiltrados = state.categoriaId ? state.gastos.filter(gasto => gasto.categoria === state.categoriaId) : state.gastos

  // Local Storage
  useEffect(() => {
    localStorage.setItem('presupuesto', JSON.stringify(state.presupuesto))
  }, [state.presupuesto])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(state.gastos))
  }, [state.gastos])

  useEffect(() => {
    dispatch({type: 'disponible'})
  }, [state.gastos])  


  return (
    <>
      <header className=" bg-blue-700 p-4">
        <h1 className=" text-white uppercase font-black text-2xl text-center">Planificador de Gastos</h1>
      </header>

      <div className=" max-w-2xl mx-auto w-[95%] mt-10 bg-white py-10 px-5 rounded-md shadow">

          {isValidPresupuesto ? <Form /> : <MostrarPresupuesto />}

      </div>

      <main className=" max-w-2xl mx-auto w-[95%] my-10">


        {!isValidPresupuesto && (
          <>
            <FiltrarGastos />

            {gastosFiltrados.length === 0 ? (
              <h2 className=" text-2xl text-gray-700 font-black">No Hay Gastos</h2>
            ) : (
              <>
                <h2 className=" text-2xl text-gray-700 font-black mb-5">Listado de Gastos</h2>
                <div className=" space-y-2">
                  
                  {gastosFiltrados.map(gasto => (
                      <ListadoGastos 
                        key={gasto.id}
                        gasto={gasto}
                      />
                    ))
                  }
                </div>
              </>
            )}

            <Modal />
          </>
        )}

        
      </main>

    </>
  )
}

export default App
