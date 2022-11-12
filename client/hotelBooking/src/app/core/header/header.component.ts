import { Component, OnInit } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog'
import { RegisterComponent } from 'src/app/user/register/register.component';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
 
  search = faMagnifyingGlass
  constructor(private dialogRef : MatDialog) {}
  
  openDialog(){
    this.dialogRef.open(RegisterComponent)
  }
  ngOnInit(): void {
  }

}
