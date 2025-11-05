import {
  Directive,
  ElementRef,
  HostListener
} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appHighlight]',
})
export class HighlightDirective {
  public constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.#highlight('yellow');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.#highlight('');
  }

  #highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
