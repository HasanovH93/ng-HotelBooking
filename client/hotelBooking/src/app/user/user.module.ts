import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { userRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { SharedModule } from '../shared/shared.module';
import { LikedHotelsComponent } from './liked-hotels/liked-hotels.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatPasswordStrengthModule } from "@angular-material-extensions/password-strength";
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ReservationsComponent } from './reservations/reservations.component'
@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    EditUserComponent,
    LikedHotelsComponent,
    ReservationsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    userRoutingModule,
    SharedModule,
    FontAwesomeModule,
    MatPasswordStrengthModule,
    MatProgressSpinnerModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    EditUserComponent,
  ],
})
export class UserModule {}
