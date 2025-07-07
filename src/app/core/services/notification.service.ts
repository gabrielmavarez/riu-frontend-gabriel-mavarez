import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private toastsSignal = signal<Toast[]>([]);
  toasts = this.toastsSignal.asReadonly();
  private idCounter = 0;

  show(message: string, type: Toast['type'] = 'info', duration = 3000) {
    const id = this.idCounter++;
    const toast: Toast = { id, message, type, duration };
    this.toastsSignal.update((prev) => [...prev, toast]);

    setTimeout(() => this.remove(id), duration);
  }

  remove(id: number) {
    this.toastsSignal.update((prev) => prev.filter(t => t.id !== id));
  }
}
