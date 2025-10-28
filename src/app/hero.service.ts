import { Injectable } from '@angular/core';
import { map, Observable, tap, timer } from 'rxjs';
import { Hero } from './hero.model';
import { HEROES } from './heroes.constant';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  readonly #mockData = HEROES;

  public constructor() {}

  public getHeroes(): Observable<Hero[]> {
    return timer(1000 * Math.random()).pipe(map(() => this.#mockData));
  }

  public getTop5Heroes(): Observable<Hero[]> {
    return timer(1000 * Math.random()).pipe(map(() => {
      const result = [...this.#mockData].sort((a, b) => a.power - b.power);
      return result.slice(0, 5);
    }));
  }

  public saveHero(hero: Hero): Observable<unknown> {
    return timer(1000 * Math.random()).pipe(
      tap(() => {
        if (hero.id) {
          let heroIndex = this.#mockData.findIndex((it) => it.id === hero?.id);
          this.#mockData[heroIndex] = {
            ...hero,
          };
        } else {
          this.#mockData.unshift({
            ...hero,
            id: this.#mockData.length + 1,
          });
        }
      })
    );
  }
}
