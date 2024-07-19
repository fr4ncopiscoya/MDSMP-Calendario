import {
  Component, OnInit, ViewChild,
  TemplateRef,
  AfterViewInit,
  ElementRef,
  Output,
  EventEmitter,
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
import { createMask } from '@ngneat/input-mask'

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Input } from 'ckeditor5';

// import 'ckeditor5/ckeditor5.css';
// import 'ckeditor5-premium-features/ckeditor5-premium-features.css';

@Component({
  selector: 'app-evento-crear',
  templateUrl: './evento-crear.component.html',
  styleUrls: ['./evento-crear.component.css']
})
export class EventoCrearComponent implements OnInit {

  // @Output() eventoRegistrado = new EventEmitter<string>()

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

  currencyInputMask = createMask({
    alias: 'numeric',
    groupSeparator: ',',
    digits: 2,
    digitsOptional: false,
    prefix: 'S/. ',
    placeholder: '0',
  });

  files: File[] = [];
  maxFiles = 5;
  maxSize = 8 * 1024 * 1024; // 8MB

  title = 'angular';
  public Editor = ClassicEditor;

  btnVerData: boolean = true;

  txt_tittle: string = ''

  //DATA
  datosCajaChica: any
  datosPeriodo: any
  dataUsuario: any

  cca_anyper: number;
  cca_id: number;
  ccm_monmov: string;

  eve_fecini: string;
  eve_horini: string;
  eve_fecfin: string;
  eve_horfin: string;
  eve_nombre: string;
  eve_aliasn: string;
  eve_lugars: string;
  eve_observ: string;
  eve_reqrec: string;
  eve_monval: string;

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
    this.appComponent.login = false;
    const dataSistema = localStorage.getItem('dataUsuario');
    this.dataUsuario = JSON.parse(dataSistema)

