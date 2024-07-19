import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, firstValueFrom } from 'rxjs';
import { HttpClientUtils } from '../utils/http-client.utils';

@Injectable({
    providedIn: 'root'
})
export class SanidadService {

    constructor(private httpClientUtils: HttpClientUtils) { }

    listarRecurrente(data: any) {
        return this.httpClientUtils.postQuery('sanidad/recurrente/listar', data).pipe(
            map(data => {
                return data;
            })
        );
    }

    guardarRecurrente(data: any) {
        return this.httpClientUtils.postQuery('sanidad/recurrente/registrar', data).pipe(
            map(data => {
                return data;
            })
        );
    }

    listarOcupacion(data: any) {
        return this.httpClientUtils.postQuery('sanidad/ocupacion/listar', data).pipe(
            map(data => {
                return data;
            })
        );
    }
    
    listarGiro(data: any) {
        return this.httpClientUtils.postQuery('sanidad/actividad/listar', data).pipe(
            map(data => {
                return data;
            })
        );
    }
    
    ListarCertificado(data: any) {
        return this.httpClientUtils.postQuery('sanidad/certificado/listar', data).pipe(
            map(data => {
                return data;
            })
        );
    }

    listarRubro(data: any) {
        return this.httpClientUtils.postQuery('sanidad/actividad/listar', data).pipe(
            map(data => {
                return data;
            })
        );
    }
    
    listarEstablecimiento(data: any) {
        return this.httpClientUtils.postQuery('sanidad/establecimiento/listar', data).pipe(
            map(data => {
                return data;
            })
        );
    }
    
    listarCarne(data: any) {
        return this.httpClientUtils.postQuery('sanidad/carne/listar', data).pipe(
            map(data => {
                return data;
            })
        );
    }
    
    
    guardarCarne(data: any) {
        return this.httpClientUtils.postQuery('sanidad/carne/guardar', data).pipe(
            map(data => {
                return data;
            })
        );
    }
    
    guardarCertificado(data: any) {
        return this.httpClientUtils.postQuery('sanidad/certificado/guardar', data).pipe(
            map(data => {
                return data;
            })
        );
    }
    
    //EXTRAS
    DeImagenURLaBase64(data: any) {
        return this.httpClientUtils.postQuery('sanidad/deimagenurlabase64', data).pipe(
            map(data => {
                return data;
            })
        );
    }
}
