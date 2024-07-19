import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { SigtaService } from '../services/sigta.service';
import { LoginComponent } from '../pages/login/login.component';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private loginService: LoginService,
    private router: Router,
    private sigtaService: SigtaService,
    private loginComponent: LoginComponent) {

    console.log("loginGuard gil");

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkUserLogin(route);
    // return true
  }


  checkUserLogin(route: ActivatedRouteSnapshot) {
    const userLogin = this.loginComponent.error;
    if (userLogin === 'Accesoso Autorizado') {
      // this.router.navigate(['/multas'])
      return true
    } else {
      this.router.navigate(['login'])
    }
    console.log(this.loginComponent.error);
    return true
  }
}
