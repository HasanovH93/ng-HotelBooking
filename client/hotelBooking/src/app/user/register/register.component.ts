import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MessageService, MessageType } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';
import { passwordChecker } from '../password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private _auth: UserService, private formBuilder: FormBuilder, private msgService:MessageService) {}
  errorMessage! : string;
  isErrorType! : boolean;

  isLoading: boolean = false;

  signUpForm: FormGroup = this.formBuilder.group(
    {
      email: new FormControl(null, [Validators.required, Validators.email]),
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      rePass: new FormControl(null, [Validators.required]),
    },
    {
      validators: [passwordChecker],
    }
  );

  ngOnInit(): void {
    this.msgService.onMessage$.subscribe((message) => {
      this.errorMessage = message.text
      this.isErrorType = message.type === MessageType.error
      if(this.errorMessage){
        setTimeout(() => {
          this.errorMessage = ''
        }, 3000)
      }
    })
  }

  

  onRegister() {
    this._auth.registerUser(this.signUpForm.value);
  }
}
