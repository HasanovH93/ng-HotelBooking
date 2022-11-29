import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule} from '@angular/material/dialog'
import { RouterModule } from '@angular/router';
import  {MatSlideToggleModule} from '@angular/material/slide-toggle'


import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DropdownDirective } from '../shared/directives/dropdown.directive';
import { StickyMenuDirective } from '../shared/directives/sticky-menu.directive';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DropdownDirective,
    StickyMenuDirective
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    BrowserAnimationsModule,
    RouterModule,
    MatSlideToggleModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
  ]
})
export class CoreModule { }
