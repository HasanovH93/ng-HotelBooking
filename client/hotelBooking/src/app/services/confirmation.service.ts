import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { ConfirmDialogData } from '../modals/confirm-dialog-data';
import { ConfirmationDialog } from '../shared/confirmation-service/confirmation-service.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  confirmDialog(data: ConfirmDialogData): Observable<boolean> {
    return this.dialog
      .open(ConfirmationDialog, {
        data,
        width: '400px',
        disableClose: true,
      })
      .afterClosed();
  }
}