    const dataUser = localStorage.getItem('dataUser');
    this.dataUsuario = JSON.parse(dataUser)
  }

  ngOnInit(): void {
    this.dtOptionsModal = {
      // paging: true,
      // pagingType: 'numbers',
      info: false,
      scrollY: '350px',
      columnDefs: [
        // { width: '500px', targets: 2 },
      ],
      order: [
        0, 'acs'
      ],
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json"
      },
    }

    // Obtener el año actual
    const fechaActual = new Date();
    const anioActual = fechaActual.getFullYear().toString();
    this.cca_anyper = Number(anioActual);

    this.cajachicaService.cca_anyper = this.cca_anyper
    this.area = this.dataUsuario[0].ard_descri
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
        // this.eventoRegistrado.emit()
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

  onSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const selectedFiles = Array.from(input.files) as File[];

      // Filtrar archivos válidos y ajustar el número máximo
      const validFiles = selectedFiles.filter(file => this.validateFile(file));

      // Asegurarse de no exceder el límite máximo de archivos
      if (this.files.length + validFiles.length > this.maxFiles) {
        Swal.fire(`Solo puedes subir maximo ${this.maxFiles} archivos.`);
        // alert(`You can only upload a maximum of ${this.maxFiles} files.`);
        return;
      }

      this.files.push(...validFiles);
    }
    console.log("files: ", this.files);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files) {
      const droppedFiles = Array.from(event.dataTransfer.files) as File[];

      // Filtrar archivos válidos y ajustar el número máximo
      const validFiles = droppedFiles.filter(file => this.validateFile(file));

      if (this.files.length + validFiles.length > this.maxFiles) {
        Swal.fire(`Solo puedes subir maximo ${this.maxFiles} archivos.`);
        // alert(`You can only upload a maximum of ${this.maxFiles} files.`);
        return;
      }

      this.files.push(...validFiles);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onRemove(file: File): void {
    this.files = this.files.filter(f => f !== file);
  }

  getFileSrc(file: File): string {
    return file.type.startsWith('image/') ? URL.createObjectURL(file) : 'assets/images/new-document.png';
  }

  private validateFile(file: File): boolean {
    // Verifica si el nombre del archivo contiene espacios o tildes
    const fileName = file.name;
    const isValidName = !/\s/.test(fileName) && !/[áéíóúüñ]/i.test(fileName);

    if (!isValidName) {
      Swal.fire(`El nombre del archivo "${fileName}" es invalido. No debe contener espacios ni cararateres esperiales.`);
      // alert(`The file name "${fileName}" is invalid. It must not contain spaces or special characters.`);
      return false;
    }

    // Verifica si el tamaño del archivo es mayor que el tamaño máximo permitido
    if (file.size > this.maxSize) {
      Swal.fire(`El archivo "${fileName}" no puede exeder los 8M`);
      return false;
    }

    return true;
  }

  exportarCajaXls(data: any) {
    let ccp_id = data.ccp_id
    let cca_monape = data.cca_monape
    let cca_monval = data.cca_monval
    let cca_mongas = data.cca_mongas

    const url = `http://localhost/test/public/v1/cajachica/gestion/caja-exportar?p_ccp_id=${ccp_id}&cca_monape=${cca_monape}&cca_monval=${cca_monval}&cca_mongas=${cca_mongas}`;
    window.open(url, '_blank');

    // this.cajachicaService.exportarCajaXlS(data).subscribe((blob) => {
    //   console.log('Archivo descargado correctamente');
    // }, error => {
    //   console.error('Error downloading the file', error);
    // });
  }

  modalListarPeriodo(template: TemplateRef<any>, data: any) {
    this.modalRefs['listar-periodo'] = this.modalService.show(template, { id: 2, class: 'modal-lg', backdrop: 'static', keyboard: false });
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
    this.consultarCajaChica()
  }

  actualizarData() {
    console.log("estas llegando");

    this.consultarCajaChica()
  }

  goBackTo() {
    switch (this.mensa) {
      case 'Evento Registrado Correctamente':
        this.router.navigateByUrl('/eventos')
        break;
      default:
        //
        break;
    }
  }

  //=====================
  consultarCajaChica() {
    let post = {
      p_cca_id: 0,
      p_cca_anyper: Number(this.cajachicaService.cca_anyper)
    }

    this.cajachicaService.listarCajaAnual(post).subscribe({
      next: (data: any) => {
        // this.spinner.show()
        this.datosPeriodo = data
        this.cca_id = data[0].cca_id
        this.cajachicaService.cca_id = this.cca_id

        console.log("datos-periodo: ", this.datosPeriodo);

        let postSel = {
          p_ccp_id: 0,
          p_cca_id: this.cca_id,
        };
        console.log(postSel);
        this.spinner.show();
        this.cajachicaService.consultarCajaChicasel(postSel).subscribe({
          next: (data: any) => {
            this.spinner.hide();
            console.log(data);

            this.datosCajaChica = data;

            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.destroy();
              this.dtTrigger.next();
            });
          },
          error: (error: any) => {
            this.spinner.hide();
            console.log(error);
          },
        });

      }
    })
  }

  registrarEventos() {
    // console.log("hora: ", this.eve_horeve);
    // console.log("fecha: ", this.eve_feceve);

    const fileNames = this.files.map(file => file.name);
    const montoLimpio = this.eve_monval ? this.eve_monval.replace('S/.', '').replace(',', '') : '';
    const montoFloat = parseFloat(montoLimpio);

    let post = {
      p_eve_id: 0,
      p_ard_id: this.dataUsuario[0].ard_id,
      p_usu_id: this.dataUsuario[0].usu_id,
      p_eve_fecini: this.eve_fecini,
      p_eve_horini: this.eve_horini,
      p_eve_fecfin: this.eve_fecfin,
      p_eve_horfin: this.eve_horfin,
      p_eve_nombre: this.eve_nombre,
      p_eve_aliasn: this.eve_aliasn,
      p_eve_lugars: this.eve_lugars,
      p_eve_observ: this.eve_observ,
      p_eve_reqrec: this.eve_reqrec,
      p_eve_monval: montoFloat,
      p_eve_jsdpdf: fileNames
    }
    console.log("post: ", post);

    this.calendarioService.registrarEventos(post).subscribe({
      next: (data: any) => {
        console.log("data:", data);
        this.mensa = data[0].mensa
        const errorCode = data[0].error

        const icon = this.getIconByErrorCode(errorCode)

        this.errorSweetAlert(icon, this.goBackTo.bind(this))
      }
    })
  }

  // cerrarApertura(ccp_id: any) {
  //   console.log("ccp_id: ", ccp_id);

  //   let post = {
  //     p_ccp_id: ccp_id,
  //     p_ccp_usumov: this.dataUsuario.numid
  //   }
  //   console.log("post-cerrarCaja: ", post);

  //   this.cajachicaService.cerrarCajaApertura(post).subscribe({
  //     next: (data: any) => {
  //       console.log("data-cerrarCaja:", data);
  //       this.mensa = data[0].mensa
  //       const errorCode = data[0].error

  //       const icon = this.getIconByErrorCode(errorCode)

  //       this.errorSweetAlert(icon, this.goBackTo.bind(this))
  //     }
  //   })
  // }

  goAperturaVales(data: any) {
    try {
      const dataVal = JSON.stringify(data);
      localStorage.setItem('data', dataVal);
      this.router.navigateByUrl('/cajachica-gestion-vales');
    } catch (error) {
      console.error('Error stringifying data:', error);
    }
  }

  GenerarReporte(data: any) {

  }

}
