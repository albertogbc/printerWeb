export interface ListadoImpresorasResponse{
    impresoras: impresora[]
}

export interface impresora{
    id: number
    nombre: string,
    ip: string,
    puerto: number
    activo: boolean
}