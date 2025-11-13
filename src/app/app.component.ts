// src/app/app.component.ts
import { Component } from '@angular/core';
import { KundenListComponent } from './kunden-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  // Wichtig: Array mit echten Komponenten
  imports: [KundenListComponent],
  template: `<app-kunden-list></app-kunden-list>`
})
export class AppComponent {}
