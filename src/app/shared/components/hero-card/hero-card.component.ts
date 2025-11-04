import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  ElementRef,
  input,
  output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.css',
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroCardComponent {
  public readonly id = input.required<number>();
  public readonly name = input('');
  public readonly description = input('');
  public readonly power = input<number>();
  public readonly alterEgo = input<string>('');
  public readonly rank = input<string>('');
  public readonly clickedEdit = output();

  protected readonly content = contentChild(TemplateRef<ElementRef>);
}
