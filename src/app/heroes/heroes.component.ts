import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero.model';
import { HEROES } from '../heroes.constant';
import { BehaviorSubject, finalize, switchMap, tap } from 'rxjs';
import { OptionItem } from '../option-item.model';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css',
  standalone: false,
})
export class HeroesComponent implements OnInit {
  readonly #loadData$ = new BehaviorSubject<void>(undefined);
  
  protected heroes: Hero[] = [];
  protected selectedHero: Hero | undefined = undefined;
  protected isLoading: boolean = false;
  protected readonly options: OptionItem[] = [
    {
      label: 'Rookie',
      value: 1,
    },
    {
      label: 'Experienced',
      value: 2,
    },
    {
      label: 'Elite',
      value: 3,
    },
    {
      label: 'Legendary',
      value: 4,
    },
  ];

  public constructor(private service: HeroService) {}

  public ngOnInit(): void {
    this.#setupGetHeroes();
  }

  protected getHeroRank(value?: number): string {
    return this.options.find((it) => it.value === value)?.label || '???';
  }

  protected submit(hero: Hero): void {
    if (this.isLoading) return;
    this.isLoading = true;
    this.service.saveHero(hero).subscribe({
      next: () => {
        this.#loadData$.next();
      },
      error: () => {
        console.error('Failed to save Hero')
      }
    })
  }

  protected selectHero(hero: Hero | undefined): void {
    this.selectedHero = hero ? { ...hero } : undefined;
  }

  #setupGetHeroes(): void {
    this.#loadData$.pipe(
      tap(() => this.isLoading = true),
      switchMap(() => this.service.getHeroes().pipe(finalize(() => this.isLoading = false)))
    ).subscribe({
      next: (response) => {
        this.heroes = response
      },
      error: () => {
        console.error('Failed to get heroes')
      }
    })
  }
}
