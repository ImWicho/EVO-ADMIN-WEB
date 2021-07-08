import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './pages/settings/settings.component';
import { SharedComponentsModule } from '@components/shared-components.module';
import { MaterialModule } from '@modules/material.module';
import { SpacesComponent } from './pages/spaces/spaces.component';
import { RouterModule } from '@angular/router';
import { AreasComponent } from './pages/areas/areas.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { SplashLoginComponent } from './pages/splash-login/splash-login.component';
import { SplashLoginConfComponent } from './pages/splash-login/splash-login-conf/splash-login-conf.component';
import { SplashLoginStep1Component } from './pages/splash-login/splash-login-conf/splash-login-step1/splash-login-step1.component';
import { SplashLoginStep2Component } from './pages/splash-login/splash-login-conf/splash-login-step2/splash-login-step2.component';
import { NotificationService } from '@services/notification.service';
import { ConfigDialogComponent } from './components/config-dialog/config-dialog.component';
import { ConfigDialogService } from './services/config-dialog.service';
import { SplashLoginStep3Component } from './pages/splash-login/splash-login-conf/splash-login-step3/splash-login-step3.component';
import { SplashLoginCardComponent } from './components/splash-login-card/splash-login-card.component';
import {NewAreaDialogComponent} from "./components/new-area-dialog/new-area-dialog.component";
import { AreasTableComponent } from './components/areas-table/areas-table.component';


@NgModule({
  declarations: [
    SettingsComponent,
    SpacesComponent,
    AreasComponent,
    SplashLoginComponent,
    SplashLoginConfComponent,
    SplashLoginStep1Component,
    SplashLoginStep2Component,
    ConfigDialogComponent,
    SplashLoginStep3Component,
    SplashLoginCardComponent,
    NewAreaDialogComponent,
    AreasTableComponent,
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedComponentsModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    NotificationService,
    ConfigDialogService
  ]
})
export class SettingsModule { }
