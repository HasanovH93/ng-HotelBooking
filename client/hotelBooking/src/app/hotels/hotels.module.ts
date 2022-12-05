import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelsRoutingModule } from './hotels-routing.module';
import { AllHotelsComponent } from './all-hotels/all-hotels.component';
import { RouterModule } from '@angular/router';
import { AddHotelComponent } from './add-hotel/add-hotel.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AllHotelsComponent,
    AddHotelComponent,

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
