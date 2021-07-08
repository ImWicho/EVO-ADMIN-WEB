import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetClientIndexComponent } from './meet-client-index/meet-client-index.component';

const routes: Routes = [
  { path: '', component: MeetClientIndexComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetClientRoutingModule { }
