import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeetClientRoutingModule } from './meet-client-routing.module';
import { MeetClientIndexComponent } from './meet-client-index/meet-client-index.component';
import { SharedComponentsModule } from '@components/shared-components.module';
import { MaterialModule } from '@modules/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MeetClientIndexComponent
  ],
  imports: [
    CommonModule,
    MeetClientRoutingModule,
    SharedComponentsModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class MeetClientModule { }
