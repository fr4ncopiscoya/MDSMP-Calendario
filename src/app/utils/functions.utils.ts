import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FunctionsUtils {
  fileToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result!.toString());
      reader.onerror = error => reject(error);
    });
  }

  setNumberToBoolean(value: number) {
    let result;
    if (value > 0) {
      result = true
    } else {
      result = false
    }

    return result;
  }

  statusText(status: boolean) {
    if (status) {
      return '<i class="ri-checkbox-circle-line fs-17 align-middle"></i> Activo';
    }
    return '<i class="ri-close-circle-line fs-17 align-middle"></i> Inactivo';
  }

  statusColor(status: boolean) {
    if (status) {
      return 'text-success';
    }
    return 'text-danger';
  }

  getEnableButtonClass(status: boolean) {
    if (status == true) {
      return 'link-danger';
    } else {
      return 'link-success';
    }
  }

  getEnableButtonText(status: boolean) {
    if (status == true) {
      return 'Deshabilitar';
    } else {
      return 'Habilitar';
    }
  }

  setBooleanToInteger(value: boolean) {
    let valor = (value) ? 1 : 0;
    return valor;
  }

  convertirNumeroceroIZQ(number: any, width: any) {
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
}