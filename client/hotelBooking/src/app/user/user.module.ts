import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { userRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';




@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    userRoutingModule
  ], exports: [
    LoginComponent
  ]
})
export class UserModule { }
