import { Component, inject, OnInit, signal } from '@angular/core';
import { InputField } from "../../../../shared/components/input-field/input-field";
import { Button } from "../../../../shared/components/button/button";
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register/register-service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { User } from '../../../../core/models/user';
import { RegisterRequest } from '../../../../core/models/auth';
import { passwordMatchValidator } from '../../../../core/validators/password-match.validator';
@Component({
  selector: 'app-form-register',
  imports: [ReactiveFormsModule, FormsModule, InputField, Button, ToastrModule],
  templateUrl: './form-register.html',
  styleUrl: './form-register.css',
})
export class FormRegister {
  private fb = inject(FormBuilder);
  private registerService = inject(RegisterService);
  private toastr = inject(ToastrService);
  public errorMsg = signal<string>('');

  formRegister = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: passwordMatchValidator });


  registerSubmit() {
    if (this.formRegister.valid) {
      const { confirmPassword, ...data } = this.formRegister.value;
      this.registerService.register(data as RegisterRequest).subscribe({
        next: (user: User) => {
          this.formRegister.reset();
          this.toastr.success(`Inscription de ${user.email} avec succès`, 'Inscription')
        },
        error: (err: Error) => {
          this.errorMsg.set(err.message);
        }
      })
    }
  }
}
