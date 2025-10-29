import { Component, OnInit, signal, Signal } from '@angular/core';
import { GlobalDataStore } from '../stores/global-data.store';
import { OptionItem } from '../shared/models/option-item.model';
import { Hero } from '../shared/models/hero.model';
import { HeroService } from '../services/hero.service';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  protected readonly rankOptions: Signal<OptionItem[]>;
  protected readonly isLoading = signal(false);
  protected readonly heroes = signal<Hero[]>([]);

  public constructor(private globalDataStore: GlobalDataStore, private service: HeroService) {
    this.rankOptions = globalDataStore.rankOptions;
  }

  public ngOnInit(): void {
    this.isLoading.set(true)
    this.service.getTop5Heroes().subscribe({
      next: response => {
        this.heroes.set(response)
        this.isLoading.set(false)
      },
      complete: () => {
        this.isLoading.set(false)
      }
    })
  }
}
