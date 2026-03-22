import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  authLogin(dataLogin: any) {
    this.http.post(`${environment.API_URL}auth/login`, {
      email: dataLogin.email,
      password: dataLogin.password
    }).subscribe((res: any) => {})
  }
}
