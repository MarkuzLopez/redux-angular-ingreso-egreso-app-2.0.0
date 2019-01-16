import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import {  filter } from 'rxjs/operators';
import { auth } from 'firebase';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {

  nombre: string;
  subscriptionNavbar: Subscription = new Subscription();

  constructor(private _store: Store<AppState>) { }

  ngOnInit() {
      this.subscriptionNavbar =
        this._store.select('auth')
          .pipe(
            filter(auth => auth.user !== null)
          )
          .subscribe(usuario =>{ 
             this.nombre = usuario.user.nombre;
        })
  }

  ngOnDestroy() { 
    this.subscriptionNavbar.unsubscribe();
  }

}
