import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  input,
  model,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-dinamy-toggle-or-check-box',
  imports: [],
  templateUrl: './dinamyToggleOrCheckBox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DinamyToggleOrCheckBoxComponent {
  type = input<'checkbox' | 'toggle'>('checkbox');
  label = input<string>('');
  disabled = input<boolean>(false);

  // Propiedad MUTABLE (two-way binding con el padre)
  checked = model<boolean>(false); // <--- Usa model() en lugar de input()

  // Evento opcional para one-way binding
  @Output() changed = new EventEmitter<boolean>();

  onChange(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.checked.set(isChecked); // <--- Método set() de model()
    this.changed.emit(isChecked);
  }
}
