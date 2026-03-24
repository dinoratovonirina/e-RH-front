import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { catchError, tap, throwError } from 'rxjs';
import { User } from '../../../../core/models/user';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalConstant } from '../../../../core/constants/global.constant';
import { RegisterRequest } from '../../../../core/models/auth';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private endPointController = GlobalConstant.API_END_POINT_CONTROLLER;
  private endPointMethod = GlobalConstant.API_END_POINT_METHODE;

  register(registerForm: RegisterRequest) {
    return this.http.post<User>(`${environment.API_URL}${this.endPointController.AUTH}/${this.endPointMethod.REGISTER.POST}`, { ...registerForm })
      .pipe(
        tap((user: User) => {
          if (user.id) {
            this.router.navigate([`/${this.endPointController.AUTH}/${this.endPointMethod.LOGIN.POST}`]);
          }
        }),
        catchError((error: HttpErrorResponse) => {
          const message = error?.error?.message ?? 'Une Erreur est survenue';
          return throwError(() => new Error(message))
        })
      )
  }
}
