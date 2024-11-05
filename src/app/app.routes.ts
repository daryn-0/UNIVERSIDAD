import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FacultadComponent } from './facultad/facultad.component';
import { EscuelaComponent } from './escuela/escuela.component';

export const routes: Routes = [
    {
        path: '',
        component : HomeComponent,
        title: 'Pagina de Inicio'
    },
    {
        path: 'facultad',
        component : FacultadComponent,
        title: 'Facultad'
    },
    {
        path: 'escuela',
        component : EscuelaComponent,
        title: 'Escuela'
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
