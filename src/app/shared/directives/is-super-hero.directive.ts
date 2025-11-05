import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[isSuperHero]',
})
export class IsSuperHeroDirective {
  readonly #minPower = 90;
  @Input() set isSuperHero(power: number) {
    const remainingPower = power - this.#minPower;
    this.viewContainerRef.createEmbeddedView(this.templateRef, {
      remainingPower,
      remainingPowerAbs: Math.abs(remainingPower),
    });
  }

  public constructor(
    private templateRef: TemplateRef<unknown>,
    private viewContainerRef: ViewContainerRef
  ) {}
}
