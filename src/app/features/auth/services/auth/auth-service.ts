import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { AuthResponse, LoginRequest } from '../../../../core/models/auth';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private router = inject(Router);

  authLogin(dataLogin: LoginRequest) {
    return this.http.post<AuthResponse>(`${environment.API_URL}auth/login`, { ...dataLogin }).pipe(
      tap((data: AuthResponse)  => {
        localStorage.setItem('token', data.token);
        this.router.navigate(['/home']);
      })
    );
  }
}