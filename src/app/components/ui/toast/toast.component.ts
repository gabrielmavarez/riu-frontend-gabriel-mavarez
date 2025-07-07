import { Component, input, output } from '@angular/core';
import { Toast } from '../../../core/services/notification.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  imports: [NgClass]
})
export class ToastComponent {
  toast = input.required<Toast>() ;
  close = output<void>();
}
