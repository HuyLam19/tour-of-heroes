import {
  Component,
  effect,
  input,
  output
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hero } from '../../hero.model';
import { OptionItem } from '../../option-item.model';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrl: './hero-details.component.css',
  standalone: false,
})
export class HeroDetailsComponent {
  protected innerHero: Hero = {} as Hero;

  public readonly rankOptions = input<OptionItem[]>([]);
  public readonly hero = input<Hero | undefined>(undefined);
  public readonly heroChange = output<Hero>();

  public constructor() {
    effect(() => {
      this.innerHero = this.hero() || ({} as Hero);
    });
  }

  protected trackRank(index: number, rankItem: OptionItem): string | number {
    return rankItem.value;
  }

  protected resetForm(heroForm: NgForm): void {
    heroForm.reset();
  }

  protected onSubmit(heroForm: NgForm): void {
    this.heroChange.emit({ ...this.innerHero });
    heroForm.reset();
  }
}
