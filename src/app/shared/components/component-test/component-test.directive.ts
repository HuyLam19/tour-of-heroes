import { Directive, ElementRef, OnInit, TemplateRef } from "@angular/core";

@Directive({
  selector: '[appComponentTest]',
  standalone: true
})
export class ComponentTestDirective {
  public constructor(public templateRef: TemplateRef<unknown>) {}
}