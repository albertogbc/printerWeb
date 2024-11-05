export interface DetallesJson{
    values: LotesRecibidos[]
}

export interface LotesRecibidos{
    pslad_lot_number: string;
    pslad_lot_quantity: string
    pslad_lot_expiration_date: string
}