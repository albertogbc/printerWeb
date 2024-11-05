import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoIndividualResponse } from '../../Model/ProductoIndividualResponse';
import { ListadoEpasComponent } from '../listado-epas/listado-epas.component';
import { EtiquetaFormComponent } from '../etiqueta-form/etiqueta-form.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, ListadoEpasComponent, EtiquetaFormComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  mostrarFormulario = false;
  ordenNo: string | null = null
valorPorDefecto: ProductoIndividualResponse | null = null

  mostrarForm() {
    this.mostrarFormulario = true;
  }

  manejarValorSeleccionado(valor: ProductoIndividualResponse) {
    this.valorPorDefecto = valor; 
  
  
   
  }

  recuperarOrden(valorOrden: string){
    this.ordenNo = valorOrden
    console.log(valorOrden)
  }
}
