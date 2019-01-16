import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { IngresoEgresoModel } from './ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private firestoreBD: AngularFirestore, private authService: AuthService  ) { }
  
  
  crearIngresoEgreeso(ingresoEgreso: IngresoEgresoModel) { 
     
      const user = this.authService.getUsuario();
      
      return  this.firestoreBD.doc(`${user.uid}/ingreso-egreso`).collection('items')
          .add({...ingresoEgreso});
          
  }
}
