import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HttpClientUtils } from '../utils/http-client.utils';

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

  private data: any;


  constructor(private httpClientUtils: HttpClientUtils, private http: HttpClient) { }


  //SETTER Y GETTER

  setData(data: any): void {
    this.data = data
  }

  getData(): void {
    return this.data
  }

  //-----------------------

  ingresarUsuario(data: any) {
    return this.httpClientUtils
      .postQuery('calendario/usuario/ingresar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  listarUsuario(data: any) {
    return this.httpClientUtils
      .postQuery('calendario/usuario/listar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  listarMenu(data: any) {
    return this.httpClientUtils
      .postQuery('calendario/listar-menu', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  listarEventos(data: any) {
    return this.httpClientUtils
      .postQuery('calendario/eventos/listar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  registrarEventos(data: any) {
    return this.httpClientUtils
      .postQuery('calendario/eventos/registrar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

}
