import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgresoModel } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.accions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  forma: FormGroup;
  tipo = 'ingreso';

  cargando: boolean;

  loadingSubs: Subscription =  new Subscription();

  constructor(public _ingresoEgresoServis: IngresoEgresoService, private store: Store<AppState>) { }

  ngOnInit() {

    this.loadingSubs =  this.store.select('ui')
                        .subscribe(ui => this.cargando = ui.isLoading );


    this.forma = new FormGroup({ 
      'descripcion': new FormControl('', Validators.required),
      'monto': new FormControl(0, Validators.min(0))
    });
  }

  ngOnDestroy(){ 
    this.loadingSubs.unsubscribe();
  }

  crearIngresoEgreso() {  

     this.store.dispatch(new ActivarLoadingAction());

    // mandar un objeto mediante el operador expred, es obtener los pares (valores ) del modelo y enviarlo asi como el tipo
    const ingresoEgreso = new IngresoEgresoModel({...this.forma.value, tipo: this.tipo });    
    console.log(ingresoEgreso);
    this._ingresoEgresoServis.crearIngresoEgreeso(ingresoEgreso)
          .then(() => { 
            this.store.dispatch(new DesactivarLoadingAction());
            Swal('Creado', ingresoEgreso.descripcion, 'success');
            this.forma.reset({ 
              monto: 0
            })
          }).catch(error => { 
            this.store.dispatch(new DesactivarLoadingAction());
            Swal('Error', error, 'error');            
          })
  }

}
