import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ListaSiglasComponent } from '../lista-siglas/lista-siglas.component';

/**
 * @constant
 * @type {Routes}
 * constante que guarda as rotas
 */
export const ROUTES : Routes = [
    {path: '' , component: DashboardComponent},
    {path: 'siglas' , component: ListaSiglasComponent}
]