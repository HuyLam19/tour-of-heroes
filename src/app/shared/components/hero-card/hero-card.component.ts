import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  contentChild,
  effect,
  ElementRef,
  Inject,
  input,
  OnInit,
  Optional,
  output,
  Self,
  TemplateRef,
  ViewChild,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { HighlightDirective } from '../../directives/highlight.directive';
import { HeroService } from '../../../services/hero.service';
import { LogService } from '../../../services/log.service';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.css',
  providers: [LogService],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroCardComponent implements OnInit {
  public readonly id = input.required<number>();
  public readonly name = input('');
  public readonly description = input('');
  public readonly power = input<number>();
  public readonly alterEgo = input<string>('');
  public readonly rank = input<string>('');
  public readonly clickedEdit = output();

  protected count = 0;

  protected readonly content = contentChild(TemplateRef<ElementRef>);

  public constructor(private logService: LogService) {}

  public ngOnInit(): void {
    console.log('HeroCardComponent init');
    // setInterval(() => {
    //   this.count++;
    // }, 1000);
  }
}
