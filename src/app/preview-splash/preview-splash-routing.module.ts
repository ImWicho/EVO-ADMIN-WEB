import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreviewSplashComponent } from './pages/preview-splash/preview-splash.component';

const routes: Routes = [
  { path: 'preview/:id', component: PreviewSplashComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreviewSplashRoutingModule { }
