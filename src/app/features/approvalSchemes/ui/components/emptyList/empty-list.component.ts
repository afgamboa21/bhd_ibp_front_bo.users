import { Component } from '@angular/core';
import {IlustracionEmptyComponent} from '@/app/shared/components/images/ilustracio-empty/ilustracion-empty.component';
import {ButtonComponent} from '@/app/shared/components/forms/button.component';
@Component({
  selector: 'app-empty-list',
  templateUrl: './empty-list.component.html',
  imports: [IlustracionEmptyComponent,ButtonComponent],
})
export class EmptyListComponent {
  message: string = 'No items to display.';
}
