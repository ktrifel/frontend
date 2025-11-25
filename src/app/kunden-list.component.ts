import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { KundenService, Kunde } from './kunden.service';

@Component({
  selector: 'app-kunden-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    DatePipe
  ],
  templateUrl: './kunden-list.component.html',
  styleUrls: ['./kunden-list.component.scss']
})
export class KundenListComponent implements OnInit {

  displayedColumns = ['name', 'firma', 'email', 'telefon', 'adresse'];
  data: Kunde[] = [];
  **loading = true;**
  **error?: string;**

  constructor(private kundenService: KundenService) {}

  ngOnInit(): void {
    this.kundenService.findAll().subscribe({
      next: kunden => {
        this.data = kunden;
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.error = 'Kundendaten konnten nicht geladen werden.';
        this.loading = false;
      }
    });
  }

  formatAdresse(k: Kunde): string {
    if (!k.adresse) return '';
    const a = k.adresse;
    return `${a.strasse} ${a.hausnummer}, ${a.plz} ${a.stadt}`;
  }
}
