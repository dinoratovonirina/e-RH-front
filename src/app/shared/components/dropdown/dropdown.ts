import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  imports: [],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.css',
})
export class Dropdown {

  openMenuId: number | null = null;

  isOpen = signal(false);

  toggle(event: MouseEvent) {
    event.stopPropagation();
    this.isOpen.set(!this.isOpen());
  }

  @HostListener('document:click')
  close() {
    this.isOpen.set(false);
  }
}
