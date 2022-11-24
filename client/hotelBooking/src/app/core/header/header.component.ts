import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { RegisterComponent } from 'src/app/user/register/register.component';
import { UserMenuComponent } from './user-menu/user-menu.component';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  navbarFixed:boolean = false;
  
  constructor(private dialogRef : MatDialog) {}

  openDialog(){
    this.dialogRef.open(RegisterComponent);
  }
  ngOnInit(): void {
  }

  @HostListener('window:scroll', ['$event']) onScroll(){
    if(window.scrollY > 50){
      this.navbarFixed = true
    }else {
      this.navbarFixed = false
    }
  }

}
