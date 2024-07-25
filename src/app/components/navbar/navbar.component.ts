import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { CajachicaService } from 'src/app/services/cajachica.service';
import { CalendarioService } from 'src/app/services/calendario.service';
// import { AdministracionService } from 'src/app/services/administracion.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  dataUsuario: any;
  usu_nomcom: string;

  layoutModeIcon: string = 'sun';
  dataEmpresas: any = [];

  constructor(
    private router: Router,
    private calendarioService: CalendarioService
    // public appComponent:AppComponent
  ) {
    // this.dataUsuario = localStorage.getItem('dataUsuario');
    const storedData = localStorage.getItem("dataUsuario");
    if (storedData !== null) {
      this.dataUsuario = JSON.parse(storedData);
    }
    // console.log(this.dataUsuario);
  }

  ngOnInit() {
    this.listarUsuario();
  }

  listarUsuario() {
    let post = {
      p_usu_id: this.dataUsuario.numid,
      p_usu_activo: 1,
    };

    this.calendarioService.listarUsuario(post).subscribe({
      next: (data: any) => {
        this.usu_nomcom = data[0].usu_nomcom
        localStorage.setItem('dataUser', JSON.stringify(data))
      }
    });
  }

  changeLayoutMode(mode: string) {
    let htmlSelector = document.getElementsByTagName('html')[0];
    let tableSelector = document.querySelectorAll('thead, tfoot');

    if (mode == 'light') {
      htmlSelector.setAttribute('data-topbar', 'light');
      htmlSelector.setAttribute('data-sidebar', 'light');
      htmlSelector.setAttribute('data-bs-theme', 'light');

      tableSelector.forEach(element => {
        element.classList.remove('table-dark');
        element.classList.add('table-light');
      });

      this.layoutModeIcon = 'sun';
    } else {
      htmlSelector.setAttribute('data-topbar', 'dark');
      htmlSelector.setAttribute('data-sidebar', 'dark');
      htmlSelector.setAttribute('data-bs-theme', 'dark');

      tableSelector.forEach(element => {
        element.classList.remove('table-light');
        element.classList.add('table-dark');
      });

      this.layoutModeIcon = 'moon';
    }
  }

  // companyList(){
  //   this.dataEmpresas = [];

  //   let data = {
  //     p_com_id: 0
  //   }

  //   this.administracionService.postGetCompanyList(data).subscribe({
  //     next: (result: any) => {
  //       console.log(result);
  //       this.dataEmpresas = result;
  //     },
  //     error: (error: any) => {
  //       console.error(error);
  //     }
  //   });
  // }

  setDefaultCompany(id: number) {

  }

  logOut() {
    localStorage.clear()
    this.router.navigateByUrl('/login')

    // this.dataUsuario.removeItem('dataUsuario')
  }

}
