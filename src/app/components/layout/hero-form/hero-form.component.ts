import { Component, computed, inject, input } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HeroService } from '../../../core/services/hero.service';
import { Router } from '@angular/router';
import { UppercaseDirective } from '../../../shared/directives/uppercase.directive';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-hero-form',
  imports: [FormsModule, ReactiveFormsModule, UppercaseDirective],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.scss',
})
export class HeroFormComponent {
  fb = inject(FormBuilder);
  heroService = inject(HeroService);
  router = inject(Router);
  notificationService = inject(NotificationService);

  heroId = input<string | null>(null);
  hero = computed(() => this.heroService.getHeroById(Number(this.heroId()) ?? 0));

  heroForm = this.fb.group({
    id: [null],
    name: ['', [Validators.required, Validators.minLength(2)]],
    power: [''],
    publisher: [''],
  });

  ngOnInit(): void {
    const hero = this.hero();
    if (hero) {
      this.heroForm.patchValue({
        name: hero.name,
        power: hero.power,
        publisher: hero.publisher,
      });
    }
  }

  onSubmit() {
    const hero = this.heroForm.value as any;
    if (this.heroId()) {
      this.heroService.updateHero(this.heroId()!, hero);
      this.notificationService.show(`Se actualizó el héroe ${hero.name}`, 'success')
    } else {
      this.heroService.addHero(hero);
      this.notificationService.show(`Se añadió el héroe ${hero.name}`, 'success')
    }

    this.router.navigate(['/']);
  }

  cancel() {
    this.router.navigate(['/']);
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.heroForm.get(controlName);
    if (!control || !control.touched) return null;

    if (control.hasError('required')) return 'Este campo es obligatorio';
    if (control.hasError('minlength')) return 'El texto es demasiado corto';

    return null;
  }
}
