import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { KundenListComponent } from './kunden-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatToolbarModule, KundenListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
