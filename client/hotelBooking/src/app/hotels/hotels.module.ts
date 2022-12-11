import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { HotelsRoutingModule } from './hotels-routing.module';
import { AllHotelsComponent } from './all-hotels/all-hotels.component';
import { RouterModule } from '@angular/router';
import { AddHotelComponent } from './add-hotel/add-hotel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DetailsViewComponent } from './details-view/details-view.component';


@NgModule({
  declarations: [
    AllHotelsComponent,
    AddHotelComponent,
    DetailsViewComponent,


  ],
  imports: [
    CommonModule,
    HotelsRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    InfiniteScrollModule,
    MatProgressSpinnerModule,
    FontAwesomeModule
  ],
  exports: [
    AllHotelsComponent
  ]
})
export class HotelsModule { }
