import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { IUser, User } from '../modals/user';
import { Subject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
@Injectable({
  providedIn: 'root'
})


export class UserService {
  private authStatusListener = new Subject<boolean>();
  private userToken!: string;
  private isAuthenticated: boolean = false;
  private userId!: string | null


  private _registerUrl = 'http://localhost:3030/users/register'
  constructor(private http: HttpClient,private route: Router,private dialogRef: MatDialog) { }

  registerUser(user:User){
    return this.http.post<IUser>(this._registerUrl,user).subscribe({
      next: (res) => {
        this.setUser(res);
      }
    })
  }

  getIsLoggedIn() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable()
  }
  
  private setUser(res: IUser) {
    const token = res.token;
    this.userToken = token;
    if (token) {
      this.userId = res.userData.id;
      this.isAuthenticated = true;
      this.authStatusListener.next(true)
      this.setUserData(token, this.userId);
      this.dialogRef.closeAll()
      this.route.navigate(['/'])
    }
  }


  logout() {
    this.userToken = '';
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = ''
    this.clearUserData();
    this.route.navigate(['/']);
  }

  private clearUserData() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }
  private setUserData(token: string ,userId:string) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
  }

  
}



