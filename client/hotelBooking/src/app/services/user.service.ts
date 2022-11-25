import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { IUser, User } from '../modals/user';
import { Subject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../user/register/register.component';

@Injectable({
  providedIn: 'root'
})


export class UserService {
  private authStatusListener = new Subject<boolean>();
  private userToken!: string;
  private tokenTime!: any;
  private isAuthenticated: boolean = false;
  private userId!: string | null


  private _registerUrl = 'http://localhost:3030/users/register'
  constructor(private http: HttpClient,private route: Router,private dialogRef: MatDialog) { }

  registerUser(user:User){
    return this.http.post<IUser>(this._registerUrl,user).subscribe({
      next: (res) => {
        console.log(res.expiresIn)
        this.setUser(res);
      }
    })
  }


  
  private setUser(res: IUser) {
    const token = res.token;
    this.userToken = token;
    if (token) {
      const tokenDuration = res.expiresIn
      this.setAuthTimer(tokenDuration)
      this.userId = res.userData.id;
      this.isAuthenticated = true;
      this.authStatusListener.next(true)
      const timeNow = new Date();
      const tokenExpData = new Date(timeNow.getTime() + tokenDuration * 1000)
      this.saveAuthData(token, tokenExpData, this.userId);
      this.dialogRef.closeAll()
      this.route.navigate(['/'])
    }
  }

  private setAuthTimer(duration: number) {
    this.tokenTime = setTimeout(() => {
      this.logout();
    this.dialogRef.open(RegisterComponent)
    }, duration * 1000);
  }

  logout() {
    this.userToken = '';
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTime);
    this.userId = ''
    this.clearAuthData();
    this.route.navigate(['/hotels']);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }
  private saveAuthData(token: string,tokenExpData: Date ,userId:string) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('expiration', tokenExpData.toISOString());
  }

  
}



