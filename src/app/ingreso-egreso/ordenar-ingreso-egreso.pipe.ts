import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgresoModel } from './ingreso-egreso.model';

@Pipe({
  name: 'ordenarIngresoEgreso'
})
export class OrdenarIngresoEgresoPipe implements PipeTransform {

  // transform(value: any, args?: any): any {
  //   return null;
  // }

  transform(items: IngresoEgresoModel[] ): IngresoEgresoModel[] {

      /// ordena los elementos de un array localmente y devuelve el array
      return items.sort( (a,b) => { 
          if(a.tipo === 'ingreso' ) { 
              return -1;
          }else { 
            return 1;
          }
      });
  }

} 
