import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { MatDialogModule} from '@angular/material/dialog'
import  {MatSlideToggleModule} from '@angular/material/slide-toggle'
import { RouterModule } from '@angular/router';
import { DropdownDirective } from '../shared/dropdown.directive';
import { UserMenuComponent } from './header/user-menu/user-menu.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DropdownDirective,
    UserMenuComponent
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
    UserMenuComponent
  ]
})
export class CoreModule { }
