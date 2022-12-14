import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { HotelsRoutingModule } from './hotels-routing.module';
import { AllHotelsComponent } from './all-hotels/all-hotels.component';
import { RouterModule } from '@angular/router';
import { AddHotelComponent } from './add-hotel/add-hotel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DetailsViewComponent } from './details-view/details-view.component';
import { EditHotelComponent } from './edit-hotel/edit-hotel.component';


@NgModule({
  declarations: [
    AllHotelsComponent,
    AddHotelComponent,
    DetailsViewComponent,
    EditHotelComponent,


  ],
  imports: [
    CommonModule,
    HotelsRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    InfiniteScrollModule,
    MatProgressSpinnerModule,
    FontAwesomeModule,
    SharedModule
  ],
  exports: [
    AllHotelsComponent
  ]
})
export class HotelsModule { }
