import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { userRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { SpinnerComponent } from '../shared/spinner/spinner.component';
import { SharedModule } from '../shared/shared.module';




@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    EditUserComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    userRoutingModule,
    SharedModule
  ], exports: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    EditUserComponent
  ]
})
export class UserModule { }
