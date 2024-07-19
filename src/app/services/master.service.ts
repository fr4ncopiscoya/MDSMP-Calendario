import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, firstValueFrom } from 'rxjs';
import { HttpClientUtils } from '../utils/http-client.utils';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private httpClientUtils: HttpClientUtils) { }

  listarDepartamento(data: any) {
    return this.httpClientUtils.postQueryMaster('ubigeo/departamento/listar', data).pipe(
      map(data => {
        return data;
      })
    );
  }

  listarProvincia(data: any) {
    return this.httpClientUtils.postQueryMaster('ubigeo/provincia/listar', data).pipe(
      map(data => {
        return data;
      })
    );
  }

  listarDistrito(data: any) {
    return this.httpClientUtils.postQueryMaster('ubigeo/distrito/listar', data).pipe(
      map(data => {
        return data;
      })
    );
  }

  listarTipoDocumento(data: any) {
    return this.httpClientUtils.postQueryMaster('persona/tipodocumento/listar', data).pipe(
      map(data => {
        return data;
      })
    );
  }

  listarGenero(data: any) {
    return this.httpClientUtils.postQueryMaster('persona/tipogenero/listar', data).pipe(
      map(data => {
        return data;
      })
    );
  }

  listarPais(data: any) {
    return this.httpClientUtils.postQueryMaster('persona/pais/listar', data).pipe(
      map(data => {
        return data;
      })
    );
  }

  ListarPersona(data: any) {
    return this.httpClientUtils.postQueryMaster('persona/persona', data).pipe(
      map(data => {
        return data;
      })
    );
  }
  
  buscarPersona(data: any) {
    return this.httpClientUtils.postQueryMaster('persona/persona/listar', data).pipe(
      map(data => {
        return data;
      })
    );
  }
  
  buscarPersonaBus(data: any) {
    return this.httpClientUtils.postQueryMaster('persona/persona/bus', data).pipe(
      map(data => {
        return data;
      })
    );
  }

  buscarPersonaJuridica(data: any) {
    return this.httpClientUtils.postQueryMaster('persona/persona/juridica/listar', data).pipe(
      map(data => {
        return data;
      })
    );
  }

  buscarPersonaPide(data: any) {
    return this.httpClientUtils.postQueryPide('reniec/dni/buscar', data).pipe(
      map(data => {
        return data;
      })
    );
  }
  
  buscarEmpresaPide(data: any) {
    return this.httpClientUtils.postQueryPide('sunat/ruc/buscar', data).pipe(
      map(data => {
        return data;
      })
    );
  }

}
