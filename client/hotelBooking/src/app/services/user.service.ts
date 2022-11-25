import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { IUser, User } from '../modals/user';
import { Subject, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})


export class UserService {
  private authStatusListener = new Subject<boolean>();
  private userToken!: string;
  private userId!: string | null


  private _registerUrl = 'http://localhost:3030/users/register'
  constructor(private http: HttpClient,private route: Router) { }

  registerUser(user:User){
    return this.http.post<IUser>(this._registerUrl,user).subscribe({
      next: (res) => {
        this.setUser(res);
      }
    })
  }


  
  private setUser(res: IUser) {
    const token = res.accessToken;
    this.userToken = token;
    if (token) {
      this.userId = res.userId;
      this.saveAuthData(token, this.userId);
      this.route.navigate(['/hotels'])
    }
  }
  private saveAuthData(token: string, userId:string) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
  }

  
}



