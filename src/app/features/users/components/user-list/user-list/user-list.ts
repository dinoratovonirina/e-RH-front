import { Component, HostListener, inject, signal } from '@angular/core';
import { UserService } from '../../../services/user-service';
import { catchError, EMPTY } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Navbar } from "../../../../../shared/components/navbar/navbar/navbar";
import { User } from '../../../../../core/models/user';
import { Table } from '../../../../../shared/components/table/table';
import { TableAction, TableColumn } from '../../../../../core/types/tablesType';

@Component({
  selector: 'app-user-list',
  imports: [Navbar, Table],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList {
  private userService = inject(UserService);

  public errorMsg = signal<string>('');
  public users = signal<Partial<User>[]>([]);

  columns: TableColumn[] = [
    { key: 'id', label: 'ID' },
    { key: 'firstName', label: 'Nom' },
    { key: 'lastName', label: 'Prenom' },
    { key: 'email', label: 'Email' },
    { key: 'isActive', label: 'Statut' }
  ];

  actions: TableAction[] = [
    { label: 'Éditer', type: 'edit' },
    { label: 'Supprimer', type: 'delete' },
  ];

  onAction(event: { action: TableAction; row: any }) {
    if (event.action.type === 'edit') this.editUser(event.row);
    if (event.action.type === 'delete') this.deleteUser(event.row);
  }

  constructor() {
    this.lislUser();
  }

  editUser(user: User) {
    console.log('Modifier =>', user);
  }

  deleteUser(id: number) {
    console.log('Supprimer =>', id);
  }

  lislUser() {
    this.userService.getAllUser().pipe(
      catchError((error: Error) => {
        this.errorMsg.set(error.message);
        return EMPTY;
      }),
      takeUntilDestroyed()
    ).subscribe((res: Partial<User>[]) => {this.users.set(res)});
  }
}
