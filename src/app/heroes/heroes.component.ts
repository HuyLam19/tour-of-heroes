import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  DoCheck,
  effect,
  Inject,
  OnInit,
  Signal,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
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
import { ComponentTest } from '../shared/components/component-test/component-test';
import { HeroCardComponent } from '../shared/components/hero-card/hero-card.component';
import { APP_LOGGER } from '../shared/constants/app-logger.constant';
import { LoggerTest } from '../shared/models/logger-test';

@Component({
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css',
})
export class HeroesComponent
  implements
    OnInit,
    AfterViewInit,
    AfterViewChecked,
    AfterContentInit,
    AfterContentChecked,
    DoCheck
{
  readonly #loadData$ = new BehaviorSubject<void>(undefined);
  readonly #searchTerm$ = new BehaviorSubject<string>('');
  readonly #tabMap = new Map<number, unknown>([
    [0, ComponentTest],
    [1, HeroCardComponent]
  ])

  public isManner = true;

  protected heroes: Hero[] = [];
  protected isLoading: boolean = false;
  protected readonly rankOptions: Signal<OptionItem[]>;
  protected readonly isShowTest = signal(false);
  protected isShowContent = false;
  protected testText = '';
  protected readonly tabIndex = signal(0);
  protected readonly currentTabComponent = computed(() => {
    switch (this.tabIndex()) {
      case 0:
        return {
          component: ComponentTest,
          inputs: { text: 'Dynamic Component Test', isChecked: true }
        }
      case 1:
        return {
          component: HeroCardComponent,
          inputs: { id: 123123, name: 'Dynamic Hero' }
        }
      default:
        return undefined
    }
  })
  protected count = 0;

  public constructor(
    private service: HeroService,
    private globalDataStore: GlobalDataStore,
    private router: Router,
    @Inject(APP_LOGGER) appLogger: LoggerTest,
    private destroyRef: DestroyRef
  ) {
    this.rankOptions = globalDataStore.rankOptions;
    // setInterval(() => {
    //   this.count++
    // }, 10000)
  }

  public ngAfterContentInit(): void {
    console.log('Parent content inited');
  }

  public ngAfterContentChecked(): void {
    console.log('Parent content checked');
  }

  public ngAfterViewInit(): void {
    console.log('Parent view inited');
  }

  public ngAfterViewChecked(): void {
    console.log('Parent view checked');
  }

  public ngOnInit(): void {
    console.log('Parent inits!');
    this.#setupGetHeroes();
  }

  public ngDoCheck(): void {
    console.log('Parent do check!');
  }

  protected toggleTestComponent(): void {
    this.isShowTest.update(value => !value)
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

  protected changeTab(tabIndex: number): void {
    if (this.tabIndex() === tabIndex) {
      return;
    };
    this.tabIndex.set(tabIndex)
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

  protected onSearchInput(event: Event): void {
    const text = (event.target as HTMLInputElement).value;
    this.#searchTerm$.next(text);
  }

  protected changeTestText(event: Event): void {
    const text = (event.target as HTMLInputElement).value;
    this.testText = text;
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
