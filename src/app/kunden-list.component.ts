// src/app/kunden-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KundenService, Kunde } from './kunden.service';

@Component({
  selector: 'app-kunden-list',
  standalone: true,
  // für *ngFor
  imports: [CommonModule],
  templateUrl: './kunden-list.component.html'
})
export class KundenListComponent implements OnInit {
  kunden: Kunde[] = [];

  constructor(private readonly kundenService: KundenService) {}

  ngOnInit(): void {
    this.kundenService.list().subscribe(data => this.kunden = data);
  }
}
