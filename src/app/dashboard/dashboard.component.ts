import { Component, DoCheck, Inject, OnInit, signal, Signal } from '@angular/core';
import { HeroService } from '../services/hero.service';
import { Hero } from '../shared/models/hero.model';
import { OptionItem } from '../shared/models/option-item.model';
import { GlobalDataStore } from '../stores/global-data.store';
import { APP_LOGGER } from '../shared/constants/app-logger.constant';
import { LoggerTest } from '../shared/models/logger-test';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit, DoCheck {
  protected readonly rankOptions: Signal<OptionItem[]>;
  protected readonly isLoading = signal(false);
  protected readonly heroes = signal<Hero[]>([]);

  public constructor(
    private globalDataStore: GlobalDataStore,
    private service: HeroService,
    @Inject(APP_LOGGER) appLogger: LoggerTest
  ) {
    this.rankOptions = globalDataStore.rankOptions;
  }

  public ngDoCheck(): void {
    console.log('DoCheck from Dashboard')
  }

  public ngOnInit(): void {
    this.isLoading.set(true);
    this.service.getTop5Heroes().subscribe({
      next: (response) => {
        this.heroes.set(response);
        this.isLoading.set(false);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }
}
