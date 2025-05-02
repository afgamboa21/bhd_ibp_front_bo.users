import { NgStyle } from '@angular/common';
import { Component, input } from '@angular/core';
import { TablerIconComponent, provideTablerIcons } from 'angular-tabler-icons';

import {
  IconEye,
  IconEyeOff,
  IconUser,
  IconLock,
  IconPlus,
  IconMinus,
  IconTrash,
  IconWritingSign,
  IconChevronRight,
  IconChevronLeft,
  IconShieldPlus,
  IconDeviceDesktop,
  IconChevronDown,
  IconEdit,
} from 'angular-tabler-icons/icons';

const icons = {
  IconEye,
  IconEyeOff,
  IconUser,
  IconLock,
  IconPlus,
  IconMinus,
  IconTrash,
  IconWritingSign,
  IconChevronRight,
  IconChevronLeft,
  IconShieldPlus,
  IconDeviceDesktop,
  IconChevronDown,
  IconEdit,
};

type RemoveIconPrefix<S extends string> = S extends `Icon${infer Rest}`
  ? Rest
  : S;

type PascalCaseToKebabCase<
  S extends string,
  IsRest extends boolean = false,
> = S extends `${infer P1}${infer P2}`
  ? P1 extends Uppercase<P1>
    ? `${IsRest extends true ? '-' : ''}${Lowercase<P1>}${PascalCaseToKebabCase<P2, true>}`
    : `${P1}${PascalCaseToKebabCase<P2, true>}`
  : Lowercase<S>;

type KebabCaseIconTypes = {
  [K in keyof typeof icons as PascalCaseToKebabCase<
    RemoveIconPrefix<K>
  >]: (typeof icons)[K];
};

export type IconType = keyof KebabCaseIconTypes;

@Component({
  selector: 'app-icon',
  imports: [NgStyle, TablerIconComponent],
  providers: [provideTablerIcons(icons)],
  template: ` <i-tabler
    [ngStyle]="{
      strokeWidth: strokeWidth(),
      width: size() + 'px',
      height: size() + 'px',
    }"
    [name]="name()"></i-tabler>`,
  styles: `
    :host {
      display: inline-flex;
    }
  `,
})
export class IconComponent {
  name = input.required<IconType>();
  size = input<string>('24');
  strokeWidth = input<number>(1.5);
}
