import {
  Component,
  effect,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hero } from '../shared/models/hero.model';
import { OptionItem } from '../shared/models/option-item.model';
import { HeroService } from '../services/hero.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalDataStore } from '../stores/global-data.store';

@Component({
  templateUrl: './hero-details.component.html',
  styleUrl: './hero-details.component.css',
})
export class HeroDetailsComponent implements OnInit {
  protected innerHero: Hero = {} as Hero;

  protected readonly rankOptions = signal<OptionItem[]>([]);
  protected readonly isLoading = signal<boolean>(false);

  public constructor(
    private globalDataStore: GlobalDataStore,
    private service: HeroService,
    private location: Location,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) {
    this.rankOptions = globalDataStore.rankOptions;
  }

  public ngOnInit(): void {
    const id = this.activatedRouter.snapshot.paramMap.get('id');

    if (id) {
      this.service.getHeroById(+id).subscribe({
        next: (hero) => {
          if (hero) {
            this.innerHero = { ...hero };
          }
        },
        error: () => {
          console.error('Failed to get hero details');
        },
      });
    }
  }

  protected trackRank(index: number, rankItem: OptionItem): string | number {
    return rankItem.value;
  }

  protected onSubmit(): void {
    this.isLoading.set(true);
    this.service.saveHero({ ...this.innerHero }).subscribe({
      next: () => {
        console.log('Saved the hero successfully');
        this.router.navigateByUrl('/heroes');
      },
      error: () => {
        console.error('Failed to save hero');
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }

  protected goBack(): void {
    this.location.back();
  }
}
