import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { Observable } from 'rxjs';
import { EtiquetaFormComponent } from '../Components/etiqueta-form/etiqueta-form.component';
import { EtiquetaRequestForm } from '../Model/EtiquetaRequestForm';
import { impresora } from '../Model/ListadoImpresorasResponse';
import { EtiquetaResponse } from '../Model/EtiquetaResponse';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  constructor() { }

  llamarListadoEpas(): Observable<any[]> {
    console.log("llamando")
    const options = {
      url: 'https://friendly-settled-slug.ngrok-free.app/api/v1/netsuiteconsultas/epas',
      headers: { 'Accept': 'application/json' 
        ,"ngrok-skip-browser-warning": "69420"
      },
    };

    return new Observable(observer => {
      CapacitorHttp.get(options)
        .then((response: HttpResponse) => {
          console.log(response)
          observer.next(response.data.items);
          
          observer.complete(); 
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          observer.error(error); 
        });
    });
  }

  obtenerDatosEpa(id: string): Observable<any> {
    const options = {
      url: `https://friendly-settled-slug.ngrok-free.app/api/v1/netsuiteconsultas/epas/${id}`,
      headers: { 'Accept': 'application/json', "ngrok-skip-browser-warning": "69420" },
    };
  
    return new Observable(observer => {
      CapacitorHttp.get(options)
        .then((response: HttpResponse) => {
          // Devuelve tanto items como headers
          observer.next({
            items: response.data.items,
            headers: response.data.headers
          });
          observer.complete(); 
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          observer.error(error); 
        });
    });
  }
  
  mandarFormularioImpresion(form: EtiquetaRequestForm): Observable<EtiquetaResponse> {
    console.log(form)
    const options = {
      url: 'https://friendly-settled-slug.ngrok-free.app/api/v1/netsuiteconsultas/llamada', 
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json', 
        "ngrok-skip-browser-warning": "69420" 
      },
      data: form 
    };

    return new Observable(observer => {
      CapacitorHttp.post(options)
        .then((response: HttpResponse) => {
          console.log('Response from POST:', response);
          observer.next(response.data); 
          observer.complete();
        })
        .catch(error => {
          console.error('Error posting data:', error);
          observer.error(error);
        });
    });
  }

  imprimeResto(form: EtiquetaRequestForm): Observable<EtiquetaResponse> {
    console.log(form)
    const options = {
      url: 'https://friendly-settled-slug.ngrok-free.app/api/v1/netsuiteconsultas/imprimeresto', 
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json', 
        "ngrok-skip-browser-warning": "69420" 
      },
      data: form 
    };

    return new Observable(observer => {
      CapacitorHttp.post(options)
        .then((response: HttpResponse) => {
          console.log('Response from POST:', response);
          observer.next(response.data); 
          observer.complete();
        })
        .catch(error => {
          console.error('Error posting data:', error);
          observer.error(error);
        });
    });
  }

  imprimePersonalizada(form: EtiquetaRequestForm): Observable<EtiquetaResponse> {
  
    const options = {
      url: 'https://friendly-settled-slug.ngrok-free.app/api/v1/netsuiteconsultas/imprimepersonalizada', 
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json', 
        "ngrok-skip-browser-warning": "69420" 
      },
      data: form 
    };

    return new Observable(observer => {
      CapacitorHttp.post(options)
        .then((response: HttpResponse) => {
          
          observer.next(response.data); 
         
         
          observer.complete();
        })
        .catch(error => {
          console.error('Error posting data:', error);
          observer.error(error);
        });
    });
  }

  llamarListadoImpresoras(): Observable<impresora[]> {
    
    const options = {
      url: 'https://friendly-settled-slug.ngrok-free.app/api/v1/impresoras/',
      headers: { 'Accept': 'application/json' 
        ,"ngrok-skip-browser-warning": "69420"
      },
    };

    return new Observable(observer => {
      CapacitorHttp.get(options)
        .then((response: HttpResponse) => {
         
          observer.next(response.data);
          
          observer.complete(); 
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          observer.error(error); 
        });
    });
  }
}