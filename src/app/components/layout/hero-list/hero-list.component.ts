import Swal from 'sweetalert2';

import {
  ChangeDetectorRef,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { HeroService } from '../../../core/services/hero.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableComponent } from '../../ui/table/table.component';
import { PaginatorComponent } from '../../ui/paginator/paginator.component';

@Component({
  selector: 'app-hero-list',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TableComponent,
    PaginatorComponent,
  ],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss',
})
export class HeroListComponent {
  heroService = inject(HeroService);
  router = inject(Router);
  cdr = inject(ChangeDetectorRef);
  pageSize = 5;
  pageIndex = signal(0);
  filter = signal('');
  filteredHeroes = this.heroService.filteredHeroes;
  paginatedHeroes = computed(() => {
    const start = this.pageIndex() * this.pageSize;
    return this.filteredHeroes().slice(start, start + this.pageSize);
  });

  updateFilter(term: string) {
    this.filter.set(term);
    this.heroService.setFilter(term);
    this.pageIndex.set(0);
  }

  navigateToEdit(id: number) {
    this.router.navigate(['/edit', id]);
  }

  navigateToAdd() {
    this.router.navigate(['/add']);
  }

  async deleteHero(id: number) {
    const result = await Swal.fire({
      title: '¿Seguro que quieres eliminar este héroe?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      if (typeof (document as any).startViewTransition === 'function') {
        document.startViewTransition(() => {
          this.heroService.deleteHero(id);
          this.cdr.detectChanges();
        });
      } else {
        this.heroService.deleteHero(id);
        this.cdr.detectChanges();
      }
    }
  }
}