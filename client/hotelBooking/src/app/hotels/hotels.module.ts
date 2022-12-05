import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelsRoutingModule } from './hotels-routing.module';
import { AllHotelsComponent } from './all-hotels/all-hotels.component';
import { RouterModule } from '@angular/router';
import { AddHotelComponent } from './add-hotel/add-hotel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from '../shared/spinner/spinner.component';


@NgModule({
  declarations: [
    AllHotelsComponent,
    AddHotelComponent,
    SpinnerComponent

  ],
  imports: [
    CommonModule,
    HotelsRoutingModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    AllHotelsComponent
  ]
})
export class HotelsModule { }
