import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() text = '';
  @Input() color = 'primary';
  @Input() outline: boolean = false;
  @Input() type: string = 'button';
  @Input() w: string = '100';
  @Input() disabled:boolean|null = false;
  @Input() mat: string = '';
  @Output() onClick = new EventEmitter<any>();

  click() {
    this.onClick.emit();
    console.log('click')
  }

  getButtonClasses(): string {
    const baseClasses = 'px-4 py-2 rounded font-medium transition-colors duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2';
    const widthClass = this.getWidthClass();
    const colorClasses = this.getColorClasses();
    const disabledClasses = this.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90';

    return `${baseClasses} ${widthClass} ${colorClasses} ${disabledClasses}`;
  }

  getOutlineButtonClasses(): string {
    const baseClasses = 'px-4 py-2 rounded font-medium transition-colors duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 border-2';
    const widthClass = this.getWidthClass();
    const outlineColorClasses = this.getOutlineColorClasses();
    const disabledClasses = this.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-10';

    return `${baseClasses} ${widthClass} ${outlineColorClasses} ${disabledClasses}`;
  }

  private getWidthClass(): string {
    switch (this.w) {
      case '25': return 'w-1/4';
      case '50': return 'w-1/2';
      case '75': return 'w-3/4';
      case '100': return 'w-full';
      case 'auto': return 'w-auto';
      default: return 'w-full';
    }
  }

  private getColorClasses(): string {
    switch (this.color) {
      case 'primary':
        return 'bg-primary text-white focus:ring-primary hover:bg-amber-500';
      case 'secondary':
        return 'bg-secondary text-white focus:ring-secondary hover:bg-amber-600';
      case 'success':
        return 'bg-success text-white focus:ring-success hover:bg-green-700';
      case 'danger':
        return 'bg-danger text-white focus:ring-danger hover:bg-red-600';
      case 'warning':
        return 'bg-yellow-500 text-white focus:ring-yellow-400 hover:bg-yellow-600';
      case 'info':
        return 'bg-cyan-600 text-white focus:ring-cyan-500 hover:bg-cyan-700';
      case 'light':
        return 'bg-light text-gray-900 focus:ring-gray-300 hover:bg-gray-200';
      case 'dark':
        return 'bg-dark text-white focus:ring-gray-700 hover:bg-gray-800';
      default:
        return 'bg-primary text-white focus:ring-primary hover:bg-amber-500';
    }
  }

  private getOutlineColorClasses(): string {
    switch (this.color) {
      case 'primary':
        return 'border-primary text-primary focus:ring-primary hover:bg-primary hover:text-white';
      case 'secondary':
        return 'border-secondary text-secondary focus:ring-secondary hover:bg-secondary hover:text-white';
      case 'success':
        return 'border-success text-success focus:ring-success hover:bg-success hover:text-white';
      case 'danger':
        return 'border-danger text-danger focus:ring-danger hover:bg-danger hover:text-white';
      case 'warning':
        return 'border-yellow-500 text-yellow-500 focus:ring-yellow-400 hover:bg-yellow-500 hover:text-white';
      case 'info':
        return 'border-cyan-600 text-cyan-600 focus:ring-cyan-500 hover:bg-cyan-600 hover:text-white';
      case 'light':
        return 'border-light text-gray-700 focus:ring-gray-300 hover:bg-light';
      case 'dark':
        return 'border-dark text-dark focus:ring-gray-700 hover:bg-dark hover:text-white';
      default:
        return 'border-primary text-primary focus:ring-primary hover:bg-primary hover:text-white';
    }
  }
}
