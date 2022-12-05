import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { passwordChecker } from '../password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private _auth: UserService, private formBuilder: FormBuilder) {}
  errorMessage = '';
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

  ngOnInit(): void {}

  onRegister() {
    const { username, email, password, rePass } = this.signUpForm.value;
    if (password !== rePass) {
      this.errorMessage = "Passwords Don't Match";
      return;
    }
    this._auth.registerUser(this.signUpForm.value);
  }
}
