import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DetalleInventario } from '../../Model/DetalleInventario';
import { ProductoIndividualResponse } from '../../Model/ProductoIndividualResponse';
import { LabelService } from '../../Service/label.service';
import { EtiquetaRequestForm } from '../../Model/EtiquetaRequestForm';
import { impresora, ListadoImpresorasResponse } from '../../Model/ListadoImpresorasResponse';
import { EtiquetaResponse } from '../../Model/EtiquetaResponse';

@Component({
  selector: 'app-etiqueta-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './etiqueta-form.component.html',
  styleUrl: './etiqueta-form.component.css'
})
export class EtiquetaFormComponent {
  @Input() valorPorDefecto: ProductoIndividualResponse | null = null;
  @Input() headers: any; // Agregar variable para los headers
  @Input() noOrden: string | null = null
  detallesInventario: DetalleInventario[] = [];
  formularios: FormGroup[] = [];
  selectedForm: FormGroup | null = null;
 valorNoRemision: string = ""
 orden: string | null =null
 noEtiquetasResponse!: EtiquetaResponse
 listadoImpresoras!: impresora[]
  valorIdImpresora: number = 0

  constructor(private fb: FormBuilder, private labelService: LabelService) {}
ngOnInit(){
  this.labelService.llamarListadoImpresoras().subscribe(r=>{
    this.listadoImpresoras = r
   
  })
}
  ngOnChanges(changes: SimpleChanges) {
    this.valorNoRemision = ""
    
    if (changes['noOrden'] && this.noOrden) {
      this.orden = this.noOrden; 
    
    }
  
    if (changes['valorPorDefecto'] && this.valorPorDefecto) {
      this.detallesInventario = this.valorPorDefecto.items.map(item => {
        const inventoryDetailsJson = item.custcol_pslad_inventory_details_json;
        return this.extraerDetalles(inventoryDetailsJson);
      }).filter(details => details !== null) as DetalleInventario[];

      this.headers = this.valorPorDefecto.headers.items
      const getDirentrega = () => {
        const { calleentrega, numeroentrega, coloniaentrega, municipioentrega, zipentrega, estadoentrega, paisfinal } = this.headers[0];
        return calleentrega && numeroentrega && coloniaentrega && municipioentrega && zipentrega && this.obtenerNombreEstado(estadoentrega) && paisfinal
            ? `${calleentrega} ${numeroentrega} ${coloniaentrega}, ${municipioentrega} ${zipentrega} ${this.obtenerNombreEstado(estadoentrega)} ${paisfinal}`
            : '';
    };
    
    const getDirfinal = () => {
        const { callefinal, numerofinal, coloniafinal, municipiofinal, zipfinal, estadofinal, paisfinal } = this.headers[0];
        return callefinal && numerofinal && coloniafinal && municipiofinal && zipfinal && this.obtenerNombreEstado(estadofinal) && paisfinal
            ? `${callefinal} ${numerofinal} ${coloniafinal}, ${municipiofinal} ${zipfinal} ${this.obtenerNombreEstado(estadofinal)} ${paisfinal}`
            : '';
    };
    
    const getDirsubsidiaria = () => {
        const { calleprov, numeroprov, coloniaprov, municipioprov, zipprov, estadoprov, paisfinal } = this.headers[0];
        return calleprov && numeroprov && coloniaprov && municipioprov && zipprov && estadoprov && paisfinal
            ? `${calleprov} ${numeroprov} ${coloniaprov}, ${municipioprov} ${zipprov} ${estadoprov} ${paisfinal}`
            : '';
    };
      this.formularios = this.valorPorDefecto.items.map((product, i) => {
        return this.fb.group({
          direntrega: [
            getDirentrega(), 
            Validators.required
        ],
        dirfinal: [
         getDirfinal(), 
          Validators.required
      ],
      dirsubsidiaria: [
        getDirsubsidiaria(), 
        Validators.required
    ], 
          rfc: [this.headers[0].rfc, Validators.required], 
          dependencia: "INSTITUTO MEXICANO DEL SEGURO SOCIAL",
          clave: [product.ccb, Validators.required],
          codigoBarras: [product.upc, Validators.required],
          denominacionGenerica: [product.custitem_denominaciong, Validators.required],
          lote: [product.lote, Validators.required],
          cantidadDeEtiquetas: ['', Validators.required],
          formaFarmaceutica: [product.custitem_formaf, Validators.required],
          description: [product.description, Validators.required],
          fabricante: [product.nombref, Validators.required],
          regsanitario:[product.mpn, Validators.required],
          fechaFabricacion: [product.fechafabricacion, Validators.required],
          lotExpirationDate: [this.detallesInventario[i]?.values[i]?.pslad_lot_expiration_date, Validators.required],
          cantidadCustom: [''],
          numeroContrato: [this.headers[0].contrato, Validators.required], 
          numeroOrden: [this.headers[0].folio, Validators.required],
          numeroLicitacion: [this.headers[0].adjudicacion, Validators.required],
          lotQuantity: [this.detallesInventario[i]?.values[i]?.pslad_lot_quantity, Validators.required],
          lotItem: [this.detallesInventario[i]?.values[i]?.pslad_lot_item, Validators.required],
          tipoEtiqueta: "1",
          nombreentrega: [this.headers[0].nombreentrega],
          nombrefinal: [this.headers[0].nombrefinal],
          nombreprov:[this.headers[0].nombreprov],
          
          
           
           
          
          
          
        });
      });
    }
  }


