import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CajachicaService } from 'src/app/services/cajachica.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { CalendarioService } from 'src/app/services/calendario.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @ViewChildren('listElement') listElements!: QueryList<ElementRef>;

  // datosMenu: any;

  error: string = '';
  valMenu: string = '';
  enlace: string = '';

  dataUsuario: any

  datosMenu: any[] = []; // Aquí almacenarás los datos del menú obtenidos desde el backend
  collapsedMenus: Set<string> = new Set<string>();

  constructor(
    private spinner: NgxSpinnerService,
    private calendarioService: CalendarioService,
    private router: Router,
  ) {
    const dataUser = localStorage.getItem("dataUsuario")
    if (dataUser !== null) {
      this.dataUsuario = JSON.parse(dataUser)
    }

  }

  ngOnInit(): void {
    this.listarMenu();
  }

  navigateCajaMantenimiento() {
    this.router.navigate(['cajachica'])
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
      case '-105':
        return 'error';
      case '0':
        return 'success';
      default:
        return 'error';
    }
  }

  private errorSweetAlert(icon: 'error' | 'warning' | 'info' | 'success' = 'error') {
    Swal.fire({
      icon: icon,
      text: this.error || 'Hubo un error al procesar la solicitud',
    });
  }

  activeChange(event: MouseEvent) {
    // Obtener todos los elementos con la clase "nav-link"
    const links = document.querySelectorAll('.nav-link');

    // Eliminar la clase "active" de todos los enlaces
    links.forEach(link => {
      link.classList.remove('active');
    });

    // Añadir la clase "active" al enlace que se ha hecho clic
    const target = event.target as HTMLElement;
    target.classList.add('active');
  }

  listarMenu() {
    let post = {
      p_usu_id: this.dataUsuario.numid,
      p_apl_id: 13
    };
    this.spinner.show();
    this.calendarioService.listarMenu(post).subscribe({
      next: (data: any) => {
        this.spinner.hide();
        this.datosMenu = data;
      },
      error: (error: any) => {
        this.spinner.hide();
      },
    });

  }

  toggleCollapse(id: string) {
    if (this.collapsedMenus.has(id)) {
      this.collapsedMenus.delete(id);
    } else {
      this.collapsedMenus.add(id);
    }
  }

  isCollapsed(id: string): boolean {
    return !this.collapsedMenus.has(id);
  }
  getMenuID(enlace: any) {
    this.enlace = enlace;
    this.router.navigateByUrl(this.enlace)
  }



}
