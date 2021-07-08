import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersOnlineIndexComponent } from './pages/users-online-index/users-online-index.component';

const routes: Routes = [
  { path: '', component: UsersOnlineIndexComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersOnlineRoutingModule { }
