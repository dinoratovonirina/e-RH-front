import { Component, inject, OnInit } from '@angular/core';
import { InputField } from "../../../../shared/components/input-field/input-field";
import { Select } from "../../../../shared/components/select/select";
import { Role } from '../../../../core/models/role';
import { Departement } from '../../../../core/models/departement';
import { Button } from "../../../../shared/components/button/button";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register/register-service';

@Component({
  selector: 'app-form-register',
  imports: [ReactiveFormsModule, FormsModule, InputField, Select, Button],
  templateUrl: './form-register.html',
  styleUrl: './form-register.css',
})
export class FormRegister implements OnInit {
  public formRegister!: FormGroup;
  private registerService = inject(RegisterService);

  public roles: Role[] = [
    { id: 1, roleName: "Administrateur" },
    { id: 2, roleName: "RH" },
    { id: 3, roleName: "Employé" }
  ];

  public departements: Departement[] = [
    { id: 1, departementName: "Informatique" },
    { id: 2, departementName: "Comptabilité" },
    { id: 3, departementName: "Marketing" }
  ];

  ngOnInit(): void {
    this.formRegister = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      roleId: new FormControl<number | null>(null, [Validators.required]),
      departementId: new FormControl<number | null>(null, [Validators.required])
    });
  }

  registerSubmit() {
    if (this.formRegister.valid) {
      this.registerService.register(this.formRegister).subscribe({
        next: ()=> {},
        error: (err)=> console.error('Erreur register', err)
      })
    }
  }
}
