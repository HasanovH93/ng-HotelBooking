import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms'
import { HotelsRoutingModule } from './hotels/hotels-routing.module';
import { userRoutingModule } from './user/user-routing.module';
import { AuthInterceptor } from './user/user.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HotelsRoutingModule,
    userRoutingModule,
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HomeModule,
    UserModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
