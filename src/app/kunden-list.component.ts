import { Component, OnInit } from '@angular/core';
import { KundenService, Kunde } from './kunden.service';

@Component({
  selector: 'app-kunden-list',
  template: `
    <h2>Kundenübersicht</h2>
    <ul>
      <li *ngFor="let k of kunden">
        {{ k.vorname }} {{ k.nachname }} – {{ k.email }}
      </li>
    </ul>
  `
})
export class KundenListComponent implements OnInit {
  kunden: Kunde[] = [];

  constructor(private kundenService: KundenService) {}

  ngOnInit(): void {
    this.kundenService.list().subscribe((list) => (this.kunden = list));
  }
}
