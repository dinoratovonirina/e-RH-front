import { Component, inject, signal } from '@angular/core';
import { InputField } from '../../../../shared/components/input-field/input-field';
import { Button } from '../../../../shared/components/button/button';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth-service';
import { LoginRequest } from '../../../../core/models/auth';
import { catchError, EMPTY, exhaustMap, finalize, Subject, tap } from 'rxjs';
import { Router } from '@angular/router';
import { GlobalConstant } from '../../../../core/constants/global.constant';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-form-login',
    imports: [ReactiveFormsModule, FormsModule, InputField, Button],
    templateUrl: './form-login.html',
    styleUrl: './form-login.css',
})
export class FormLogin {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);
    private endPointController = GlobalConstant.API_END_POINT_CONTROLLER;

    public errorMsg = signal<string>('');

    private submit$ = new Subject<LoginRequest>();

    loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });

    constructor() {
        this.submit$.pipe(
            tap(() => this.errorMsg.set('')),
            exhaustMap(data =>
                this.authService.authLogin(data).pipe(
                    tap(() => this.router.navigate([`/${this.endPointController.HOME}`])),
                    catchError((err: Error) => {
                        this.errorMsg.set(err.message);
                        return EMPTY;
                    })
                )
            ),
            takeUntilDestroyed()
        ).subscribe();
    }

    get emailCtrl() {
        return this.loginForm.get('email') as FormControl;
    }

    get passwordCtrl() {
        return this.loginForm.get('password') as FormControl;
    }

    handleSubmit() {
        if (this.loginForm.invalid) return;
        this.submit$.next(this.loginForm.value as LoginRequest);
    }
}