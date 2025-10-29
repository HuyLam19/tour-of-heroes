import { Injectable } from '@angular/core';
import { map, Observable, tap, timer } from 'rxjs';
import { Hero } from '../shared/models/hero.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  readonly #heroesUrl = 'api/heroes';
  readonly #httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

  public constructor(private httpClient: HttpClient) {}

  public getHeroes(searchTerm?: string): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(`${this.#heroesUrl}?name=${searchTerm || ''}`).pipe(
      map((response) => {
        const result = [...response];
        result.sort((a, b) => b.power - a.power);
        return result;
      })
    );
  }

  public getTop5Heroes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(this.#heroesUrl).pipe(
      map((response) => {
        const result = [...response];
        result.sort((a, b) => b.power - a.power)
        return result.slice(0, 5);
      })
    );
  }

  public getHeroById(id: number): Observable<Hero | undefined> {
    return this.httpClient.get<Hero>(`${this.#heroesUrl}/${id}`);
  }

  public saveHero(hero: Hero): Observable<unknown> {
    const request$ = hero.id ? this.httpClient.put(this.#heroesUrl, hero, this.#httpOptions) : this.httpClient.post(this.#heroesUrl, hero, this.#httpOptions)
    return request$;
  }

  public deleteHero(id: number): Observable<unknown> {
    return this.httpClient.delete(`${this.#heroesUrl}/${id}`)
  }
}
