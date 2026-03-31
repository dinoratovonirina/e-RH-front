import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { AuthResponse, LoginRequest } from '../../../../core/models/auth';
import { catchError, tap, throwError } from 'rxjs';
import { GlobalConstant } from '../../../../core/constants/global.constant';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private endPointController = GlobalConstant.API_END_POINT_CONTROLLER;
  private endPointMethod = GlobalConstant.API_END_POINT_METHODE;

  authLogin(dataLogin: LoginRequest) {
    return this.http.post<AuthResponse>(`${environment.API_URL}${this.endPointController.AUTH}/${this.endPointMethod.LOGIN.POST}`, { ...dataLogin }).pipe(
      tap((data: AuthResponse) => {
        localStorage.setItem('token', data.token);
      }),
      catchError((err: HttpErrorResponse) => {
        const message = err.error?.message ?? 'Une erreur est survenue';
        return throwError(() => new Error(message));
      })
    );
  }
}