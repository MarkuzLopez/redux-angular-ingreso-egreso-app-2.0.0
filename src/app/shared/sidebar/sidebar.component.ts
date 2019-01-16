 import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { auth } from 'firebase';
import { IngresoEgresoService } from '../../ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {

  nombre: string;
  subscriptionSidebar: Subscription = new Subscription();

  constructor( public authService: AuthService, public _store: Store<AppState>, public inresoEgresoService: IngresoEgresoService ) { }

  ngOnInit() {
    this._store.select('auth')
        .pipe(
          filter(auth => auth.user !== null )
        )
        .subscribe(resp => { 
          console.log(resp);          
          this.nombre = resp.user.nombre;
    })
  }
  
  ngOnDestroy(){ 
    this.subscriptionSidebar.unsubscribe();
  }

  logout() {
    this.authService.logout();
    this.inresoEgresoService.cancelarSubscripciones();
  }

}
