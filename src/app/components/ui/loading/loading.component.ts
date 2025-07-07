import { Component, inject } from '@angular/core';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'app-loading',
  imports: [],
  template: `
    @if(loading()) {
    <div class="loading-overlay">
      <div class="spinner"></div>
    </div>
    }
  `,
  styleUrl: './loading.component.scss',
})
export class LoadingComponent {
  loadingService = inject(LoadingService);
  loading = this.loadingService.loading;
}
