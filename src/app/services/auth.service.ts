import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, firstValueFrom } from 'rxjs';
import { HttpClientUtils } from '../utils/http-client.utils';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClientUtils: HttpClientUtils){}

  postGetLoginUser(data: any){
    return this.httpClientUtils.postQuery('user/login', data).pipe(
      map(data => {
        return data;
      })
    );
  }
}
