import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppComponent } from 'src/app/app.component';
import { ToastComponent } from 'src/app/components/toast/toast.component';
import { CajachicaService } from 'src/app/services/cajachica.service';
import { CalendarioService } from 'src/app/services/calendario.service';
// import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';
import { SigtaService } from 'src/app/services/sigta.service';
import Swal from 'sweetalert2';
// import * as os from 'os';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  componenteListo = false;
  ip: string = '';

  error: string = '';
  username: string = '';
  password: string = '';

  usulog: string = '';
  nomusu: string = '';
  desare: string = '';

  //Post
  p_nomusu: string = '';
  p_passwd: string = '';

  dataUsuario: any;



  constructor(
    private router: Router,
    private appComponent: AppComponent,
    // private auth: AuthService,
    private login: LoginService,
    private toastComponent: ToastComponent,
    private spinner: NgxSpinnerService,
    private calendarioService: CalendarioService) {
    this.appComponent.login = true;
  }

  ngOnInit() {
    // this.getIp()
    // console.log(this.ip);
    setTimeout(() => {
      this.componenteListo = true;
    }, 300);
  }

  private errorSweetAlertCode(icon: 'error' | 'warning' | 'info' | 'success' = 'error') {
    Swal.fire({
      icon: icon,
      text: this.error || 'Hubo un error al procesar la solicitud',
    });
  }
  private errorSweetAlertUsuario() {
    Swal.fire({
      icon: 'error',
      text: this.error || 'Usuario Invalido',
    });
  }

  private getIconByErrorCode(errorCode: string): 'error' | 'warning' | 'info' | 'success' {
    switch (errorCode) {
      case '-100':
        return 'error';
      case '-101':
        return 'error';
      case '-102':
        return 'error';
      case '-103':
        return 'error';
      case '-104':
        return 'error';
      case '0':
        return 'success';
      default:
        return 'error'; // Puedes establecer un icono predeterminado si no hay coincidencia
    }
  }

  // loginUser() {
  //   let btnLogin = document.getElementById('btnLoginAction') as HTMLButtonElement;
  //   btnLogin.innerHTML = '<span class="align-items-center"><span class="spinner-border flex-shrink-0" role="status"><span class="visually-hidden">Loading...</span></span><span class="flex-grow-1 ms-2">Ingresando...</span></span>';
  //   btnLogin.classList.add('pe-none', 'btn-load');

  //   let data = {
  //     p_app_id: 7,
  //     p_loging: this.username,
  //     p_passwd: this.password
  //   }

  //   this.auth.postGetLoginUser(data).subscribe({
  //     next: (result: any) => {
  //       console.log(result);
  //       if (result[0].error == 0) {
  //         this.toastComponent.showToast('Inicio de sesión correcto.', 'success');

  //         setTimeout(() => {
  //           btnLogin.innerHTML = 'Ingresar';
  //           btnLogin.classList.remove('pe-none', 'btn-load');
  //           this.router.navigate(['/persona']);
  //         }, 2000);

  //       } else {
  //         btnLogin.innerHTML = 'Ingresar';
  //         btnLogin.classList.remove('pe-none', 'btn-load');
  //         this.toastComponent.showToast(result[0].mensa, 'info');
  //       }
  //     },
  //     error: (error: any) => {
  //       console.error(error);
  //       btnLogin.innerHTML = 'Ingresar';
  //       btnLogin.classList.remove('pe-none', 'btn-load');
  //       this.toastComponent.showToast('Error al iniciar sesión, intentelo nuevamente.2', 'danger');
  //     }
  //   });
  // }

  togglePassword() {
    let passwordInput = document.getElementById('password-input') as HTMLInputElement;
    let passwordIcon = document.getElementById('passwordEye') as HTMLSpanElement;

    if (passwordIcon.classList.contains('ri-eye-fill')) {
      passwordInput.type = 'text';
      passwordIcon.classList.remove('ri-eye-fill');
      passwordIcon.classList.add('ri-eye-off-fill');
    } else {
      passwordInput.type = 'password';
      passwordIcon.classList.remove('ri-eye-off-fill');
      passwordIcon.classList.add('ri-eye-fill');
    }
  }

  goToPage(page: any) {
    this.router.navigate([page]);
  }

  // getIp() {
  //   this.sigtaService.getIp().subscribe({
  //     next: (data: any) => {
  //       console.log(data);
  //       this.ip = data

  //       console.log("ip" + this.ip);
  //     },
  //     error: (error: any) => {
  //       console.log(error);
  //     },
  //   });
  // }

  listarUsuario(value: any) {
    let post = {
      p_nomusu: this.p_nomusu,
    };

    this.spinner.show();

    this.calendarioService.ingresarUsuario(post).subscribe({
      next: (data: any) => {
        this.spinner.hide();

        if (this.p_nomusu === '') {
          this.errorSweetAlertUsuario();
          this.nomusu = '';
          this.desare = '';
        } else {

          if (data.length > 0) {

            this.nomusu = data[0].nomusu;
            this.desare = data[0].desare;
          } else {
            this.errorSweetAlertUsuario();
            this.nomusu = '';
            this.desare = '';
          }
        }
      },
      error: (error: any) => {

        console.log(error);
      },
    });
  }

  ingresarUsuario(value: any) {
    let btnLogin = document.getElementById('btnLoginAction') as HTMLButtonElement;
    btnLogin.innerHTML = '<span class="align-items-center"><span class="spinner-border flex-shrink-0" role="status"><span class="visually-hidden">Loading...</span></span><span class="flex-grow-1 ms-2">Ingresando...</span></span>';
    btnLogin.classList.add('pe-none', 'btn-load');

    let post = {
      p_loging: this.p_nomusu,
      p_passwd: this.p_passwd,
      p_apl_id: 13
    };

    console.log(post);

    this.spinner.show();
    this.calendarioService.ingresarUsuario(post).subscribe({
      next: (data: any) => {
        console.log("data-login:", data);

        this.spinner.hide();
        localStorage.setItem("session-dashboard", data[0]);
        localStorage.setItem("dataUsuario", JSON.stringify(data[0]));
        this.dataUsuario = data[0].numid;

        console.log(this.dataUsuario);

        // if (data && data.length > 0) {
        this.error = data[0].mensa;
        console.log(data);

        if (data[0].error == 0) {
          this.toastComponent.showToast('Inicio de sesión correcto.', 'success');

          setTimeout(() => {
            btnLogin.innerHTML = 'Ingresar';
            btnLogin.classList.remove('pe-none', 'btn-load');

            this.router.navigate(['/dashboard',]);
          }, 2000);

        } else {
          btnLogin.innerHTML = 'Ingresar';
          btnLogin.classList.remove('pe-none', 'btn-load');
          this.toastComponent.showToast(data[0].mensa, 'info');
        }

      },
      error: (error: any) => {
        // this.spinner.hide();
        console.log(error);
      },
    });
  }



}
