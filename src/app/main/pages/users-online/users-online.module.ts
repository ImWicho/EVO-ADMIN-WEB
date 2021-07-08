import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersOnlineIndexComponent } from './pages/users-online-index/users-online-index.component';
import { UsersOnlineTableComponent } from './components/users-online-table/users-online-table.component';
import { SharedComponentsModule } from '@components/shared-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@modules/material.module';
import { UsersOnlineRoutingModule } from './users-online-routing.module';
import { UsersOnlineTableToggleComponent } from './components/users-online-table-toggle/users-online-table-toggle.component';
import { UsersOnlineRowsContainerComponent } from './components/users-online-rows-container/users-online-rows-container.component';



@NgModule({
  declarations: [
    UsersOnlineIndexComponent,
    UsersOnlineTableComponent,
    UsersOnlineTableToggleComponent,
    UsersOnlineRowsContainerComponent
  ],
  imports: [
    CommonModule,
    UsersOnlineRoutingModule,
    SharedComponentsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class UsersOnlineModule { }
