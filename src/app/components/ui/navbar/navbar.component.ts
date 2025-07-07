import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, output, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private router = inject(Router)
  private http = inject(HttpClient);
  private currentUrl = signal<string>('');

  sectionTitle = computed(() => {
    const url = this.currentUrl();
    if (url.includes('/add')) return 'Añadir Héroe';
    if (url.includes('/edit')) return 'Editar Héroe';
    return 'Lista de Héroes';
  });

  showAddButton = computed(() => this.currentUrl() === '/' || this.currentUrl() === '');

  addHeroEvent = output<void>();

  constructor() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentUrl.set(event.urlAfterRedirects);
      });

    this.currentUrl.set(this.router.url);
  }

  addHero() {
    this.router.navigate(['/add'])
  }

  simulateLoad() {
    this.http.get('https://jsonplaceholder.typicode.com/todos/1').subscribe({
      next: (response) => console.log('Simulated HTTP response:', response),
      error: (err) => console.error('Simulated HTTP error:', err),
    });
  }
}
