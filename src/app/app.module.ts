import {
  APP_INITIALIZER,
  NgModule,
  NgZone,
  provideZoneChangeDetection,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailsComponent } from './hero-details/hero-details.component';
import { HeroesComponent } from './heroes/heroes.component';
import { InMemoryDataService } from './services/in-memory-data.service';
import { HeroCardComponent } from './shared/components/hero-card/hero-card.component';
import { RankNamePipe } from './shared/pipes/rank-name.pipe';
import { ComponentTest } from './shared/components/component-test/component-test';
import { ComponentTestDirective } from './shared/components/component-test/component-test.directive';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from './shared/directives/highlight.directive';
import { IsSuperHeroDirective } from './shared/directives/is-super-hero.directive';
import { LogService } from './services/log.service';
import { GlobalDataStore } from './stores/global-data.store';
import { NormalPipe } from './shared/pipes/normal-pipe';
import { APP_LOGGER } from './shared/constants/app-logger.constant';
import { LoggerTest } from './shared/models/logger-test';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailsComponent,
    DashboardComponent,
    HeroCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    RankNamePipe,
    NormalPipe,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
    }),
    ComponentTest,
    ComponentTestDirective,
    HighlightDirective,
    IsSuperHeroDirective,
  ],
  providers: [
    LogService,
    {
      provide: APP_LOGGER,
      useClass: LoggerTest,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
