import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { KundenListComponent } from './kunden-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, KundenListComponent],
  template: `
    <app-kunden-list></app-kunden-list>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Kundenportal';
}
