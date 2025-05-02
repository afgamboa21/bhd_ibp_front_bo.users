import { Component, input } from '@angular/core';
import { IconComponent } from '@/app/shared/components/icons/icon.component';
import { CommonModule } from '@angular/common';
import { Scheme } from '../../../models/schemes';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  imports: [IconComponent,CommonModule],
})
export class ApprovalSchemesListComponent {
  // Add your component logic here
  approvalSchemes: any[] = [];
  schemes = input.required<Scheme[]>();
  constructor() {

  }
}
