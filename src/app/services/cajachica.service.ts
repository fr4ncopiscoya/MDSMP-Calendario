import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HttpClientUtils } from '../utils/http-client.utils';


@Injectable({
  providedIn: 'root'
})
export class CajachicaService {

  dataCaja: any
  dataCajachica: any
  dataCajaVales: any
  dataCajaGastos: any
  dataCajaAny: any

  cca_anyper: number
  cca_id: number
  ccv_id: number

  constructor(private httpClientUtils: HttpClientUtils, private http: HttpClient) { }

  ingresarUsuario(data: any) {
    return this.httpClientUtils
      .postQuery('user/login', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  listarUsuario(data: any) {
    return this.httpClientUtils
      .postQuery('usuario/listar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  listarCajaAnual(data: any) {
    return this.httpClientUtils
      .postQuery('gestion/listar-any', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  consultarPide(data: any) {
    return this.httpClientUtils
      .postQueryPide('persona/buscar-pide', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  consultarPideJuridica(data: any) {
    return this.httpClientUtils
      .postQueryPide('juridica/buscar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  consultarCajaChicasel(data: any) {
    return this.httpClientUtils
      .postQuery('gestion/listar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  listarMenu(data: any) {
    return this.httpClientUtils
      .postQuery('listar-menu', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  registrarCajaVales(data: any) {
    return this.httpClientUtils
      .postQuery('gestion/vales-crear', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  registrarCajaGastos(data: any) {
    return this.httpClientUtils
      .postQuery('gestion/gastos-crear', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  registrarCajaAny(data: any) {
    return this.httpClientUtils
      .postQuery('gestion/registrar-any', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  registrarApertura(data: any) {
    return this.httpClientUtils
      .postQuery('gestion/registrar-apertura', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  cerrarCajaPeriodo(data: any) {
    return this.httpClientUtils
      .postQuery('gestion/cerrar-periodo', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  cerrarCajaApertura(data: any) {
    return this.httpClientUtils
      .postQuery('gestion/cerrar-apertura', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  cerrarVale(data: any) {
    return this.httpClientUtils
      .postQuery('gestion/cerrar-vale', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  anularGasto(data: any) {
    return this.httpClientUtils
      .postQuery('gestion/gastos-anular', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  listarCajaVales(data: any) {
    return this.httpClientUtils
      .postQuery('gestion/vales', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  listarCajaGastos(data: any) {
    return this.httpClientUtils
      .postQuery('gestion/gastos', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  listarTipoDocumentoIdentidad(data: any) {
    return this.httpClientUtils
      .postQuery('listar/tipo-documento-identidad', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  listarTipoDocumento(data: any) {
    return this.httpClientUtils
      .postQuery('gestion/listar/tipo-documento', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  listarRubro(data: any) {
    return this.httpClientUtils
      .postQuery('gestion/listar/rubro', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  listarArea(data: any) {
    return this.httpClientUtils
      .postQuery('gestion/listar/area', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  exportarCajaXlS(data: any) {
    const url = 'http://webapp.mdsmp.gob.pe/cajachicabackend/public/v1/gestion/caja-exportar';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Opciones para la solicitud HTTP
    const options = {
      responseType: 'blob' as 'json', // Indica que esperamos un Blob como respuesta
      headers: headers
    };

    return this.http.post(url, data, options);
  }

}
