import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VenueDetailsComponent } from './pages/venue-details/venue-details.component';
import { VenuesIndexComponent } from './pages/venues-index/venues-index.component';

const routes: Routes = [
  { path: '', component: VenuesIndexComponent },
  { path: 'detail/:id', component: VenueDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VenuesRoutingModule { }
