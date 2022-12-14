import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogData } from 'src/app/modals/confirm-dialog-data';

@Component({
  selector: 'app-confirmation-service',
  templateUrl: './confirmation-service.component.html',
  styleUrls: ['./confirmation-service.component.scss'],
})
export class ConfirmationDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) {}
}
