import { Directive, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appUppercase]',
  host: { '(input)': 'onInput($event)'}
})
export class UppercaseDirective {
  control = inject(NgControl);

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value.toUpperCase();
    this.control.control?.setValue(value)
  }
}
