import { Component, inject, OnInit } from '@angular/core';
import { InputField } from '../../../../shared/components/input-field/input-field';
import { Button } from '../../../../shared/components/button/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth-service';

@Component({
  selector: 'app-form-login',
  imports: [ReactiveFormsModule, FormsModule, InputField, Button],
  templateUrl: './form-login.html',
  styleUrl: './form-login.css',
})
export class FormLogin implements OnInit {
  loginForm!: FormGroup;
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  handleSubmit() {
    if (this.loginForm.valid) {
      this.authService.authLogin(this.loginForm.value).subscribe({
        next: () => { },
        error: (err) => console.error('Erreur login', err)
      });
    }
  }
}
