import {
  Component, OnInit, ViewChild,
  TemplateRef,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CajachicaService } from 'src/app/services/cajachica.service';
import { AppComponent } from 'src/app/app.component';
import { CalendarioService } from 'src/app/services/calendario.service';

// import 'ckeditor5/ckeditor5.css';
// import 'ckeditor5-premium-features/ckeditor5-premium-features.css';

@Component({
  selector: 'app-evento-home',
  templateUrl: './evento-home.component.html',
  styleUrls: ['./evento-home.component.css']
})
export class EventoHomeComponent implements OnInit {
  // MODAL
  @ViewChild('template') miModal!: ElementRef;
  modalRefs: { [key: string]: BsModalRef } = {}; // Objeto para almacenar los modalRefs
  modalRef?: BsModalRef;
  //FORMULARIO
  form!: FormGroup;

  @ViewChild(DataTableDirective, { static: false })
  dtElement: any;
  dtElementModal: any;

  dtTrigger: Subject<void> = new Subject<void>();
  // dtTriggerModal: Subject<void> = new Subject<void>();
  // dtOptionsModal: any;
  dtOptionsModal: DataTables.Settings = {};

  btnVerData: boolean = true;

  txt_tittle: string = ''

  //DATA
  datosCajaChica: any
  datosPeriodo: any
  dataUsuario: any
  datosEvento: any

  cca_anyper: number;
  cca_id: number;

  ard_id: number
  eve_fecini: string
  eve_fecfin: string

  mensa: string;
  area: string;

  constructor(
    private appComponent: AppComponent,
    private router: Router,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService,
    private cajachicaService: CajachicaService,
    private calendarioService: CalendarioService
  ) {
    // const fecha = new Date();
    // const fechaActual = new Date().toISOString().split('T')[0];
    // this.eve_fecfin = fechaActual

    // const primerDiaDelMes = new Date(fecha.getFullYear(), fecha.getMonth(), 1);
    // this.eve_fecini = primerDiaDelMes.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.dtOptionsModal = {
      // paging: true,
      // pagingType: 'numbers',
      info: false,
      scrollY: '520px',
      columnDefs: [
        // { width: '500px', targets: 2 },
      ],
      language: {
        // url: "//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json"
      },
    }
    this.appComponent.login = false;
    const dataSistema = localStorage.getItem('dataUsuario');
    this.dataUsuario = JSON.parse(dataSistema)

    const dataUser = localStorage.getItem('dataUser');
    this.dataUsuario = JSON.parse(dataUser)
    this.area = this.dataUsuario[0].ard_descri
    this.listarEventos();
  }


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    // this.dtTriggerModal.unsubscribe();
  }

  ngAfterViewInit() {
    this.dtTrigger.next();
    // this.dtTriggerModal.next();


    /* (document.querySelector('.dataTables_scrollBody') as HTMLElement).style.top = '150px'; */
  }

  private getIconByErrorCode(errorCode: number): 'error' | 'warning' | 'info' | 'success' {
    if (errorCode < 0 || errorCode === 999) {
      return 'error';
    }
    if (errorCode === 0) {
      return 'success';
    }
    // Puedes agregar más condiciones aquí para otros códigos de error y sus iconos correspondientes
    return 'info'; // Valor por defecto si no se cumple ninguna condición
  }

  private errorSweetAlert(icon: 'error' | 'warning' | 'info' | 'success' = 'error', callback?: () => void) {
    Swal.fire({
      icon: icon,
      text: this.mensa || 'Hubo un error al procesar la solicitud',
    }).then((result) => {
      if (result.isConfirmed && callback) {
        callback();
      }
    });
  }

  public sweetAlertValidar(data: any, title_val: string, confirmButtonText_val: string) {
    console.log("data-validar: ", data);

    Swal.fire({
      // title: "Estas seguro de anular esta resolución?",
      title: title_val,
      text: "No podrás deshacer esto!",
      // text: text_val,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: confirmButtonText_val
      // confirmButtonText: "Si, anular"
    }).then((result) => {
      if (result.isConfirmed) {
        // this.cerrarApertura(data.ccp_id);
      }
    });
  }


  modalRegistarEvento(template: TemplateRef<any>, data: any, ver: boolean) {
    let value = 0;
    // Si hay data y ccv_id está definido, usar ese valor
    if (data !== undefined) {
      value = data;
    }
    this.textValue(value);
    this.btnVerData = ver;
    if (this.btnVerData === false) {
      this.txt_tittle = 'Ver'
    }

    this.modalRefs['registar-evento'] = this.modalService.show(template, { id: 1, class: 'modal-lg', backdrop: 'static', keyboard: false });
  }

  //========================================================================================================================

  actualizarHome(value: any) {
    console.log("value", value);
    this.cca_anyper = value
    this.cajachicaService.cca_anyper = this.cca_anyper
    // this.consultarCajaChica()
  }

  textValue(data: any) {
    // console.log("data-cajachica: ", data);

    if (data !== null) {
      this.cajachicaService.dataCajachica = data
      this.txt_tittle = 'Editar';
    }
    else {
      this.cajachicaService.dataCajachica = null
      this.txt_tittle = 'Registrar'
    }
  }

  //DIGITAR UNICAMENTE NUMEROS
  validarNumero(event: any): void {
    const keyCode = event.keyCode;
    if (keyCode < 48 || keyCode > 57) {
      event.preventDefault();
    }
  }

  onInputChange(event: any) {
    event.target.value = event.target.value.toUpperCase();
  }

  // Obtener la fecha actual en formato "YYYY-MM-DD"
  getMaxDate(): string {
    return new Date().toISOString().split('T')[0];
  }


  // ====== MODALES =====
  cerrarModal(modalKey: string) {
    if (this.modalRefs[modalKey]) {
      this.modalRefs[modalKey].hide(); // Cierra el modal si está definido
    }
  }

  confirmClick(value: number) {
    console.log("value", value);
    this.cca_anyper = value
    this.cajachicaService.cca_anyper = this.cca_anyper
    // this.consultarCajaChica()
  }

  actualizarData() {
    console.log("estas llegando");

    // this.consultarCajaChica()
  }

  goToCreate(data: any) {
    console.log("data: ", data);
    this.router.navigateByUrl('/evento-crear')
  }

  goBackTo() {
    switch (this.mensa) {
      case 'Cierre Apertura Caja Chica Actualizada Correctamente':
        // case 'Apertura Caja Actualizado Correctamente':
        // this.modalService.hide(3);
        // this.consultarCajaChica()
        break;
      default:
        //
        break;
    }
  }

  //=====================

  listarEventos() {
    let post = {
      p_eve_id: 0,
      p_ard_id: this.dataUsuario[0].ard_id,
      p_eve_fecini: this.eve_fecini,
      p_eve_fecfin: this.eve_fecfin
    };
    console.log(post);
    this.spinner.show();
    this.calendarioService.listarEventos(post).subscribe({
      next: (data: any) => {
        this.spinner.hide();
        console.log(data);

        this.datosEvento = data;
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
        });
      },
      error: (error: any) => {
        this.errorSweetAlert();
        this.spinner.hide();
        console.log(error);
      },
    });

  }

  goAperturaVales(data: any) {
    try {
      const dataVal = JSON.stringify(data);
      localStorage.setItem('data', dataVal);
      this.router.navigateByUrl('/cajachica-gestion-vales');
    } catch (error) {
      console.error('Error stringifying data:', error);
    }
  }


}
