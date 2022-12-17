import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MessageService, MessageType } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';
import { LoginComponent } from '../login/login.component';
import { passwordChecker } from '../password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  constructor(
    private _auth: UserService,
    private formBuilder: FormBuilder,
    private msgService: MessageService,
    private dialogRef: MatDialog
  ) {}
  errorMessage!: string;
  isErrorType!: boolean;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  isLoading: boolean = false;
  msgServiceSubscription!: Subscription;

  signUpForm: FormGroup = this.formBuilder.group(
    {
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.emailPattern),
      ]),
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
    this.msgServiceSubscription = this.msgService.onMessage$.subscribe(
      
      (message) => {
        this.isLoading = false;
        this.errorMessage = message.text;
        this.isErrorType = message.type === MessageType.error;
        if (this.errorMessage) {
          setTimeout(() => {
            this.errorMessage = '';
          
          }, 3000);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.msgServiceSubscription.unsubscribe();
  }
  onRegister() {
    this.isLoading = true;
    this._auth.registerUser(this.signUpForm.value);
  }

  openDialogRegister() {
    this.dialogRef.closeAll();
    this.dialogRef.open(LoginComponent, { autoFocus: false });
  }
}
