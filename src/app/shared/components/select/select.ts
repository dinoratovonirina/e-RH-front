import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select',
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Select),
      multi: true
    }
  ],
  templateUrl: './select.html',
  styleUrl: './select.css',
})
export class Select implements ControlValueAccessor {
  @Input() label!: string;
  @Input() options: any[] = [];
  @Input() labelKey: string = 'name';
  @Input() valueKey: string = 'id';

  @Output() valueChange = new EventEmitter<any>();

  value: any;
  disabled = false;

  writeValue(value: any): void {
    this.value = value;
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onSelectChange(event: Event) {
    const value = Number((event.target as HTMLSelectElement).value);
    this.value = value;
    this.onChange(value);
    this.valueChange.emit(value);
  }
}
