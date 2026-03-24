import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { GlobalConstant } from '../../../core/constants/global.constant';
import { catchError, Observable, retry, tap, throwError } from 'rxjs';
import { Departement } from '../../../core/models/departement';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private http = inject(HttpClient);
  private endPointController = GlobalConstant.API_END_POINT_CONTROLLER;
  private endPointMethod = GlobalConstant.API_END_POINT_METHODE;

  getAll(): Observable<Departement[]> {
    return this.http.get<Departement[]>(`${environment.API_URL}${this.endPointController.DEPARTMENT}/${this.endPointMethod.LIST.GET}`)
      .pipe(
        retry(1),
        tap(() => { })
        , catchError((error: HttpErrorResponse) => {
          const message = error?.error?.message ?? "Une erreur est surnvenue";
          return throwError(() => new Error(message));
        })
      )
  }
}
