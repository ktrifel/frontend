import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  template: `
    <div class="confirm-content">
      <ng-content></ng-content>
      <div class="actions">
        <button mat-button mat-dialog-close="false">Abbrechen</button>
        <button mat-raised-button color="warn" [mat-dialog-close]="true">Löschen</button>
      </div>
    </div>
  `,
  styles: [`.actions{display:flex;justify-content:flex-end;gap:.5rem}`]
})
export class ConfirmDialog {}
