import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IconComponent } from '@/app/shared/components/icons/icon.component';
import { CommonModule } from '@angular/common';
import { IRole } from '@/app/features/roles/models/role/roles.model';

@Component({
  selector: 'app-table-custom',
  imports: [IconComponent, CommonModule],
  templateUrl: './table-custom.component.html',
})
export class TableCustomComponent {
  @Input() roles: Array<IRole> = [];
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 10;
  @Input() totalRoles: number = 0;

  @Output() viewDetails = new EventEmitter<number>();
  @Output() editRole = new EventEmitter<number>();
  @Output() deleteRole = new EventEmitter<number>();
  @Output() prevPage = new EventEmitter<void>();
  @Output() nextPage = new EventEmitter<void>();
  @Output() pageChange = new EventEmitter<Event>();

  get totalPagesArray(): number[] {
    const totalPages = Math.ceil(this.totalRoles / this.pageSize);
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  onViewDetails(roleId: number): void {
    this.viewDetails.emit(roleId);
  }

  onEditRole(roleId: number): void {
    this.editRole.emit(roleId);
  }

  onDeleteRole(roleId: number): void {
    this.deleteRole.emit(roleId);
  }

  onPageChange(event: Event): void {
    const selectedPage = +(event.target as HTMLSelectElement).value;
    console.log('selectedPage', selectedPage)
    /* this.pageChange.emit(selectedPage); */
  }
}
