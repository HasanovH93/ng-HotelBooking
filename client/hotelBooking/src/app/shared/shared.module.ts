import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ShortenPipe } from './shorten.pipe';



@NgModule({
  declarations: [
    PageNotFoundComponent,
    SpinnerComponent,
    ShortenPipe,
    ],
  imports: [
    CommonModule
  ],
  exports: [
    PageNotFoundComponent,
    SpinnerComponent,
    ShortenPipe
  ]
})
export class SharedModule { }
