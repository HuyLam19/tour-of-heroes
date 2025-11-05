import { Injectable } from '@angular/core';
import { interval } from 'rxjs';

@Injectable()
export class LogService {
  public count = 0;
  public readonly intervalLog$ = interval(1000);
  public constructor() {
    // this.intervalLog$.subscribe({
    //   next: () => {
    //     this.count++;
    //     console.log(`The count is ${this.count}`)
    //   }
    // })
  }
}
