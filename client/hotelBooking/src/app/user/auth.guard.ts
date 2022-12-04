import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: UserService, private dialogRef: MatDialog, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuth = this.authService.getIsLoggedIn();
    if (!isAuth) {
        this.router.navigate(['/'])
      this.dialogRef.open(LoginComponent)
    }
    return isAuth;
  }
}