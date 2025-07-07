import { TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { Hero } from '../../shared/models/hero.model';
import { effect } from '@angular/core';

describe('HeroService', () => {
  let service: HeroService;

  const initialHeroes: Hero[] = [
    { id: 1, name: 'Superman', power: 'Vuelo', publisher: 'DC' },
    { id: 2, name: 'Spiderman', power: 'Telarañas', publisher: 'Marvel' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroService);

    (service as any).heroes.set([...initialHeroes]);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all heroes', () => {
    expect(service.allHeroes()).toEqual(initialHeroes);
  });

  it('should return filtered heroes (match)', () => {
    service.setFilter('super');
    expect(service.filteredHeroes().length).toBe(1);
    expect(service.filteredHeroes()[0].name).toBe('Superman');
  });

  it('should return filtered heroes (no match)', () => {
    service.setFilter('batman');
    expect(service.filteredHeroes().length).toBe(0);
  });

  it('should get a hero by ID', () => {
    const hero = service.getHeroById(2);
    expect(hero?.name).toBe('Spiderman');
  });

  it('should return undefined for non-existent hero', () => {
    expect(service.getHeroById(99)).toBeUndefined();
  });

  it('should add a new hero with incremental ID', () => {
    const newHero: Hero = { id: 0, name: 'Ironman', power: 'Armadura', publisher: 'Marvel' };
    service.addHero(newHero);

    const added = service.allHeroes().find(h => h.name === 'Ironman');
    expect(added).toBeTruthy();
    expect(added?.id).toBe(3);
  });

  it('should update an existing hero', () => {
    const updatedHero: Hero = { id: 1, name: 'Superman Updated', power: 'Todo', publisher: 'DC' };
    const heroId = '1'
    service.updateHero(heroId, updatedHero);

    const hero = service.getHeroById(1);
    expect(hero?.name).toBe('Superman Updated');
    expect(hero?.power).toBe('Todo');
  });

  it('should not change heroes if updated hero does not exist', () => {
    const original = [...service.allHeroes()];
    const updated: Hero = { id: 99, name: 'Fake', power: 'Nada', publisher: 'Marvel' };
    const heroId = '99'

    service.updateHero(heroId, updated);

    expect(service.allHeroes()).toEqual(original);
  });

  it('should delete a hero by ID', () => {
    service.deleteHero(2);
    expect(service.getHeroById(2)).toBeUndefined();
    expect(service.allHeroes().length).toBe(1);
  });

  it('should do nothing if hero to delete does not exist', () => {
    const original = [...service.allHeroes()];
    service.deleteHero(99);
    expect(service.allHeroes()).toEqual(original);
  });
});
