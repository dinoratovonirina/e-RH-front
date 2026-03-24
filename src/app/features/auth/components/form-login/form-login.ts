import { Component, inject, signal } from '@angular/core';
import { InputField } from '../../../../shared/components/input-field/input-field';
import { Button } from '../../../../shared/components/button/button';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth-service';
import { LoginRequest } from '../../../../core/models/auth';

@Component({
  selector: 'app-form-login',
  imports: [ReactiveFormsModule, FormsModule, InputField, Button],
  templateUrl: './form-login.html',
  styleUrl: './form-login.css',
})
export class FormLogin {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);

    public errorMsg = signal<string>('');

    loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
    });

    handleSubmit() {
        if (this.loginForm.invalid) return;

        this.errorMsg.set('');
        this.authService.authLogin(this.loginForm.getRawValue() as LoginRequest).subscribe({
            next: () => {},
            error: (err: Error) => this.errorMsg.set(err.message)
        });
    }
}