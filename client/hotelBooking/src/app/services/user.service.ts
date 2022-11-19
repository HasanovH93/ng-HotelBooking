import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { IUser, User } from '../modals/user';

@Injectable({
  providedIn: 'root'
})


export class UserService {
  


  private _registerUrl = 'http://localhost:3030/users/register'
  constructor(private http: HttpClient) { }

  registerUser(user:User){
    return this.http.post<IUser>(this._registerUrl,user)
  }
}