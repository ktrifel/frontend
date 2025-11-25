import { Routes } from '@angular/router';
import { KundenListComponent } from './kunden-list.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'kunden', pathMatch: 'full' },
  { path: 'kunden', component: KundenListComponent }
];
