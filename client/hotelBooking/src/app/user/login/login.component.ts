import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
  })

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

}
