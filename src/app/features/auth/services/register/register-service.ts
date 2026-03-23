import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { tap } from 'rxjs';
import { User } from '../../../../core/models/user';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private http = inject(HttpClient);
  private router = inject(Router);

  register(registerForm: FormGroup) {
    return this.http.post<User>(`${environment.API_URL}auth/register`, { ...registerForm.value })
      .pipe(
        tap((user: User) => {
          if (user.id) {
            registerForm.reset();
            this.router.navigate(['/auth/login']);
          }
        })
      )
  }
}
