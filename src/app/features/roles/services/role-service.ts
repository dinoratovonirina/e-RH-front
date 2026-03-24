import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GlobalConstant } from '../../../core/constants/global.constant';
import { environment } from '../../../../environments/environment.development';
import { catchError, Observable, retry, tap, throwError } from 'rxjs';
import { Role } from '../../../core/models/role';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private http = inject(HttpClient);
  private endPointController = GlobalConstant.API_END_POINT_CONTROLLER;
  private endPointMethod = GlobalConstant.API_END_POINT_METHODE;

  getAll(): Observable<Role[]> {
    return this.http.get<Role[]>(`${environment.API_URL}${this.endPointController.ROLE}/${this.endPointMethod.LIST.GET}`)
      .pipe(
        retry(1),
        tap(() => {}),
        catchError((err: HttpErrorResponse) => {
          const message = err.error.message;
          return throwError(() => new Error(message))
        })
      )
  }
}
