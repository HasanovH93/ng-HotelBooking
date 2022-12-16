import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelViewComponent } from './hotel-view/hotel-view.component';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component'
import { homeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';






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
    SharedModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatButtonModule
  ],
  exports: [
    HotelViewComponent,
    HomeComponent
  ]
})
export class HomeModule { }
