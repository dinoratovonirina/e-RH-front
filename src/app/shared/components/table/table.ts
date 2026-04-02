import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Dropdown } from "../dropdown/dropdown";
import { TableAction, TableColumn } from '../../../core/types/tablesType';

@Component({
  selector: 'app-table',
  imports: [CommonModule, FormsModule, Dropdown],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table implements OnChanges {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() actions: TableAction[] = [];
  @Input() pageSize = 10;

  @Output() actionClick = new EventEmitter<{ action: TableAction; row: any }>();

  // Recherche
  searchTerm = '';

  // Tri
  sortKey = '';
  sortAsc = true;

  // Pagination
  currentPage = 1;

  get filteredData() {
    let result = [...this.data];

    // Recherche
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(row =>
        this.columns.some(col =>
          String(row[col.key] ?? '').toLowerCase().includes(term)
        )
      );
    }

    // Tri
    if (this.sortKey) {
      result.sort((a, b) => {
        const valA = a[this.sortKey] ?? '';
        const valB = b[this.sortKey] ?? '';
        return this.sortAsc
          ? String(valA).localeCompare(String(valB))
          : String(valB).localeCompare(String(valA));
      });
    }

    return result;
  }

  get paginatedData() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredData.slice(start, start + this.pageSize);
  }

  get totalPages() {
    return Math.ceil(this.filteredData.length / this.pageSize);
  }

  get pages() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  ngOnChanges() {
    this.currentPage = 1;
  }

  sort(key: string) {
    if (this.sortKey === key) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortKey = key;
      this.sortAsc = true;
    }
  }

  onSearch() {
    this.currentPage = 1;
  }

  handleAction(event: { action: TableAction, row: any }) {
    const { action, row } = event;
    this.actionClick.emit({ action, row });
  }
}
