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
import { SearchDataComponent } from './search-data/search-data.component';
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import {MatInputModule} from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { BookingHotelComponent } from './booking-hotel/booking-hotel.component';


@NgModule({
  declarations: [
    AllHotelsComponent,
    AddHotelComponent,
    DetailsViewComponent,
    EditHotelComponent,
    SearchDataComponent,
    BookingHotelComponent,


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
    SharedModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule
  ],
  exports: [
    AllHotelsComponent
  ]
})
export class HotelsModule { }
