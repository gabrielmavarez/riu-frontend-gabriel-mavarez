import Swal from 'sweetalert2';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroListComponent } from './hero-list.component';
import { HeroService } from '../../../core/services/hero.service';
import { Router } from '@angular/router';
import { HEROES } from '../../../shared/data/heroes.data';
import { computed } from '@angular/core';
import { Hero } from '../../../shared/models/hero.model';

describe('HeroListComponent', () => {
  let component: HeroListComponent;
  let fixture: ComponentFixture<HeroListComponent>;

  let mockHeroService: Partial<HeroService> & {
    filteredHeroes: ReturnType<typeof computed<Hero[]>>;
  };
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockHeroService = {
      filteredHeroes: computed(() => HEROES),
      setFilter: jasmine.createSpy('setFilter'),
      deleteHero: jasmine.createSpy('deleteHero'),
    };

    (window as any).document.startViewTransition = (fn: () => void) => {
      fn();
      return {
        ready: Promise.resolve(),
        finished: Promise.resolve()
      };
    };

    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HeroListComponent],
      providers: [
        { provide: HeroService, useValue: mockHeroService },
        { provide: Router, useValue: mockRouter },
      ],
    });

    fixture = TestBed.createComponent(HeroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería actualizar el filtro y reiniciar el índice de página', () => {
    component.updateFilter('spider');
    expect(mockHeroService.setFilter).toHaveBeenCalledWith('spider');
    expect(component.pageIndex()).toBe(0);
  });

  it('debería navegar al formulario de edición', () => {
    component.navigateToEdit(2);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/edit', 2]);
  });

  it('debería navegar al formulario de creación', () => {
    component.navigateToAdd();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/add']);
  });

  it('debería eliminar el héroe si se confirma', async () => {
    spyOn(Swal, 'fire').and.returnValue(Promise.resolve({
      isConfirmed: true,
      isDenied: false,
      isDismissed: false,
      value: null
    }));

    await component.deleteHero(3);

    expect(mockHeroService.deleteHero!).toHaveBeenCalledWith(3);
  });

  it('no debería eliminar el héroe si se cancela', async () => {
    spyOn(Swal, 'fire').and.returnValue(Promise.resolve({
      isConfirmed: false,
      isDenied: false,
      isDismissed: true,
      value: null
    }));

    await component.deleteHero(1);
    
    expect(mockHeroService.deleteHero!).not.toHaveBeenCalled();
  });

  it('debería paginar correctamente', () => {
    component.pageSize = 2;
    component.pageIndex.set(1);
    const paginated = component.paginatedHeroes();
    expect(paginated.length).toBe(2);
    expect(paginated[0].id).toBe(HEROES[2].id);
  });
});