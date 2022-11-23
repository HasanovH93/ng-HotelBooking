import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelsRoutingModule } from './hotels-routing.module';
import { AllHotelsComponent } from './all-hotels/all-hotels.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AllHotelsComponent,

  ],
  imports: [
    CommonModule,
    HotelsRoutingModule,
    RouterModule
  ],
  exports: [
    AllHotelsComponent
  ]
})
export class HotelsModule { }