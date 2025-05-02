import { Component, inject, OnInit, signal } from '@angular/core';
import { provideApprovalSchemes } from '@/app/features/approvalSchemes';
import { Scheme } from '../../models/schemes';
import { ApprovalSchemesUseCaseService } from '@/app/features/approvalSchemes/application/approvalSchemes-use-case.service';
import { CommonModule } from '@angular/common';
import { IconComponent } from '@/app/shared/components/icons/icon.component';
import { ButtonComponent } from '@/app/shared/components/forms/button.component';
import { ApprovalSchemesListComponent } from '../components/approvalSchemesList/list.component';
import { EmptyListComponent } from '../components/emptyList/empty-list.component';
@Component({
  imports: [
    CommonModule,
    IconComponent,
    ButtonComponent,
    ApprovalSchemesListComponent,
    EmptyListComponent,
  ],
  providers: [provideApprovalSchemes()],
  templateUrl: './approval-schemes.page.html',
})
export class ApprovalSchemesPage implements OnInit {
  private readonly authService = inject(ApprovalSchemesUseCaseService);

  schemes = signal<Scheme[] | []>([]);

  ngOnInit(): void {
    console.log('OnInit');
    this.authService.getSchemes().then((schemes) => {
      console.log(schemes);
      this.schemes.set(schemes);
    });
  }
}
