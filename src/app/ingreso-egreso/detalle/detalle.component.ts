import { Component, OnInit, OnDestroy } from '@angular/core';
import { IngresoEgresoModel } from '../ingreso-egreso.model';
import { Store } from '@ngrx/store';
//import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import Swal from 'sweetalert2';

import * as fromIngresoEgreso from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  items: IngresoEgresoModel[];
  subscripcionDetalle: Subscription = new Subscription();

  constructor(private store: Store<fromIngresoEgreso.AppState>, public ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.subscripcionDetalle =
    this.store.select('ingresoEgreso')
    .subscribe(ingresoEgreso =>{ 
      //console.log(ingresoEgreso.items);
      this.items = ingresoEgreso.items;
    })
  }

  ngOnDestroy(){ 
    this.subscripcionDetalle.unsubscribe();
  }

  borrarItem(item: IngresoEgresoModel) {
     this.ingresoEgresoService.borrarIngresoEgreso(item.uid)
         .then(() => { 
          Swal('Eliminado',item.descripcion,'success');
         }).catch(error => { 
           console.error(error);
         })
  }

}
