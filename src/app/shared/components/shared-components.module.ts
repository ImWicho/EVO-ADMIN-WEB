import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@modules/material.module';

import { ToolbarComponent } from '@components/toolbar/toolbar.component';
import { SidenavComponent } from '@components/sidenav/sidenav.component';
import { LoadingComponent } from '@components/loading/loading.component';
import { ListFilesComponent } from '@components/files/list-files/list-files.component';
import { LoadFilesComponent } from '@components/files/load-files/load-files.component';
import { GetFilesComponent } from '@components/files/get-files/get-files.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { NotificationComponent } from './notification/notification.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    ToolbarComponent,
    SidenavComponent,
    LoadingComponent,
    ListFilesComponent,
    LoadFilesComponent,
    GetFilesComponent,
    HeaderComponent,
    NotificationComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    ToolbarComponent,
    SidenavComponent,
    LoadingComponent,
    ListFilesComponent,
    LoadFilesComponent,
    GetFilesComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class SharedComponentsModule { }
