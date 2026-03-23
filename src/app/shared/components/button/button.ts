import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  @Input() disabled: boolean = true;
  @Input() text!: string;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
}
