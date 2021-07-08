import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import {HomeComponent} from './pages/home/home.component';
import { AuthGuard } from '@guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      { path: '', component: HomeComponent, canActivate : [AuthGuard] },
      { path: 'settings',
        loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsModule), canActivate : [AuthGuard] },
      { path: 'venues', loadChildren: () => import('./pages/venues/venues.module').then(m => m.VenuesModule), canActivate : [AuthGuard] },
      { path: 'users-online',
      loadChildren: () => import('./pages/users-online/users-online.module').then(m => m.UsersOnlineModule), canActivate : [AuthGuard] },
      { path: 'meet-client',
        loadChildren: () => import('./pages/meet-client/meet-client.module').then(m => m.MeetClientModule), canActivate : [AuthGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
