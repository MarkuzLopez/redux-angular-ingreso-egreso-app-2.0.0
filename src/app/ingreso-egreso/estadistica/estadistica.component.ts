import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
//import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { IngresoEgresoModel } from '../ingreso-egreso.model';

import * as fromIngresoEgreso from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {

  ingreso: number;
  egreso: number;

  cuantosIngresos: number;
  cuantosEgresos: number;
  subscriptionDetalle: Subscription = new Subscription();

  public doughnutChartLabels:string[] = ['Ingresos', 'Egresos'];
  public doughnutChartData:number[] = [];

  constructor(private store: Store<fromIngresoEgreso.AppState>) { }

  ngOnInit() {
    this.subscriptionDetalle = 
        this.store.select('ingresoEgreso').subscribe(ingresoEgreso => { 
          this.contarIngresoEgreso(ingresoEgreso.items);
        })
  }

  contarIngresoEgreso(items: IngresoEgresoModel[] ) { 
      this.ingreso = 0;
      this.egreso = 0;

      this.cuantosIngresos = 0;
      this.cuantosEgresos = 0;

      items.forEach(item =>{ 
        if(item.tipo === 'ingreso') { 
          this.cuantosIngresos ++;
          this.ingreso = this.ingreso + item.monto;
        } else { 
          this.cuantosEgresos ++;
          this.egreso =  this.egreso + item.monto;
        }
      });      
      this.doughnutChartData = [this.ingreso, this.egreso];
  }

}