  extraerDetalles(jsonString: string): DetalleInventario | null {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      console.error('Error al parsear JSON:', error);
      return null;
    }
  }


  onSelect(form: FormGroup) {
    this.selectedForm = form; 
  }

  printSelected(id: number) {
    if (this.selectedForm) {
      if (this.selectedForm.invalid) {
        alert('Hay algun campo requerido que está vacío.');
        return;
      }
      
      const form: EtiquetaRequestForm = {
        direccionEntrega: this.selectedForm.value.direntrega,
        destinoFinal: this.selectedForm.value.dirfinal,
        proveedor: this.selectedForm.value.dirsubsidiaria,
        rfc: this.selectedForm.value.rfc,
        dependencia: this.selectedForm.value.dependencia,
        clave: this.selectedForm.value.clave,
        denominacionGenerica: this.selectedForm.value.denominacionGenerica,
        lote: this.selectedForm.value.lote,
        cantidadDeEtiquetas: this.selectedForm.value.cantidadDeEtiquetas,
        formaFarmaceutica: this.selectedForm.value.formaFarmaceutica,
        descripcion: this.selectedForm.value.description,
        fabricante: this.selectedForm.value.fabricante,
        regSanitario: this.selectedForm.value.regsanitario,
        fechaFabricacion: this.selectedForm.value.fechaFabricacion,
        fechaCaducidad: this.selectedForm.value.lotExpirationDate,
        remision: this.valorNoRemision,
        numeroContrato: this.selectedForm.value.numeroContrato,
        numeroOrden: this.selectedForm.value.numeroOrden,
        numeroLicitacion: this.selectedForm.value.numeroLicitacion,
        tipoEtiqueta: this.selectedForm.value.tipoEtiqueta,
        lotQuantity: this.selectedForm.value.lotQuantity,
        codigoBarras: this.selectedForm.value.codigoBarras,
        cantidadCustom: this.selectedForm.value.cantidadCustom,
        nombreentrega: this.selectedForm.value.nombreentrega,
        nombrefinal: this.selectedForm.value.nombrefinal,
        nombreprov: this.selectedForm.value.nombreprov,
        idImpresora: this.valorIdImpresora
      };
 
      const transformedForm = this.removeAccentsFromObject(form);
      
      // Enviar el formulario transformado
      if(id == 1){
        this.labelService.mandarFormularioImpresion(transformedForm).subscribe(r => {
          this.noEtiquetasResponse = r
          
          const {noEtiquetas} = r
          window.alert(noEtiquetas + " etiquetas ")
          

        });
    
      }else if(id == 2){
        this.labelService.imprimeResto(transformedForm).subscribe(r => {
          this.noEtiquetasResponse = r
          
          const {noEtiquetas} = r
          window.alert(noEtiquetas + " etiquetas ")
        });
      }else if(id == 3){
        this.labelService.imprimePersonalizada(transformedForm).subscribe(r => {
          this.noEtiquetasResponse = r
          
          const {noEtiquetas} = r
          window.alert(noEtiquetas + " etiquetas ")
         
        });
      }
      
      
    } else {
      console.warn('No hay ningún formulario seleccionado.');
    }
  }
  
  removeAccentsFromObject<T>(obj: T): T {
    if (Array.isArray(obj)) {
      return obj.map(item => this.removeAccentsFromObject(item)) as unknown as T;
    } else if (typeof obj === 'object' && obj !== null) {
      return Object.keys(obj).reduce((acc, key) => {
        const value = (obj as any)[key];
        (acc as any)[this.removeAccents(key)] = this.removeAccentsFromObject(value);
        return acc;
      }, {} as any);
    } else if (typeof obj === 'string') {
      return this.removeAccents(obj) as unknown as T;
    }
    return obj;
  }
  
  private removeAccents(str: string): string {
    if (!str) return str; // Manejar caso nulo o indefinido
  
    // Reemplazar saltos de línea y otros caracteres especiales
    const cleanedStr = str.replace(/[\r\n]/g, ' ').trim();
    
    // Mapa de caracteres acentuados a sus equivalentes sin acento
    const accentsMap: { [key: string]: string } = {
      'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
      'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U',
      'ñ': 'n', 'Ñ': 'N'
    };
  
    // Reemplazar caracteres acentuados utilizando el mapa
    return cleanedStr.split('').map(char => accentsMap[char] || char).join('');
  }
  
  obtenerNombreEstado(abreviacion: string): string {
    let nombre: string;

    switch (abreviacion.toUpperCase()) {
        case "AGS": // Aguascalientes
            nombre = "AGUASCALIENTES";
            break;
        case "BC": // Baja California
            nombre = "BAJA CALIFORNIA";
            break;
        case "BCS": // Baja California Sur
            nombre = "BAJA CALIFORNIA SUR";
            break;
        case "CAM": // Campeche
            nombre = "CAMPECHE";
            break;
            case "CDMX": // Campeche
            nombre = "CIUDAD DE MEXICO";
            break;
        case "COA": // Coahuila
            nombre = "COAHUILA";
            break;
        case "COL": // Colima
            nombre = "COLIMA";
            break;
        case "CHIS": // Chiapas
            nombre = "CHIAPAS";
            break;
        case "CHIH": // Chihuahua
            nombre = "CHIHUAHUA";
            break;
        case "DUR": // Durango
            nombre = "DURANGO";
            break;
        case "EDOMEX": // Estado de México
            nombre = "ESTADO DE MEXICO";
            break;
        case "GTO": // Guanajuato
            nombre = "GUANAJUATO";
            break;
        case "GRO": // Guerrero
            nombre = "GUERRERO";
            break;
        case "HID": // Hidalgo
            nombre = "HIDALGO";
            break;
        case "JAL": // Jalisco
            nombre = "JALISCO";
            break;
        case "MEX": // México
            nombre = "ESTADO DE MEXICO";
            break;
        case "MIC": // Michoacán
            nombre = "MICHOACAN";
            break;
        case "MOR": // Morelos
            nombre = "MORELOS";
            break;
        case "NAY": // Nayarit
            nombre = "NAYARIT";
            break;
        case "NL": // Nuevo León
            nombre = "NUEVO LEON";
            break;
        case "OAX": // Oaxaca
            nombre = "OAXACA";
            break;
        case "PUE": // Puebla
            nombre = "PUEBLA";
            break;
        case "QUE": // Querétaro
            nombre = "QUERETARO";
            break;
        case "QR": // Quintana Roo
            nombre = "QUINTANA ROO";
            break;
        case "SLP": // San Luis Potosí
            nombre = "SAN LUIS POTOSI";
            break;
        case "SIN": // Sinaloa
            nombre = "SINALOA";
            break;
        case "SON": // Sonora
            nombre = "SONORA";
            break;
        case "TAB": // Tabasco
            nombre = "TABASCO";
            break;
        case "TAM": // Tamaulipas
            nombre = "TAMAULIPAS";
            break;
        case "TLAX": // Tlaxcala
            nombre = "TLAXCALA";
            break;
        case "VER": // Veracruz
            nombre = "VERACRUZ";
            break;
        case "YUC": // Yucatán
            nombre = "YUCATAN";
            break;
        case "ZAC": // Zacatecas
            nombre = "ZACATECAS";
            break;
        default:
            nombre = abreviacion;
            break;
    }

    return nombre;
}

onSelectImpresora(event: Event) {
  const selectElement = event.target as HTMLSelectElement; // Casting a HTMLSelectElement
  this.valorIdImpresora = Number(selectElement.value); // Asignar el id seleccionado
  console.log('ID de impresora seleccionada:', this.valorIdImpresora);
}
}