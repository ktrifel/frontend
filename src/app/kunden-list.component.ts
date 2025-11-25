import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { KundenService } from './kunden.service';

@Component({
  selector: 'app-kunden-list',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './kunden-list.component.html',
  styleUrls: ['./kunden-list.component.scss']
})
export class KundenListComponent {

  displayedColumns = ['id', 'name', 'email', 'createdAt'];
  dataSource = [];

  constructor(private kundenService: KundenService) {}

  ngOnInit(): void {
    this.kundenService.getKunden().subscribe({
      next: (kunden: any[]) => (this.dataSource = kunden),
      error: (err: any) => console.error(err)
    });
  }
}
