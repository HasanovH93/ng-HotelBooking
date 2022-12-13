import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ShortenPipe } from './shorten.pipe';
import { ConfirmationDialog } from './confirmation-service/confirmation-service.component';



@NgModule({
  declarations: [
    PageNotFoundComponent,
    SpinnerComponent,
    ShortenPipe,
    ConfirmationDialog
    ],
  imports: [
    CommonModule
  ],
  exports: [
    PageNotFoundComponent,
    SpinnerComponent,
    ShortenPipe,
    ConfirmationDialog
  ]
})
export class SharedModule { }
