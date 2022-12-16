import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/modals/user';
import { ThemeService } from 'src/app/services/theme.service';
import { UserService } from 'src/app/services/user.service';
import { LoginComponent } from 'src/app/user/login/login.component';
import { RegisterComponent } from 'src/app/user/register/register.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})


export class HeaderComponent implements OnInit, OnDestroy {
  defaultImg: string = '../../../assets/icons/account.svg';
  userLoggedIn: boolean = false;
  userServiceSub!: Subscription;
  userDataSubscription: Subscription;
  getUserSubscription: Subscription;
  currentUser: IUser | null;
  title = 'dark-theme-yt';
  isDarkMode: boolean;
  showFiller = false;



  constructor(private dialogRef: MatDialog, private userService: UserService, private themeService: ThemeService) {
    this.themeService.initTheme();
    this.isDarkMode = this.themeService.isDarkMode();
  }

  toggleDarkMode() {
    this.isDarkMode = this.themeService.isDarkMode();

    this.isDarkMode
      ? this.themeService.update('light-mode')
      : this.themeService.update('dark-mode');
  }

  ngOnInit(): void {
    this.userLoggedIn = this.userService.getIsLoggedIn();
    if (this.userLoggedIn) {
      this.getUser();
    }

    this.userServiceSub = this.userService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userLoggedIn = isAuthenticated;
      });

    this.getUserSubscription = this.userService.refreshNeeds.subscribe(
      (user) => {
        this.currentUser = user;
      }
    );
  }

  private getUser() {
    this.userDataSubscription = this.userService
      .getUser()
      .subscribe((userData) => {
        this.currentUser = userData;
      });
  }

  ngOnDestroy(): void {
    this.userServiceSub.unsubscribe();
    this.userDataSubscription.unsubscribe();
    this.getUserSubscription.unsubscribe();
  }

  openDialogRegister() {
  
    this.dialogRef.open(RegisterComponent,{autoFocus: false});
  }

  openDialogLogin() {
    this.dialogRef.open(LoginComponent,{autoFocus:false});
  }

  onLogout() {
    this.userService.logout();
  }
}
