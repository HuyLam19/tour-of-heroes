import { Component } from '@angular/core';
import { Hero } from '../hero.model';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent {
  protected hero: Hero = {
    id: 1,
    name: 'Peter Parker',
    power: 1000,
    alterEgo: 'Spiderman',
    description: `Shorthand syntax is expanded through a set of conventions. A more thorough grammar is defined below, but in the above example, this transformation can be explained.`
  }
}
