import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailsComponent } from './hero-details/hero-details.component';
import { LogService } from './services/log.service';
import { MobileManagement } from './mobile-management/mobile-management';
import { GlobalDataStore2 } from './stores/global-data-custom.store';
import { GlobalDataStore } from './stores/global-data.store';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'heroes',
    component: HeroesComponent,
    providers: [LogService],
  },
  { path: 'heroes/details/:id', component: HeroDetailsComponent },
  { path: 'dashboard', component: DashboardComponent, providers: [LogService] },
  {
    path: 'mobile-management',
    loadComponent: () =>
      import('./mobile-management/mobile-management').then(
        (c) => c.MobileManagement
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
