import { Component, computed, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-paginator',
  imports: [],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
})
export class PaginatorComponent {
  total = input.required<number>();
  pageSize = input.required<number>();
  pageIndex = signal(0);
  totalPages = computed(() => Math.ceil(this.total() / this.pageSize()));
  pageChange = output<number>();

  firstPage() {
    this.setPage(0);
  }

  lastPage() {
    this.setPage(this.totalPages() - 1);
  }

  setPage(index: number) {
    this.pageIndex.set(index);
    this.pageChange.emit(index);
  }

  getPageRange(): number[] {
    const current = this.pageIndex();
    const total = this.totalPages();
    const range: number[] = [];

    const start = Math.max(0, current - 1);
    const end = Math.min(total, current + 2);

    for (let i = start; i < end; i++) {
      range.push(i);
    }

    return range;
  }
}
