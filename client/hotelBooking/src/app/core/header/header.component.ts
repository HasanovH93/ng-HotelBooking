import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { RegisterComponent } from 'src/app/user/register/register.component';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
 

  constructor(private dialogRef : MatDialog) {}
  
  openDialog(){
    this.dialogRef.open(RegisterComponent)
  }
  ngOnInit(): void {
  }

}
