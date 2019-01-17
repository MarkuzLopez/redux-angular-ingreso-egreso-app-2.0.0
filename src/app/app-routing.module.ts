import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
// import { DashboardComponent } from './dashboard/dashboard.component';

// import { dashboardRoutes } from './dashboard/dashboard.routes';

import { AuthGuardService } from './auth/auth-guard.service';

const routes: Routes = [

    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    // aplicacion de lazy-load
    { 
        path: '', // cuando llegues a esta ruta carga a el siguiente modulo
        loadChildren: './ingreso-egreso/ingreso-egreso.module#IngresoEgresoModule',
        canLoad: [AuthGuardService]
    },
    // {
    //     path: '',
    //     component: DashboardComponent,
    //     children: dashboardRoutes,
    //     canActivate: [ AuthGuardService ]
    // },
    { path: '**', redirectTo: '' }
];


@NgModule({

    imports: [
        RouterModule.forRoot( routes )
    ],
    exports: [
        RouterModule
    ]

})
export class AppRoutingModule {}
