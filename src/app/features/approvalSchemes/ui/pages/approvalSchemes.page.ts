import { Component, inject, OnInit } from '@angular/core';
import { provideApprovalSchemes } from '@/app/features/approvalSchemes';
import { signal } from '@angular/core';
import { Scheme } from '../../models/schemes';
import { ApprovalSchemesUseCaseService } from '@/app/features/approvalSchemes/application/approvalSchemes-use-case.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { IconComponent } from '@/app/shared/components/icons/icon.component';
@Component({
  imports: [CommonModule,ButtonModule,IconComponent],
  providers: [provideApprovalSchemes()],
  templateUrl: './approvalSchemes.page.html',
})
export class ApprovalSchemesPage implements OnInit {
  private authService = inject(ApprovalSchemesUseCaseService);

  schemes = signal<Scheme[] | []>([]);

  async ngOnInit() {
    console.log("OnInit");
    const schemes = await this.authService.getSchemes();
    console.log(schemes);
    this.schemes.set(schemes);
    // this.service.getSchemes().subscribe(data => {
    //   this.schemes.set(data);
    // });

    // // Opcional: efecto para debug o side effects
    // effect(() => {
    //   const count = this.schemes().length;
    //   console.log(`Loaded ${count} approval schemes`);
    // });
  }
}
