import { NgModule, Injectable, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerModule } from "ngx-spinner";
import { DataTablesModule } from "angular-datatables";
import { DataTableDirective } from 'angular-datatables';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from "ngx-bootstrap/modal";
import { TreeviewModule } from 'ngx-treeview';
import { TypeaheadModule } from "ngx-bootstrap/typeahead";
import { LoginGuard } from './guards/login.guard';
import { InputMaskModule } from '@ngneat/input-mask';
import { LoginComponent } from './pages/login/login.component';
import { ToastComponent } from './components/toast/toast.component';
import { MenuComponent } from './components/menu/menu.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { EventoHomeComponent } from './pages/calendario/evento-home/evento-home.component';
import { EventoCrearComponent } from './pages/calendario/evento-crear/evento-crear.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { FileSizePipe } from './pages/calendario/evento-crear/file-size-pipe';
import { FilePreviewPipe } from './pages/calendario/evento-crear/file-preview-pipe';
import { CalendarioComponent } from './pages/calendario/calendario/calendario.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { DatePipe } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@NgModule({
  declarations: [
    ToastComponent,
    AppComponent,
    LoginComponent,
    MenuComponent,
    InicioComponent,
    NavbarComponent,
    InicioComponent,
    EventoHomeComponent,
    EventoCrearComponent,

    FileSizePipe,
    FilePreviewPipe,
    CalendarioComponent,
    DashboardComponent
  ],
  imports: [
    InputMaskModule.forRoot({ inputSelector: 'input', isAsync: true }),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxDropzoneModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgSelectModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    DataTablesModule,
    TooltipModule.forRoot(),
    TypeaheadModule.forRoot(),
    ModalModule.forRoot(),
    TreeviewModule.forRoot(),
    RouterModule.forRoot(ROUTES),
    CKEditorModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  providers: [
    ToastComponent,
    DataTableDirective,
    TooltipModule,
    LoginComponent,
    LoginGuard,
    DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
