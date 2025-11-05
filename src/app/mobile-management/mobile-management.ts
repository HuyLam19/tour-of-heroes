import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-mobile-management',
  standalone: true,
  imports: [],
  template: `<p>mobile-management works!</p>`,
  styleUrl: './mobile-management.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileManagement { }
