// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [KundenListComponent],
  template: `<app-kunden-list></app-kunden-list>`
})
export class AppComponent {}
