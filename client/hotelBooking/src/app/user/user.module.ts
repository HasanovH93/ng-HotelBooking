import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { userRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';




@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    userRoutingModule
  ], exports: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ]
})
export class UserModule { }
