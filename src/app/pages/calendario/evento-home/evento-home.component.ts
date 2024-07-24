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

  filesarchivos: File[] = [];

  @ViewChild(DataTableDirective, { static: false })
  dtElement: any;
  dtElementModal: any;

  dtTrigger: Subject<void> = new Subject<void>();
  dtOptionsModal: DataTables.Settings = {};

  btnVerData: boolean = true;

  txt_tittle: string = ''

  //DATA
  datosCajaChica: any;
  datosPeriodo  : any;
  dataUsuario   : any;
  datosEvento   : any;
  dataArchivos  : any;

  fb_evearchivos: number = 0;
  numconveleg: number = 0;
  carpetaactu: string = '';

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
  }

  ngOnInit(): void {    
    this.dtOptionsModal = {
      info: false,
      scrollY: '520px',
      columnDefs: [
      ],
      language: {
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
  }

  ngAfterViewInit() {
    this.dtTrigger.next();
  }

  private getIconByErrorCode(errorCode: number): 'error' | 'warning' | 'info' | 'success' {
    if (errorCode < 0 || errorCode === 999) {
      return 'error';
    }
    if (errorCode === 0) {
      return 'success';
    }
    return 'info';
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

  modalArchivosEvento(template: TemplateRef<any> , data: any) {
    this.fb_evearchivos = data['eve_id'];
    this.fillarchivosSel();
    this.modalRefs['archivos-evento']  = this.modalService.show(template, { id: 1, class: 'modal-lg', backdrop: 'static', keyboard: false });
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

  //PARA AGREGAR EL ARCHIVO
  onSelectarchivos(event:any) {
    if (event.addedFiles.length == 1) {
      if (this.filesarchivos.length < 1) {
        this.filesarchivos.push(...event.addedFiles);
        (document.querySelector('#botonsubcomuni') as HTMLElement).style.display = 'block';
      } else {
        (document.querySelector('#botonsubcomuni') as HTMLElement).style.display = 'none';
      }
    }else{
      Swal.fire({
        title: 'Error',
        text: 'Ha intentado subir más de un archivo , porfavor ingresar solo uno',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar',
      });
    }
  }

  fillarchivosSel(){
    let post = {
      p_eve_id: this.fb_evearchivos,
      p_epf_activo: 1
    };
    
    this.spinner.show();
    
    this.calendarioService.getArchivosEventosSel(post).subscribe({
      next: (data: any) => {
        this.spinner.hide();
        
        console.log(data);
        this.dataArchivos = data;

      },
      error: (error: any) => {
        this.errorSweetAlert();
        this.spinner.hide();
        console.log(error);
      },
    });
  }

  onRemovearchivos(event:any) {
    this.filesarchivos.splice(this.filesarchivos.indexOf(event), 1);
    (document.querySelector('#botonsubcomuni') as HTMLElement).style.display = 'none';
  }

  uploadFilesarchivos() {
    const dataPost = new FormData();
    dataPost.append('eve_id', this.fb_evearchivos.toString());
    dataPost.append('p_usu_id',JSON.parse(localStorage.getItem("dataUsuario")).numid);
    for (var i = 0; i < this.filesarchivos.length; i++) {
      dataPost.append('files_archivos[]', this.filesarchivos[i]);
    }
    this.calendarioService.getUploadFilesarchivos(dataPost).subscribe((data: any) => {
      console.log(data);
      if (data.p_error == 0) {
        this.filesarchivos = [];
        this.fillarchivosSel();
        Swal.fire({
          title: 'Exito',
          text: 'Sus ficheros se cargaron correctamente.',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar',
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Ocurrio un error al cargar sus archivos, intentelo nuevamente.',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar',
        });
      }
    });
    (document.querySelector('#botonsubcomuni') as HTMLElement).style.display = 'none';
  }

  eliminararchivos(codig: number) {
    const data_post = {
      p_com_id: codig
    };
    this.calendarioService.geteliminararchivos(data_post).subscribe((data: any) => {
      Swal.fire({
        title: 'Mensaje',
        html: "¿Seguro de Eliminar Registro?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ACEPTAR',
        cancelButtonText: 'CANCELAR'
      }).then((result) => {
        if (result.isConfirmed) {
          this.calendarioService.geteliminararchivos(data_post).subscribe((data: any) => {
            if (data[0].error == 0) {
              Swal.fire({
                title: 'Exito',
                text: data[0].mensa.trim(),
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar',
              }).then((result) => {
                if (result.value) {
                  setTimeout(() => {
                    //this.fillarchivosSel();
                  }, 300);
                }
              });
            } else {
              Swal.fire({
                title: 'Error',
                text: data[0].mensa.trim(),
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar',
              });
            }
          });
        }
      })
    });
  }

  convertirNumeroceroIZQ(number:any, width:any) {
    var numberOutput = Math.abs(number);
    var length = number.toString().length;
    var zero = "0";
    if (width <= length) {
      if (number < 0) {
        return ("-" + numberOutput.toString());
      } else {
        return numberOutput.toString();
      }
    } else {
      if (number < 0) {
        return ("-" + (zero.repeat(width - length)) + numberOutput.toString());
      } else {
        return ((zero.repeat(width - length)) + numberOutput.toString());
      }
    }
  }

  linkDescargar(ruta: string, file: string, cnv_id: number) {
    const data_post = {
      cnv_ruta: ruta,
      cnv_nombre: file,
      cnv_id: cnv_id
    };
    this.calendarioService.getVisualizarArchivos(data_post).subscribe((data: any) => {
      if (data.p_error==0) {
        window.open(data.p_mensa);
      }else{
        Swal.fire({
          title: 'Error',
          text: data.p_mensa,
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar',
        });
      }
    });
  }
}
