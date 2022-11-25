import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { RegisterComponent } from 'src/app/user/register/register.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  // navbarFixed: boolean = false;
  userLoggedIn: boolean = false;
  userServiceSub!: Subscription;
  


  constructor(private dialogRef: MatDialog, private userService: UserService) {}
  

  ngOnInit(): void {
    this.userServiceSub = this.userService.getAuthStatusListener().subscribe((isAuthenticated) => {
      this.userLoggedIn = isAuthenticated;
    })
  }



  openDialog() {
    this.dialogRef.open(RegisterComponent);
  }

  onLogout() {
    this.userService.logout();
  }
}
