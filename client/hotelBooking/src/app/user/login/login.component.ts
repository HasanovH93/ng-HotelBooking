import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  authStatusSubscription!: Subscription
  showPassword = false;

  loginForm: FormGroup = this.formBuilder.group({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
  })
 


  constructor(private formBuilder: FormBuilder, private userService: UserService , private dialogRef: MatDialog) { }

  ngOnInit(): void {
    this.authStatusSubscription = this.userService.getAuthStatusListener().subscribe(status => {
      this.loading = false;
    })

    
    
  }

  onLogin(): void{
    this.loading = true
    const { email, password } = this.loginForm.value;
    const body = { email, password };
    console.log(this.loginForm.value)

    this.userService.loginUser(this.loginForm.value)
  }


  toggleShow(){
    this.showPassword = !this.showPassword
  }

  openDialogRegister() {
    this.dialogRef.closeAll()
    this.dialogRef.open(RegisterComponent);
  }

}
