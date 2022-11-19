import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

      
  constructor(private _auth: UserService,private formBuilder: FormBuilder) { }
  errorMessage = '';

  signUpForm: FormGroup = this.formBuilder.group (
    {
      email: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      username: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      rePass: new FormControl(null,  [Validators.required, Validators.minLength(5)]),
      
    }
  )
  

  ngOnInit(): void {
    
  }

  onRegister(){
    const {username,email,password,rePass} = this.signUpForm.value;
    if(password !== rePass){
      this.errorMessage = 'Passwords Don\'t Match';
      return;
    }
    this._auth.registerUser(this.signUpForm.value)
    .subscribe(
      res => {
        localStorage.setItem('token', res.accessToken)
      })
  }

  
 

}
