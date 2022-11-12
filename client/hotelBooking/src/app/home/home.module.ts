import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelViewComponent } from './hotel-view/hotel-view.component';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms'




@NgModule({
  declarations: [
    HotelViewComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    FontAwesomeModule,
    FormsModule
  ],
  exports: [
    HotelViewComponent
  ]
})
export class HomeModule { }
