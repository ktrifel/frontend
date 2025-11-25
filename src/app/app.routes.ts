import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./kunden-list.component').then(m => m.KundenListComponent)
  }
];
