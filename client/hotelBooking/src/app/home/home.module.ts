import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelViewComponent } from './hotel-view/hotel-view.component';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';




@NgModule({
  declarations: [
    HotelViewComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    FontAwesomeModule
  ],
  exports: [
    HotelViewComponent
  ]
})
export class HomeModule { }
