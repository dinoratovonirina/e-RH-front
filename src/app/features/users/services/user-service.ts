import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../../../core/models/user';
import { GlobalConstant } from '../../../core/constants/global.constant';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private contoller = GlobalConstant.API_END_POINT_CONTROLLER.USER;
  private methode = GlobalConstant.API_END_POINT_METHODE.LIST;

  getAllUser(): Observable<Partial<User>[]> {
    return this.http.get<User[]>(`${environment.API_URL}${this.contoller}/${this.methode.GET}`)
      .pipe(
        map(users =>
          users.map(user => ({
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            isActive: user.isActive,
            role: user.role ?? '-'
          }))
        ),
        catchError((err: HttpErrorResponse) => {
          const message = err?.error?.message ?? 'Une erreur est survenue';
          return throwError(() => new Error(message));
        })
      );
  }
}
