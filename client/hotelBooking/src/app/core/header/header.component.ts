import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { RegisterComponent } from 'src/app/user/register/register.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  navbarFixed: boolean = false;

  constructor(private dialogRef: MatDialog, private userService: UserService) {}

  ngOnInit(): void {}

  @HostListener('window:scroll', ['$event']) onScroll() {
    if (window.scrollY > 50) {
      this.navbarFixed = true;
    } else {
      this.navbarFixed = false;
    }
  }

  openDialog() {
    this.dialogRef.open(RegisterComponent);
  }

  onLogout() {
    this.userService.logout();
  }
}
