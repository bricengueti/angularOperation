import { CommonModule } from '@angular/common';
import { Component, Input, booleanAttribute, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { BaseControlValueAccessorComponent } from '../../base-control-value-accessor.component';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent extends BaseControlValueAccessorComponent<string> {
  protected readonly Validators = Validators;

  @Input({required: true}) id: string = '';
  @Input({required: true}) label: string = '';
  @Input({transform: booleanAttribute}) required = false;
  @Input() placeholder = '';
  @Input() type: string = 'text';
  @Input() readonly: boolean = false;

  getLabelClasses(): string {
    const baseClasses = 'block text-sm font-medium';
    const requiredClasses = (this.required || this.control?.hasValidator(Validators.required))
      ? 'text-gray-900'
      : 'text-gray-700';

    return `${baseClasses} ${requiredClasses}`;
  }

  getInputClasses(): string {
    const baseClasses = 'block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors duration-200';

    // États de validation
    const hasError = this.control?.touched && this.control?.invalid;
    const isValid = this.control?.touched && this.control?.valid;

    let stateClasses = '';
    if (hasError) {
      stateClasses = 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500';
    } else if (isValid) {
      stateClasses = 'border-green-300 text-green-900 focus:ring-green-500 focus:border-green-500';
    } else {
      stateClasses = 'border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500';
    }

    // État readonly
    const readonlyClasses = this.readonly
      ? 'bg-gray-50 text-gray-500 cursor-not-allowed'
      : 'bg-white hover:border-gray-400';

    return `${baseClasses} ${stateClasses} ${readonlyClasses}`;
  }
}
