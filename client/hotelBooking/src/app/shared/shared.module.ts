import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { DropdownDirective } from './directives/dropdown.directive';



@NgModule({
  declarations: [
    PageNotFoundComponent,
    SpinnerComponent,
    ],
  imports: [
    CommonModule
  ],
  exports: [
    PageNotFoundComponent,
    SpinnerComponent,
  ]
})
export class SharedModule { }
