import { Component, OnDestroy, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { MessageService, MessageType } from 'src/app/services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  errorMessage: string;
  isErrorType: boolean;
  showPassword = false;
  isLoading: boolean = false;
  msgServiceSubscription!: Subscription;

  loginForm: FormGroup = this.formBuilder.group({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private msgService: MessageService,
    private dialogRef: MatDialog
  ) {}

  ngOnInit(): void {
   this.msgServiceSubscription = this.msgService.onMessage$.subscribe((message) => {
      this.errorMessage = message.text;
      this.isErrorType = message.type === MessageType.error;
      if (this.errorMessage) {
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    });
  }

  onLogin(): void {
    this.isLoading = true;
    this.userService.loginUser(this.loginForm.value);
  }

  toggleShow() {
    this.showPassword = !this.showPassword;
  }

  openDialogRegister() {
    this.dialogRef.closeAll();
    this.dialogRef.open(RegisterComponent,{autoFocus:false});
  }

  ngOnDestroy(): void {
    this.msgServiceSubscription.unsubscribe();
  }
}
