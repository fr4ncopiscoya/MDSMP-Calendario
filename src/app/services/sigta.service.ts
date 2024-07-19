import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, firstValueFrom } from 'rxjs';
import { HttpClientUtils } from '../utils/http-client.utils';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SigtaService {

  //id's-exportar
  idcorrl: any;
  cga_id: any;
  exp_id: any;
  p_concid: any;
  cusuari: any;


  //Datos para pintar 
  ctipvia: any;
  cdtipvia: any;
  cdescri: any;
  ccodhur: any;
  ctiphur: any;
  dpoblad: any;
  cpostal: any;

  //Botones activos
  obj_id: any;
  apb_activo: any;
  permisos: any;

  constructor(private httpClientUtils: HttpClientUtils, private http: HttpClient) { }

  listarAreaOficina(data: any) {
    return this.httpClientUtils
      .postQuery('sigta/areaoficina/listar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  consultarPide(data: any) {
    return this.httpClientUtils
      .postQueryPide('persona/buscar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  listarGiroEstablecimiento(data: any) {
    return this.httpClientUtils
      .postQuery('sigta/giro/listar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  listarMedidaComp(data: any) {
    return this.httpClientUtils.postQuery('sigta/medidacomp/listar', data).pipe(
      map((data) => {
        return data;
      })
    );
  }

  busContribuyente(data: any) {
    return this.httpClientUtils
      .postQuery('sigta/contribuyente/listar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  buscarMulta(data: any) {
    return this.httpClientUtils.postQuery('sigta/multa/listar', data).pipe(
      map((data) => {
        return data;
      })
    );
  }

  obtenerNombrePorCod(data: any) {
    return this.httpClientUtils
      .postQuery('sigta/contribuyente-nombre/listar', data)
      .pipe(
        map((data) => {
          return data
        })
      );
  }

  listarPersonas(data: any) {
    return this.httpClientUtils
      .postQuery('sigta/persona/listar', data)
      .pipe(
        map((data) => {
          return data
        })
      );
  }

  obtenerDescripcionPorCod(data: any) {
    return this.httpClientUtils
      .postQuery('sigta/descripcion/listar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  listarReferencia(data: any) {
    return this.httpClientUtils
      .postQuery('sigta/referencia/listar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  listarCosGasValue(data: any) {
    return this.httpClientUtils
      .postQuery('sigta/cosgasvalue/listar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  consultarMulta(data: any) {
    return this.httpClientUtils
      .postQuery('sigta/consultarMulta/listar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  consultarMultaExport(data: any) {
    return this.httpClientUtils
      .postQuery('sigta/consultarMulta/listar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  registrarMulta(data: any) {
    return this.httpClientUtils
      .postQuery('sigta/infraccion/registrar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  editarInfraccion(data: any) {
    return this.httpClientUtils
      .postQuery('sigta/infraccion/editar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  listarTipoPersona(data: any) {
    return this.httpClientUtils
      .postQuery('sigta/tipoPersona/listar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  listarDistrito(data: any) {
    return this.httpClientUtils
      .postQuery('sigta/distrito/listar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  listarFechas(data: any) {
    return this.httpClientUtils
      .postQuery('sigta/fechas/listar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  listarCuentaCorriente(data: any) {
    return this.httpClientUtils
      .postQuery('sigta/cuentacorriente/listar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  listarExpediente(data: any) {
    return this.httpClientUtils
      .postQuery('sigta/expediente/listar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  listarExpedienteNuevo(data: any) {
    return this.httpClientUtils
      .postQuery('sigta/expedientenuevo/listar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  listarExpedienteVer(data: any) {
    return this.httpClientUtils
      .postQuery('sigta/expediente/ver', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  listarCosGas(data: any) {
    return this.httpClientUtils
      .postQuery('sigta/cosgas/listar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  listarDocInfra(data: any) {
    return this.httpClientUtils
      .postQuery('sigta/docinfra/listar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  registrarAdministrado(data: any) {
    return this.httpClientUtils
      .postQuery('sigta/administrado/registrar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  registrarCosGas(data: any) {
    return this.httpClientUtils
      .postQuery('sigta/cosgas/registrar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  listarUsuario(data: any) {
    return this.httpClientUtils
      .postQuery('sigta/usuario/listar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  listarMenu(data: any) {
    return this.httpClientUtils
      .postQuery('sigta/menu/listar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  ingresarUsuario(data: any) {
    return this.httpClientUtils
      .postQuery('sigta/usuario/ingresar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  registrarResolucion(data: any) {
    return this.httpClientUtils
      .postQuery('sigta/resolucion/registrar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  listarVias(data: any) {
    return this.httpClientUtils
      .postQuery('sigta/vias/listar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  listarHabUrb(data: any) {
    return this.httpClientUtils
      .postQuery('sigta/haburb/listar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  validarDescuento(data: any) {
    return this.httpClientUtils
      .postQuery('sigta/descuento/validar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  aplicarDescuento(data: any) {
    return this.httpClientUtils
      .postQuery('sigta/descuento/aplicar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  verDatosPago(data: any) {
    return this.httpClientUtils
      .postQuery('sigta/ver/pago', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  anularResolucion(data: any) {
    return this.httpClientUtils
      .postQuery('sigta/resolucion/anular', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  anularMulta(data: any) {
    return this.httpClientUtils
      .postQuery('sigta/multa/anular', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  registrarInformeFinal(data: any) {
    return this.httpClientUtils
      .postQuery('sigta/informe/registrar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  registrarExpediente(data: any) {
    return this.httpClientUtils
      .postQuery('sigta/expediente/registrar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  registrarDireccion(data: any) {
    return this.httpClientUtils
      .postQuery('sigta/direccion/registrar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  regularizarCuentaCorriente(data: any) {
    return this.httpClientUtils
      .postQuery('sigta/regularizar/cuentacorriente', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  permisoBotones(data: any) {
    return this.httpClientUtils
      .postQuery('sigta/botones/permiso', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  cambiarPass(data: any) {
    return this.httpClientUtils
      .postQuery('sigta/password/editar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  getIp() {
    return this.httpClientUtils
      .getQueryIp()
      .pipe(
        map((data) => {
          return data
        })
      )
  }

  exportarccPDF(data: any) {
    const url = 'http://webapp.mdsmp.gob.pe/sigtabackend/public/v1/sigta/cuentacorriente/exportar';

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

  exportarExcel(p_codcon: any, p_numnot: any, p_codinf: any, p_fecini: any, p_fecfin: any, p_idcorr: any) {
    console.log(this.httpClientUtils + 'sigta/excel/exportar/' + p_codcon + '/' + p_numnot + '/' + p_codinf + '/' + p_fecini + '/' + p_fecfin + '/' + p_idcorr);
  }


























  listarPropietario(data: any) {
    return this.httpClientUtils.postQuery('sanidad/propietariosel', data).pipe(
      map((data) => {
        return data;
      })
    );
  }

  guardarRecurrente(data: any) {
    return this.httpClientUtils
      .postQuery('sanidad/recurrente/registrar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  guardarPropietario(data: any) {
    return this.httpClientUtils.postQuery('sanidad/propietarioreg', data).pipe(
      map((data) => {
        return data;
      })
    );
  }

  listarOcupacion(data: any) {
    return this.httpClientUtils
      .postQuery('sanidad/ocupacion/listar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  listarGiro(data: any) {
    return this.httpClientUtils
      .postQuery('sanidad/actividad/listar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  ListarCertificado(data: any) {
    return this.httpClientUtils
      .postQuery('sanidad/certificado/listar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  listarRubro(data: any) {
    return this.httpClientUtils
      .postQuery('sanidad/actividad/listar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  listarEstablecimiento(data: any) {
    return this.httpClientUtils
      .postQuery('sanidad/establecimiento/listar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  listarCarne(data: any) {
    return this.httpClientUtils.postQuery('sanidad/carne/listar', data).pipe(
      map((data) => {
        return data;
      })
    );
  }

  guardarCarne(data: any) {
    return this.httpClientUtils.postQuery('sanidad/carne/guardar', data).pipe(
      map((data) => {
        return data;
      })
    );
  }

  guardarCertificado(data: any) {
    return this.httpClientUtils
      .postQuery('sanidad/certificado/guardar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  //EXTRAS
  DeImagenURLaBase64(data: any) {
    return this.httpClientUtils
      .postQuery('sanidad/deimagenurlabase64', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  //MASCOTAS

  animalreg(data: any) {
    return this.httpClientUtils.postQuery('sanidad/animalreg', data).pipe(
      map((data) => {
        return data;
      })
    );
  }

  animalsel(data: any) {
    return this.httpClientUtils.postQuery('sanidad/animalsel', data).pipe(
      map((data) => {
        return data;
      })
    );
  }

  especieselec(data: any) {
    return this.httpClientUtils.postQuery('sigta/especieselec', data).pipe(
      map((data) => {
        return data;
      })
    );
  }

  animalsexosel(data: any) {
    return this.httpClientUtils.postQuery('sanidad/animalsexosel', data).pipe(
      map((data) => {
        return data;
      })
    );
  }

  especierazasel(data: any) {
    return this.httpClientUtils.postQuery('sanidad/especierazasel', data).pipe(
      map((data) => {
        return data;
      })
    );
  }
  BuscarRecibo(data: any) {
    return this.httpClientUtils.postQuery('sanidad/apirecibosel', data).pipe(
      map((data) => {
        return data;
      })
    );
  }

  AnularCarnet(data: any) {
    return this.httpClientUtils.postQuery('sanidad/AnularCarnet', data).pipe(
      map((data) => {
        return data;
      })
    );
  }

  ListarAnimalPropietario(data: any) {
    return this.httpClientUtils
      .postQuery('sanidad/ListarAnimalPropietario', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  GuardarAnimalPropietario(data: any) {
    return this.httpClientUtils
      .postQuery('sanidad/animalpropietarioreg', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  AnularCertificado(data: any) {
    return this.httpClientUtils
      .postQuery('sanidad/AnularCertificado', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  SendCorreoCarnet(data: any) {
    return this.httpClientUtils
      .postQuery('sanidad/ProcesoEnvioCorreoCarnet', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  SendCorreoCertificado(data: any) {
    return this.httpClientUtils
      .postQuery('sanidad/ProcesoEnvioCorreoCertificado', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
}
