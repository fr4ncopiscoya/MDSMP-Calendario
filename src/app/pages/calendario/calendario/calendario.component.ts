import { Component, OnInit, AfterViewInit, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours, startOfMonth, format } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CajachicaService } from 'src/app/services/cajachica.service';
import { AppComponent } from 'src/app/app.component';
import { CalendarioService } from 'src/app/services/calendario.service';
import { DatePipe } from '@angular/common';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  dataUsuario: any

  verCalendario: boolean = false;

  @Input() locale: string = 'es';

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  modalData: {
    action: string;
    event: CalendarEvent;
  };
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];
  refresh = new Subject<void>();

  events: CalendarEvent[] = [];

  // events: CalendarEvent[] = [
  //   {
  //     start: addHours(startOfDay(new Date()), 2),
  //     end: addHours(new Date(), 2),
  //     title: 'A draggable and resizable event',
  //     color: { ...colors['yellow'] },
  //     actions: this.actions,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true,
  //     },
  //     draggable: true,
  //   },
  // ];

  activeDayIsOpen: boolean = true;


  constructor(
    private modal: NgbModal,
    private appComponent: AppComponent,
    private router: Router,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService,
    private datePipe: DatePipe,
    private cajachicaService: CajachicaService,
    private calendarioService: CalendarioService) {
    this.appComponent.login = false;
    const dataSistema = localStorage.getItem('dataUsuario');
    this.dataUsuario = JSON.parse(dataSistema);

    const dataUser = localStorage.getItem('dataUser');
    this.dataUsuario = JSON.parse(dataUser);
  }

  ngOnInit(): void {
    this.listarEventos(format(startOfMonth(this.viewDate), 'yyyy-MM-dd'), format(endOfMonth(this.viewDate), 'yyyy-MM-dd'));
  }

  listarEventos(fechaInicio: string, fechaFin: string) {
    let post = {
      p_eve_id: 0,
      p_ard_id: this.dataUsuario[0].ard_id,
      p_eve_fecini: fechaInicio,
      p_eve_fecfin: fechaFin
    };
    console.log(post);
    this.spinner.show();
    this.calendarioService.listarEventos(post).subscribe({
      next: (data: any) => {
        this.spinner.hide();
        data.map((item: any) =>
          this.events.push({
            start: startOfDay(new Date(item.eve_fhoini)),
            end: new Date(item.eve_fhofin),
            title: 'Nombre: ' + item.eve_nombre + '  |  ' + 'Fecha Inicio: ' + item.eve_fecini + '  |  ' + 'Fecha Fin: ' + item.eve_fecfin + '  |  ' + 'Area: ' + item.ard_descri,
            color: { ...colors['yellow'] },
            actions: this.actions,
            allDay: true,
            resizable: {
              beforeStart: true,
              afterEnd: true,
            },
            draggable: true,
          })
        );
        this.verCalendario = true;
        console.log(this.events);
      },
      error: (error: any) => {
        this.spinner.hide();
        console.log(error);
      },
    });
  }

  getMonthName(month: number): string {
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return months[month];
  }

  getFormattedDate(): string {
    const month = this.viewDate.getMonth();
    const year = this.viewDate.getFullYear();
    return `${this.getMonthName(month)} ${year}`;
  }

  dayClicked({ date, events }: {
    date: Date; events: CalendarEvent[]
  }): void {
    // if (isSameMonth(date, this.viewDate)) {
    //   if (
    //     (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
    //     events.length === 0
    //   ) {
    //     this.activeDayIsOpen = false;
    //   } else {
    //     this.activeDayIsOpen = true;
    //   }
    // }
    if (isSameDay) {
      this.activeDayIsOpen = true
    }
    this.viewDate = date;
    // this.listarEventos(format(startOfDay(date), 'yyyy-MM-dd'), format(endOfDay(date), 'yyyy-MM-dd'));
  }

  viewDateChanged({ date }: { date: Date }): void {
    this.viewDate = date;
    this.listarEventos(format(startOfMonth(date), 'yyyy-MM-dd'), format(endOfMonth(date), 'yyyy-MM-dd'));
  }


  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors['red'],
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
