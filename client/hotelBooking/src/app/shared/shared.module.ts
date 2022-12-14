import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ShortenPipe } from './shorten.pipe';
import { ConfirmationDialog } from './confirmation-service/confirmation-service.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';



@NgModule({
  declarations: [
    PageNotFoundComponent,
    SpinnerComponent,
    ShortenPipe,
    ConfirmationDialog
    ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule
  ],
  exports: [
    PageNotFoundComponent,
    SpinnerComponent,
    ShortenPipe,
    ConfirmationDialog
  ]
})
export class SharedModule { }
