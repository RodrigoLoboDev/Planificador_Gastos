export const generarId = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);

    return random + fecha
}

export function formatearFecha(fecha : string) : string {    

     // Crear una fecha localmente desde la cadena de entrada
     const [year, month, day] = fecha.split('-').map(Number);
     // Mes en JavaScript es 0-indexado, por eso restamos 1
     const fechaNueva = new Date(year, month - 1, day);
    
    const opciones : Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }

    return new Intl.DateTimeFormat('es-ES', opciones).format(fechaNueva)
}

export function formatearDinero(cantidad: number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'USD'
    }).format(cantidad)
}