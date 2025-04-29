import {
  AfterContentInit,
  Component,
  ContentChild,
  ElementRef,
  inject,
  input,
  OnDestroy,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  FormControlDirective,
  FormControlName,
  NgControl,
  NgModel,
} from '@angular/forms';
import {
  animate,
  AnimationTriggerMetadata,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Unsubscribe } from '../../../core/decorators/decorators/unsubscribe.decorator';

const ANIMATION_DURATION = '0.3s';
const EASE_IN_OUT = 'cubic-bezier(0.645, 0.045, 0.355, 1)';

export const helpMotion: AnimationTriggerMetadata = trigger('helpMotion', [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'translateY(-5px)',
    }),
    animate(
      `${ANIMATION_DURATION} ${EASE_IN_OUT}`,
      style({
        opacity: 1,
        transform: 'translateY(0)',
      }),
    ),
  ]),
  transition(':leave', [
    style({
      opacity: 1,
      transform: 'translateY(0)',
    }),
    animate(
      `${ANIMATION_DURATION} ${EASE_IN_OUT}`,
      style({
        opacity: 0,
        transform: 'translateY(-5px)',
      }),
    ),
  ]),
]);

@Component({
  selector: 'app-form-item',
  animations: [helpMotion],
  template: `
    <div class="relative mb-6">
      <ng-content></ng-content>

      @if (shouldShowError) {
        <div
          class="label-error flex flex-col mt-[0.25rem] absolute"
          @helpMotion>
          <span class="text-xs" role="alert">
            @if (hasError('required')) {
              {{ customRequiredMessage() || 'Este campo es obligatorio' }}
            } @else if (hasError('pattern')) {
              {{ customPatternMessage() || 'El formato es inválido' }}
            } @else if (hasError('minlength')) {
              {{
                customMinLengthMessage() ||
                  'El mínimo de caracteres es ' + minLength()
              }}
            } @else if (hasError('maxlength')) {
              {{
                customMaxLengthMessage() ||
                  'El máximo de caracteres es ' + maxLength()
              }}
            } @else if (hasError('min')) {
              {{ customMinMessage() || 'El valor mínimo es ' + min() }}
            } @else if (hasError('max')) {
              {{ customMaxMessage() || 'El valor máximo es ' + max() }}
            } @else if (hasError('email')) {
              {{
                customEmailMessage() || 'Ingresa un correo electrónico válido'
              }}
            }
          </span>
        </div>
      } @else {
        @if (!isItemFocus()) {
          <div class="flex flex-col mt-4 absolute" @helpMotion>
            <span class="text-xs" role="alert">
              <ng-content select="[customError]"></ng-content
            ></span>
          </div>
        }
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .label-error span {
        color: var(--text-copy-negative);
      }
    `,
  ],
})
export class FormItemComponent implements AfterContentInit, OnDestroy {
  private elRef = inject(ElementRef);

  customRequiredMessage = input();
  customPatternMessage = input();
  customMinLengthMessage = input();
  customMaxLengthMessage = input();
  customMinMessage = input();
  customMaxMessage = input();
  customEmailMessage = input();
  customDateMinTodayMessage = input();
  customDateRangeInvalidMessage = input();

  @ContentChild(NgControl, { static: false }) defaultValidateControl?:
    | FormControlName
    | FormControlDirective;

  validateControl: AbstractControl | NgModel | null = null;
  minLength = signal<number>(0);
  maxLength = signal<number>(0);
  min = signal<number>(0);
  max = signal<number>(0);
  isItemFocus = signal<boolean>(false);

  get shouldShowError() {
    return (
      ((this.validateControl?.dirty &&
        this.validateControl?.touched &&
        this.validateControl?.invalid) ||
        (this.validateControl?.pristine &&
          this.validateControl?.touched &&
          this.validateControl?.invalid)) &&
      !this.isItemFocus()
    );
  }

  hasError(error: string) {
    return this.validateControl?.hasError(error) || false;
  }

  ngAfterContentInit(): void {
    if (this.defaultValidateControl) {
      this.validateControl = this.defaultValidateControl.control;
      this.validateControlStatus();
      this.listenControlStatusChanges();
      this.listenEvents();
    }
  }

  ngOnDestroy() {
    this.elRef.nativeElement.removeEventListener(
      'focus',
      this.listenFocus.bind(this),
    );
    this.elRef.nativeElement.removeEventListener(
      'blur',
      this.listenBlur.bind(this),
    );
  }

  @Unsubscribe
  private listenControlStatusChanges() {
    return this.validateControl?.valueChanges?.subscribe(() => {
      this.validateControlStatus();
    });
  }

  private validateControlStatus() {
    if (this.validateControl?.errors?.['minlength']) {
      this.minLength.update(
        () => this.validateControl?.errors?.['minlength']?.requiredLength,
      );
    }

    if (this.validateControl?.errors?.['maxlength']) {
      this.maxLength.update(
        () => this.validateControl?.errors?.['maxlength']?.requiredLength,
      );
    }

    if (this.validateControl?.errors?.['min']) {
      this.min.update(() => this.validateControl?.errors?.['min']?.min);
    }

    if (this.validateControl?.errors?.['max']) {
      this.max.update(() => this.validateControl?.errors?.['max']?.max);
    }
  }

  private listenEvents() {
    this.elRef.nativeElement
      .querySelector('input')
      ?.addEventListener('focus', this.listenFocus.bind(this));
    this.elRef.nativeElement
      .querySelector('input')
      ?.addEventListener('blur', this.listenBlur.bind(this));
  }

  private listenFocus() {
    this.isItemFocus.update(() => true);
  }

  private listenBlur() {
    this.isItemFocus.update(() => false);
  }
}
