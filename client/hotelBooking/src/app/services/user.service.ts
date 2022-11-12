import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  getToken(){
    throw new Error('Method not Implementded');
  }
  private _registerUrl = 'http://localhost:3030/users/register'
  constructor(private http: HttpClient) { }

  registerUser(user:any){
    return this.http.post<any>(this._registerUrl,user)
  }
}
