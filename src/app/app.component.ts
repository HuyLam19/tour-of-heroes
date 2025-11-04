import { Component, DoCheck } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: false
})
export class AppComponent implements DoCheck {
  protected title = 'Tour of heroes';

  public ngDoCheck(): void {
    console.log('Do check from AppComponent')
  }
}
