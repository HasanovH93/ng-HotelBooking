import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser, User } from '../modals/user';
import { Subject, tap } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../user/login/login.component';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  private _refreshNeeds = new Subject<IUser | null>();
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated: boolean;
  private userToken!: string;
  private tokenTime!: any;
  private userId!: string | null;

  
  private apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient,
    private route: Router,
    private dialogRef: MatDialog
  ) {}

  get refreshNeeds() {
    return this._refreshNeeds.asObservable();
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsLoggedIn() {
    return this.isAuthenticated;
  }

  getToken() {
    return this.userToken;
  }
  getUserId() {
    return this.userId
  }

  getUser() {
    return this.http.get<IUser>(this.apiUrl + 'users/profile').pipe(
      tap((res) => {
        this._refreshNeeds.next(res);
      })
    );
  }

  editUser(body: {}) {
    return this.http.put<IUser>(this.apiUrl + 'users/profile', body).pipe(
      tap((res) => {
        this._refreshNeeds.next(res);
      })
    );
  }

  registerUser(user: User) {
    return this.http
      .post<IUser>(this.apiUrl + 'users/register', user)
      .pipe(
        tap((res) => {
          this._refreshNeeds.next(res);
        })
      )
      .subscribe({
        next: (res) => {
          this.setUser(res);
        },
      });
  }

  loginUser(data: { email: string; password: string }) {
    return this.http
      .post<IUser>(this.apiUrl+ 'users/login', data)
      .pipe(
        tap((res) => {
          this._refreshNeeds.next(res);
        })
      )
      .subscribe({
        next: (res) => {
          this.setUser(res);
        },
      });
  }

  private setUser(res: IUser) {
    const token = res.token;
    this.userToken = token;
    if (token) {
      const tokenDuration = res.expiresIn;
      this.setAuthTimer(tokenDuration);
      this.userId = res.userData.id;
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
      const timeNow = new Date();
      const tokenData = new Date(timeNow.getTime() + tokenDuration * 1000);
      this.setUserData(token, tokenData, this.userId);
      this.dialogRef.closeAll();
      this.route.navigate(['/']);
    }
  }

  logout() {
    this.userToken = '';
    this._refreshNeeds.next(null);
    this.authStatusListener.next(false);
    this.isAuthenticated = false;
    clearTimeout(this.tokenTime);
    this.userId = '';
    this.clearUserData();
    this.route.navigate(['/']);
  }

  autoLogin() {
    const userData = this.getUserData();
    if (!userData) {
      return;
    }
    const now = new Date();
    const expiresIn = userData.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.userToken = userData.token;
      this.userId = userData.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
    }
  }

  private setAuthTimer(duration: number) {
    this.tokenTime = setTimeout(() => {
      this.logout();
      this.dialogRef.open(LoginComponent,{autoFocus:false});
    }, duration * 1000);
  }

  private clearUserData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private setUserData(token: string, tokenData: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', tokenData.toISOString());
    localStorage.setItem('userId', userId);
  }

  private getUserData() {
    const token = localStorage.getItem('token');
    const expDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');

    if (!token || !expDate) {
      return;
    }

    return { token, expirationDate: new Date(expDate), userId: userId };
  }

  ngOnDestroy(): void {}
}
