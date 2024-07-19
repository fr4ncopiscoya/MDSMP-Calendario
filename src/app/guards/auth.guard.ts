import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { SigtaService } from '../services/sigta.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    dataUser: any;
    dataMenu: any;

    constructor(
        private authService: AuthService,
        private router: Router,
    ) {
        // this.dataUser = JSON.parse(localStorage.getItem('menu-items'))
        // this.dataMenu = JSON.parse(localStorage.getItem('dataMenu'))
        // console.log("guard-menu: ", this.dataUser);
    }

    async canActivate(): Promise<boolean> {
        let token = localStorage.getItem('session-dashboard');
        if (token) {
            return true;
        } else {
            this.router.navigateByUrl('/login');
            return false;
        }
    }
}
