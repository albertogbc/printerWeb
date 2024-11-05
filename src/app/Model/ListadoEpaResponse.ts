export interface ListadoEpaResponse{
    items: Orden[]
}

export interface Orden {
    id: string;     
    tranid: string;
    numpedido: string
  }