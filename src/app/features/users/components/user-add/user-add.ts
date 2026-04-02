import { Component, signal } from '@angular/core';
import { Navbar } from "../../../../shared/components/navbar/navbar/navbar";
import { Button } from "../../../../shared/components/button/button";
import { InputField } from "../../../../shared/components/input-field/input-field";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-user-add',
  imports: [Navbar, Button, InputField, FormsModule, ReactiveFormsModule],
  templateUrl: './user-add.html',
  styleUrl: './user-add.css',
})
export class UserAdd {

  public formAddUser!: FormGroup;

  public errorMsg = signal<string>("");

  addUserSubmit() {

  }
}
