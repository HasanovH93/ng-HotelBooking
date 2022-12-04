import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/modals/user';
import { UserService } from 'src/app/services/user.service';
import { LoginComponent } from 'src/app/user/login/login.component';
import { RegisterComponent } from 'src/app/user/register/register.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit,  OnDestroy {
  defaultImg: string = '../../../assets/icons/account.svg';
  userLoggedIn: boolean = false;
  userServiceSub!: Subscription;
  userDataSubscription: Subscription;
  getUserSubscription: Subscription;
  currentUser: IUser;
  currImage: string;

  constructor(private dialogRef: MatDialog, private userService: UserService) {}

  ngOnInit(): void {
    this.userLoggedIn = this.userService.getIsLoggedIn();

    this.userServiceSub = this.userService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userLoggedIn = isAuthenticated;

        if (this.userLoggedIn) {
          this.getUserSubscription = this.userService.refreshNeeds.subscribe(
            () => {
              this.getUser();
            }
          );
          this.getUser();
        }
      });

    if (this.userLoggedIn) {
      this.getUser();
    }
  }


  private getUser() {
    this.userDataSubscription = this.userService
      .getUser()
      .subscribe((userData) => {
        this.currImage = userData.userData.imageUrl;
        this.currentUser = userData;
      });
  }

  ngOnDestroy(): void {
    this.userServiceSub.unsubscribe();
    this.userDataSubscription.unsubscribe();
    this.getUserSubscription.unsubscribe();
  }

  openDialogRegister() {
    this.dialogRef.open(RegisterComponent);
  }

  openDialogLogin() {
    this.dialogRef.open(LoginComponent);
  }

  onLogout() {
    this.userService.logout();
  }
}
