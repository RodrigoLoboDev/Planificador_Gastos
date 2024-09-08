export type Categirias = {
    id: string
    name: string
    icon: string
}

export type Gastos = {
    id: string,
    nombre: string,
    cantidad: number,
    categoria: string,
    fecha: string
}

export type Gasto = Omit<Gastos, 'id'>