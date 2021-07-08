import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreasComponent } from './pages/areas/areas.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { SpacesComponent } from './pages/spaces/spaces.component';
import { SplashLoginConfComponent } from './pages/splash-login/splash-login-conf/splash-login-conf.component';
import { SplashLoginComponent } from './pages/splash-login/splash-login.component';

const routes: Routes = [
  { path: '', component: SettingsComponent},
  { path: 'spaces', component: SpacesComponent },
  { path: 'areas', component: AreasComponent },
  { path: 'splash-login', component: SplashLoginComponent },
  { path: 'splash-login-conf', component: SplashLoginConfComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
