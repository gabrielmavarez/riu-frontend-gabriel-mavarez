import { Component, inject } from '@angular/core';
import { NotificationService } from '../../../core/services/notification.service';
import { CommonModule } from '@angular/common';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-notification',
  imports: [CommonModule, ToastComponent],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent {
  ns = inject(NotificationService);
}
