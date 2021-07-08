import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VenuesRoutingModule } from './venues-routing.module';
import { VenuesIndexComponent } from './pages/venues-index/venues-index.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@modules/material.module';
import { SharedComponentsModule } from '@components/shared-components.module';
import { VenueCardComponent } from './components/venue-card/venue-card.component';
import { VenueDetailsComponent } from './pages/venue-details/venue-details.component';
import { ChartCardComponent } from './components/chart-card/chart-card.component';
import { BaseChartComponent, NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxMaskModule } from 'ngx-mask';
import { AddSpacePipe } from '@pipes/add-space.pipe';


@NgModule({
  declarations: [
    VenuesIndexComponent,
    VenueCardComponent,
    VenueDetailsComponent,
    ChartCardComponent,
    AddSpacePipe
  ],
  imports: [
    CommonModule,
    VenuesRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedComponentsModule,
    NgxChartsModule,
    NgxMaskModule.forRoot()
  ]
})
export class VenuesModule { }
