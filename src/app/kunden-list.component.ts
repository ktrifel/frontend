import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { KundenService } from './kunden.service';
import { Kunde } from './kunde.model';

@Component({
  selector: 'app-kunden-list',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './kunden-list.component.html',
  styleUrls: ['./kunden-list.component.scss']
})
export class KundenListComponent implements OnInit {

  displayedColumns: string[] = [
    'kundenId',
    'vorname',
    'nachname',
    'email',
    'telefonnummer',
    'stadt'
  ];

  dataSource: Kunde[] = [];

  constructor(private readonly kundenService: KundenService) {}

  ngOnInit(): void {
    this.kundenService.getKunden().subscribe({
      next: (kunden) => (this.dataSource = kunden),
      error: (err) => console.error('Fehler beim Laden der Kunden', err)
    });
  }
}
