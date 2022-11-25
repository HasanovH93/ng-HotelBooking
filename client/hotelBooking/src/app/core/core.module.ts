import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule} from '@angular/material/dialog'
import { RouterModule } from '@angular/router';
import  {MatSlideToggleModule} from '@angular/material/slide-toggle'


import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DropdownDirective } from '../shared/dropdown.directive';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DropdownDirective,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    BrowserAnimationsModule,
    RouterModule,
    MatSlideToggleModule,
    FontAwesomeModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
  ]
})
export class CoreModule { }
