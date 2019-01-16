import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { IngresoEgresoModel } from './ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, map } from 'rxjs/operators';
import { SetItemsAction, UnsetItemsAction } from './ingreso-egreso.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  ingresoEgresoListenerSubscripcion: Subscription = new Subscription();
  ingresoEgresoItemsSubscrpcion: Subscription = new Subscription();

  constructor(private firestoreBD: AngularFirestore, 
              private authService: AuthService, private store: Store<AppState>  ) { }
  
  initIngresoEgresoListener() { 
    this.ingresoEgresoListenerSubscripcion = this.store.select('auth')
        // utilizar un pipe, ya que cuando inici el servicio manda un null, 
        // y el filter permite realizar un filtro donde solo deje pasar los datos si se cumple cierta condicion
        .pipe(
          filter(auth => auth.user !== null)
        )
        .subscribe(auth => { 
          //console.log(auth.user.uid);
        this.ingresoEgresoItems(auth.user.uid);
        })
  }

  private ingresoEgresoItems(uid: string) { 
    this.ingresoEgresoItemsSubscrpcion =
    this.firestoreBD.collection(`${uid}/ingreso-egreso/items`).snapshotChanges()
        .pipe(
          map( docData => { 
            return docData.map(doc => { 
              return {
               ...doc.payload.doc.data(),
               uid: doc.payload.doc.id, /// se obtiene el id
               //...doc.payload.doc.data()  
                ///monto: doc.payload.doc.data().monto  
              }
            })
          })
        )
        .subscribe( (coleccion: any[]) => { 
          console.log(coleccion);   
         this.store.dispatch(new SetItemsAction(coleccion) )       
        })
  }

  cancelarSubscripciones() { 
    this.ingresoEgresoItemsSubscrpcion.unsubscribe();
    this.ingresoEgresoListenerSubscripcion.unsubscribe();
    this.store.dispatch(new UnsetItemsAction())
  }

  crearIngresoEgreeso(ingresoEgreso: IngresoEgresoModel) { 
     
      const user = this.authService.getUsuario();
      
      return  this.firestoreBD.doc(`${user.uid}/ingreso-egreso`).collection('items')
          .add({...ingresoEgreso});
          
  }

  borrarIngresoEgreso(uid: string) { 
    const user = this.authService.getUsuario();
    return this.firestoreBD.doc(`${user.uid}/ingreso-egreso/items/${uid}`)
           .delete();
  }

}
