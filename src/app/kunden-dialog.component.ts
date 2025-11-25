import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Kunde } from './kunde.model';

@Component({
  selector: 'app-kunden-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule],
  template: `
    <h2 mat-dialog-title>{{ data ? 'Kunden bearbeiten' : 'Neuen Kunden anlegen' }}</h2>
    <form [formGroup]="form" (ngSubmit)="save()" class="dialog-form">
      <mat-form-field appearance="fill">
        <mat-label>Vorname</mat-label>
        <input matInput formControlName="vorname" />
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Nachname</mat-label>
        <input matInput formControlName="nachname" />
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>E-Mail</mat-label>
        <input matInput formControlName="email" />
      </mat-form-field>

      <div class="actions">
        <button mat-button type="button" (click)="close()">Abbrechen</button>
        <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">Speichern</button>
      </div>
    </form>
  `,
  styles: [`
    .dialog-form { display: flex; flex-direction: column; gap: 1rem; padding: 0 0 1rem 0; }
    .actions { display:flex; justify-content:flex-end; gap:0.5rem; }
  `]
})
export class KundenDialog implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject<MatDialogRef<KundenDialog, Kunde | null>>(MatDialogRef);
  readonly data = inject<Kunde | null>(MAT_DIALOG_DATA);

  form = this.fb.group({
    vorname: ['', Validators.required],
    nachname: ['', Validators.required],
    email: ['']
  });

  ngOnInit(): void {
    if (this.data) {
      this.form.patchValue({ vorname: this.data.vorname, nachname: this.data.nachname, email: this.data.email });
    }
  }

  save() {
    if (this.form.invalid) return;
  const raw = this.form.value;
  const value: Partial<Kunde> = {
    vorname: raw.vorname ?? undefined,
    nachname: raw.nachname ?? undefined,
    email: raw.email ?? undefined
  };
  const result = { ...(this.data ?? ({} as Partial<Kunde>)), ...value } as Kunde;
    this.dialogRef.close(result);
  }

  close() {
    this.dialogRef.close(null);
  }
}
