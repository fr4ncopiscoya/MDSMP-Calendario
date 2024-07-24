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
  
  getUploadFilesarchivos(data: any) {
    return this.httpClientUtils
      .postQuery('calendario/eventos/uploadFilesArchivos', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  getArchivosEventosSel(data: any){
    return this.httpClientUtils
      .postQuery('calendario/eventos/Archivossel', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  
  geteliminararchivos(data: any) {
    return this.httpClientUtils
      .postQuery('geteliminararchivos', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  
  getVisualizarArchivos(data: any) {
    return this.httpClientUtils
      .postQuery('getvisualizarArchivos', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
}
