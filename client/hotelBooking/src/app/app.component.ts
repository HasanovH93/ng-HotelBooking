import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from './app.animations';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation]
})
export class AppComponent  implements OnInit{
  title = 'hotelBooking';

  constructor(private userService:UserService){}


  ngOnInit(): void {
    this.userService.autoLogin();
  }
}
