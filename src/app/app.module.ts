import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { FormsModule } from '@angular/forms';
import { HeroDetailsComponent } from './heroes/hero-details/hero-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroCardComponent } from './shared/components/hero-card/hero-card.component';
import { RankNamePipe } from './shared/pipes/rank-name.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailsComponent,
    DashboardComponent,
    HeroCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RankNamePipe
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
