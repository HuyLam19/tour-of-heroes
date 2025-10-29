import { Injectable, signal } from '@angular/core';
import { OptionItem } from '../shared/models/option-item.model';
import { timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalDataStore {
  public readonly rankOptions = signal<OptionItem[]>([]);

  public constructor() {
    this.#getRanks();
  }

  #getRanks(): void {
    timer(1000).subscribe({
      next: () => {
        this.rankOptions.set([
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
        ]);
      },
    });
  }
}
