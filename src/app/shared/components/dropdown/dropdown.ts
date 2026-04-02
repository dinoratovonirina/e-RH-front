import { Component, EventEmitter, HostListener, Input, Output, signal } from '@angular/core';
import { TableAction } from '../../../core/types/tablesType';

@Component({
  selector: 'app-dropdown',
  imports: [],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.css',
})
export class Dropdown {
  @Input() actions: TableAction[] = [];
  @Output() actionSelected = new EventEmitter<{ action: TableAction, row: any }>();
  @Input() row: any;

  isOpen = false;

  toggle(event: MouseEvent) {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
  }

  onAction(action: TableAction) {
    this.actionSelected.emit({ action, row: this.row });
    this.isOpen = false;
  }

  @HostListener('document:click')
  close() {
    this.isOpen = false;
  }
}
