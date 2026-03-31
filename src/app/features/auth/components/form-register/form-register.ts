import { Component, inject, OnInit, signal } from '@angular/core';
import { InputField } from "../../../../shared/components/input-field/input-field";
import { Button } from "../../../../shared/components/button/button";
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
    firstName: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^[A-Za-z]+$')]],
    lastName: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[A-Za-z ]+$')]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: passwordMatchValidator });

  get firstNameCtrl() {
    return this.formRegister.get('firstName') as FormControl;
  }

  get lastNameCtrl() {
    return this.formRegister.get('lastName') as FormControl;
  }

  get emailCtrl() {
    return this.formRegister.get('email') as FormControl;
  }

  get passwordCtrl() {
    return this.formRegister.get('password') as FormControl;
  }

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
