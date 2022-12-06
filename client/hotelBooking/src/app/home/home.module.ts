import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelViewComponent } from './hotel-view/hotel-view.component';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component'
import { homeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';




@NgModule({
  declarations: [
    HotelViewComponent,
    HomeComponent,
  ],
  imports: [
    
    CommonModule,
    MatCardModule,
    FontAwesomeModule,
    FormsModule,
    homeRoutingModule,
    SharedModule
  ],
  exports: [
    HotelViewComponent,
    HomeComponent
  ]
})
export class HomeModule { }
