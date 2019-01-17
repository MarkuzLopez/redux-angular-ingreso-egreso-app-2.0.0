import * as fromIngresoEgreso from './ingreso-egreso.actions';
import { IngresoEgresoModel } from './ingreso-egreso.model';
import { AppState } from '../app.reducer';

export interface IngresoEgresoState { 
    items:  IngresoEgresoModel[];
}

export interface AppState extends AppState { 
    ingresoEgreso: IngresoEgresoState;
}

const estadoInicial: IngresoEgresoState = { 
    items: []
}

export function ingresoEgresoReducer(state =  estadoInicial, action: fromIngresoEgreso.acciones): IngresoEgresoState { 
    
   switch(action.type) { 
       
        case fromIngresoEgreso.SET_ITEMS: 
            return { 
                //items: action.items
                items: [ /// destrui toda referencia y madnar un nuevo arreglo, para no ocasionar detalle con firebase 
                    ...action.items.map(item  => { 
                        return { 
                            ...item /// el n uevo objeto utilizando el modelo actual, pero sin referencia, para agregarlo en firebase
                        }
                    })
                ]
            }
            
           ///purgar o borrar  todos los elementos que se encuentran en el estado... 
        case fromIngresoEgreso.UNSET_ITEMS: 
             return { 
                 items: []
             }     

        default: 
            return state

   } 

}