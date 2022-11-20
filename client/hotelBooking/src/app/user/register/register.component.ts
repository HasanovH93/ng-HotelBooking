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
  signUpForm: FormGroup
  errorMessage = '';


  

  ngOnInit(): void {
    this.signUpForm = new FormGroup ({
      email: new FormControl(null, [Validators.required, Validators.email]),
      username: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      rePass: new FormControl(null,  [Validators.required, Validators.minLength(5)]),
    })
  }

  onRegister(){
    console.log(this.signUpForm.controls)
    const {username,email,password,rePass} = this.signUpForm.value;
    if(password !== rePass){
      this.errorMessage = 'Passwords Don\'t Match';
      return;
    }
    this._auth.registerUser(this.signUpForm.value)
  }

  
 

}
