export interface ProductoIndividualResponse{
    items: datosProductoResponse[],
    headers: Headers
}

export interface datosProductoResponse{
    ccb: string,
    custcol_pslad_inventory_details_json: string
    description: string,
    fechafabricacion: string,
    id: string,
    lote: string,
    manufacturer: string,
    mpn: string,
    upc:string,
    name:string,
    precio: string,
    quantity: string,
    totalaftertaxes: string, 
    tranid: string,
    vendorname: string,
    weightunits: string
    nombref: string,
    custitem_denominaciong: string,
    custitem_formaf: string
}

export interface HeaderItem {
    contrato: string;
    custrecordNoProvImms: string;
    custrecord_representante_leg: string;
    direntrega: string;
    dirfinal: string;
    dirsubsidiaria: string;
    dropdownstate: string;
    fechafin: string;
    fechainicio: string;
    folio: string;
    iva: string;
    legalname: string;
    rfc: string;
    taxregistrationnumber: string;
    total: string;
    transaction: string;
    prueba: string;
    representante: string;
    adjudicacion: string;
    formaf: string;
    dirprov: string;
    estadoentrega: string;
    estadofinal: string;
    estadoprov: string;
    municipioentrega: string;
    municipiofinal: string;
    municipioprov: string;
    nombreentrega: string;
    nombrefinal: string;
    nombreprov: string;
    numeroentrega: string;
    numerofinal: string;
    numeroprov: string;
    numprov: string;
    paisentrega: string;
    paisfinal: string;
    paisprov: string;
    rfccte: string;
    zipentrega: string;
    zipfinal: string;
    zipprov: string;
    calleentrega: string;
    callefinal: string;
    calleprov: string;
    coloniafinal: string;
    coloniaprov: string;
    numintentrega: string;
    numintprov: string;
    coloniaentrega: string
}

export interface Headers {
    items: HeaderItem[];
}