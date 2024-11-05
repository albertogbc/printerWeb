import { Component, EventEmitter, NgModule, Output } from '@angular/core';
import { LabelService } from '../../Service/label.service';
import { Orden } from '../../Model/ListadoEpaResponse';
import { ProductoIndividualResponse } from '../../Model/ProductoIndividualResponse';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listado-epas',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './listado-epas.component.html',
  styleUrl: './listado-epas.component.css'
})
export class ListadoEpasComponent {
  @Output() mostrarFormulario = new EventEmitter<void>();
  @Output() mostrarOrdenId= new EventEmitter<string>();
  listaEpas: Orden[] = []
  partidas: ProductoIndividualResponse | undefined 
  @Output() valorSeleccionado = new EventEmitter<ProductoIndividualResponse>();
  searchTerm: string = '';
  
  constructor(private labelService: LabelService){

  }
  ngOnInit(){
    this.labelService.llamarListadoEpas().subscribe(e=>{
      this.listaEpas = e
    })
  }
  notificar(id: string) {
    this.mostrarFormulario.emit();
    
    
  }



  imprimirDatos(id: string){
    console.log(`http://localhost/orden/${id}`)
  }

  seleccionarEpa(tranid: string, numpedido: string) {
    
    this.labelService.obtenerDatosEpa(tranid).subscribe(r=>{
      this.partidas = r
    
      this.valorSeleccionado.emit(this.partidas); 
      this.notificar(tranid ); 
      this.mostrarOrdenId.emit(numpedido)
      console.log("en viado")
    })
    
  }
  filteredEpas() {
    const searchTerm = this.searchTerm.trim(); 
    return this.listaEpas.filter(epa => {
     
      const numpedidoStr = epa.numpedido ? epa.numpedido.toString() : ''; 
      return numpedidoStr.includes(searchTerm);
    });
  }
  
  
  
  
}
