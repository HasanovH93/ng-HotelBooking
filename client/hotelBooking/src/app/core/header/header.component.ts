import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { LoginComponent } from 'src/app/user/login/login.component';
import { RegisterComponent } from 'src/app/user/register/register.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userLoggedIn: boolean = false;
  userServiceSub!: Subscription;
  


  constructor(private dialogRef: MatDialog, private userService: UserService) {}
  

  ngOnInit(): void {
    this.userLoggedIn = this.userService.getIsLoggedIn()

    this.userServiceSub = this.userService.getAuthStatusListener().subscribe((isAuthenticated) => {
      this.userLoggedIn = isAuthenticated;
    })

  }
ngOnDestroy(): void {
  this.userServiceSub.unsubscribe()
}


  openDialogRegister() {
    this.dialogRef.open(RegisterComponent);
  }

  openDialogLogin(){
    this.dialogRef.open(LoginComponent)
  }

  onLogout() {
    this.userService.logout();
  }
}
