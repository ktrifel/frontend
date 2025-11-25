import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
// MatSortModule already listed in imports array
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { KundenService } from './kunden.service';
import { Kunde } from './kunde.model';
import { KundenDialog } from './kunden-dialog.component';
import { ConfirmDialog } from './confirm-dialog.component';

@Component({
  selector: 'app-kunden-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatDividerModule,
  MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './kunden-list.component.html',
  styleUrls: ['./kunden-list.component.scss']
})
export class KundenListComponent implements OnInit, AfterViewInit {

  displayedColumns = ['name', 'firma', 'email', 'telefon', 'adresse'];
  dataSource = new MatTableDataSource<Kunde>([]);
  // keep compatibility with templates that referenced `data`
  get data(): Kunde[] { return this.dataSource.data; }
  loading = true;
  error?: string;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.reload();
  }

  applyFilter(value: string) {
    const v = (value || '').trim().toLowerCase();
    this.dataSource.filter = v;
  }

  constructor(private readonly kundenService: KundenService, private readonly dialog: MatDialog, private readonly snackBar: MatSnackBar) {
    // set up filter predicate to search multiple fields
    this.dataSource.filterPredicate = (data: Kunde, filter: string) => {
      const f = filter.trim().toLowerCase();
      const parts = [data.vorname, data.nachname, data.firma, data.email, data.telefonnummer]
        .filter(Boolean)
        .map(s => (s as string).toLowerCase())
        .join(' ');
      return parts.includes(f);
    };
  }

  ngAfterViewInit(): void {
    // attach paginator & sort once views exist
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  get displayedColumnsWithActions(): string[] {
    return [...this.displayedColumns, 'actions'];
  }

  formatAdresse(k: Kunde): string {
    if (!k.adresse) return '';
    const a = k.adresse;
    return `${a.strasse} ${a.hausnummer}, ${a.plz} ${a.stadt}`;
  }

  reload(): void {
    this.loading = true;
    this.error = undefined;
    this.kundenService.findAll().subscribe({
      next: kunden => {
        this.dataSource.data = kunden;
        // ensure paginator/sort are attached in case they exist
        try { if (this.paginator) this.dataSource.paginator = this.paginator; } catch {}
        try { if (this.sort) this.dataSource.sort = this.sort; } catch {}
        this.loading = false;
      },
      error: err => {
        console.error('Fehler beim Laden der Kundendaten', err);
        // prefer a readable message
        this.error = err?.message || ('Kundendaten konnten nicht geladen werden (Status ' + (err?.status || 'unknown') + ')');
        // capture debug detail
        (this as any).lastError = err;
        this.loading = false;
      }
    });
  }

  debugLastError() {
    // helpful during development to inspect the last error object
    // eslint-disable-next-line no-console
    console.log('lastError', (this as any).lastError);
  }

  add(): void {
    const ref = this.dialog.open<KundenDialog, Kunde | null>(KundenDialog, { data: null });
    ref.afterClosed().subscribe((result: Kunde | null) => {
      if (!result) return;
      this.kundenService.create(result).subscribe({
        next: k => { this.snackBar.open('Kunde erstellt', 'OK', { duration: 2000 }); this.reload(); },
        error: err => { console.error(err); this.snackBar.open('Fehler beim Erstellen', 'OK', { duration: 3000 }); }
      });
    });
  }

  edit(k: Kunde): void {
    const ref = this.dialog.open<KundenDialog, Kunde | null>(KundenDialog, { data: k });
    ref.afterClosed().subscribe((result: Kunde | null) => {
      if (!result) return;
      this.kundenService.update(k.kundenId, result).subscribe({
        next: u => { this.snackBar.open('Kunde aktualisiert', 'OK', { duration: 2000 }); this.reload(); },
        error: err => { console.error(err); this.snackBar.open('Fehler beim Aktualisieren', 'OK', { duration: 3000 }); }
      });
    });
  }

  remove(k: Kunde): void {
    const ref = this.dialog.open<ConfirmDialog, boolean>(ConfirmDialog);
    ref.afterClosed().subscribe((ok: boolean) => {
      if (!ok) return;
      this.kundenService.delete(k.kundenId).subscribe({
        next: () => { this.snackBar.open('Kunde gelöscht', 'OK', { duration: 2000 }); this.reload(); },
        error: err => { console.error(err); this.snackBar.open('Fehler beim Löschen', 'OK', { duration: 3000 }); }
      });
    });
  }
}
