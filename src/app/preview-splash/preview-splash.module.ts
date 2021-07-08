import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreviewSplashRoutingModule } from './preview-splash-routing.module';
import { PreviewSplashComponent } from './pages/preview-splash/preview-splash.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@modules/material.module';
import { SharedComponentsModule } from '@components/shared-components.module';
import { NotificationService } from '@services/notification.service';
import { RemoveSpacePipe } from '@pipes/remove-space.pipe';

import { SocialLoginModule, SocialAuthServiceConfig, SocialAuthService } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { environment } from 'environments/environment';

@NgModule({
  declarations: [
    PreviewSplashComponent,
    RemoveSpacePipe
  ],
  imports: [
    CommonModule,
    PreviewSplashRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedComponentsModule,
    SocialLoginModule
  ],
  providers: [
    NotificationService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue : {
        autoLogin : false,
        providers : [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.GOOGLE_APP
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(environment.FB_APP)
          }
        ]
      } as SocialAuthServiceConfig
    }
  ]
})
export class PreviewSplashModule { }
