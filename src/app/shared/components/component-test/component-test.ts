import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  contentChild,
  input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComponentTestDirective } from './component-test.directive';
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-component-test',
  standalone: true,
  imports: [FormsModule, ComponentTestDirective, CommonModule],
  template: `
    <input
      type="text"
      placeholder="Change inner text"
      ngModel
      (ngModelChange)="changeInnerText($event)"
    />
    <button>Test</button>
    <div>Input Text: {{ text() }}</div>
    <div>Inner Text: {{ innerText }}</div>
    <div>Is checked?: {{ isChecked() }}</div>
    <ng-content></ng-content>
    @if (content()) {
      <ng-container [ngTemplateOutlet]="content()!.templateRef"></ng-container>
    } @else {
      No template with directive appComponentTest
    }

  `,
  styles: `
    input {
      color: blue;
    }
  `,
  styleUrl: './component-test.css',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ComponentTest
  implements
    OnInit,
    OnDestroy,
    OnChanges,
    AfterContentInit,
    AfterViewInit,
    AfterContentChecked,
    AfterViewChecked
{
  public readonly text = input('');
  public readonly placeholder = input();
  public readonly isChecked = input(false, {
    transform: (value: unknown) => Boolean(value),
  });
  public count = 0;

  protected readonly content = contentChild(ComponentTestDirective);

  protected innerText = '';

  public constructor() {
    console.log('Child constructor run.');
  }

  public ngOnChanges(changes: SimpleChanges): void {
    console.log('Changes in Child', changes);
  }

  public ngDoCheck(): void {
    console.log('Child do check!');
  }

  public ngOnInit(): void {
    console.log('Child inited');
  }

  public ngAfterContentInit(): void {
    console.log('Child content inited');
  }

  public ngAfterViewInit(): void {
    console.log('Child view inited');
  }

  public ngAfterContentChecked(): void {
    console.log('Child content checked');
  }

  public ngAfterViewChecked(): void {
    console.log('Child view checked');
  }

  public ngOnDestroy(): void {
    console.log('Child destroyed.');
  }

  public changeInnerText(input: string): void {
    this.innerText = input;
  }
}
