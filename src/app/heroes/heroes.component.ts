import { Component, DestroyRef, OnInit, Signal, signal } from '@angular/core';
import { Hero } from '../shared/models/hero.model';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  debounceTime,
  EMPTY,
  filter,
  finalize,
  map,
  startWith,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OptionItem } from '../shared/models/option-item.model';
import { HeroService } from '../services/hero.service';
import { GlobalDataStore } from '../stores/global-data.store';
import { Router } from '@angular/router';

@Component({
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css',
})
export class HeroesComponent implements OnInit {
  readonly #loadData$ = new BehaviorSubject<void>(undefined);
  readonly #searchTerm$ = new BehaviorSubject<string>('');

  protected heroes: Hero[] = [];
  protected isLoading: boolean = false;
  protected readonly rankOptions: Signal<OptionItem[]>;

  public constructor(
    private service: HeroService,
    private globalDataStore: GlobalDataStore,
    private router: Router,
    private destroyRef: DestroyRef
  ) {
    this.rankOptions = globalDataStore.rankOptions;
  }

  public ngOnInit(): void {
    this.#setupGetHeroes();
  }

  protected submit(hero: Hero): void {
    if (this.isLoading) return;
    this.isLoading = true;
    this.service.saveHero(hero).subscribe({
      next: () => {
        this.#loadData$.next();
      },
      error: () => {
        console.error('Failed to save Hero');
      },
    });
  }

  protected goToDetails(hero?: Hero): void {
    this.router.navigateByUrl(`/heroes/details/${hero?.id || ''}`);
  }

  protected deleteHero(hero: Hero): void {
    this.isLoading = true;
    this.service.deleteHero(hero.id).subscribe({
      next: () => {
        console.log(`Deleted hero ${hero.name} successfully`);
        this.#loadData$.next();
      },
      error: () => {
        console.error('Failed to delete hero');
      },
    });
  }

  protected onSearchInput(input: string): void {
    this.#searchTerm$.next(input);
  }

  #setupGetHeroes(): void {
    const search$ = this.#searchTerm$.pipe(
      debounceTime(300),
      startWith(this.#searchTerm$.value)
    );
    combineLatest([this.#loadData$, search$])
      .pipe(
        tap(() => (this.isLoading = true)),
        switchMap(([_, searchTerm]) =>
          this.service.getHeroes(searchTerm).pipe(
            catchError(() => EMPTY),
            finalize(() => (this.isLoading = false))
          )
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (response) => {
          this.heroes = response;
        },
        error: () => {
          console.error('Failed to get heroes');
        },
      });
  }
}
