import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '@modules/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from '@services/notification.service';
import {SharedComponentsModule} from "@components/shared-components.module";


@NgModule({
  declarations: [LoginComponent],
    imports: [
        CommonModule,
        LoginRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
        SharedComponentsModule
    ],
  providers: [
    NotificationService
  ]
})
export class LoginModule { }
