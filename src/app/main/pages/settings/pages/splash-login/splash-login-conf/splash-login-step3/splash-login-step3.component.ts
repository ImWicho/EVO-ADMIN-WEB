import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FileServiceService } from '@services/file-service.service';
import { NotificationService } from '@services/notification.service';
import { AppState } from 'app/app.reducer';
import { ConfigService } from 'app/main/pages/settings/services/config.service';
import { InputForm } from 'app/store/reducers/splash/splash-login.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-splash-login-step3',
  templateUrl: './splash-login-step3.component.html',
  styleUrls: ['./splash-login-step3.component.scss']
})
export class SplashLoginStep3Component implements OnInit, OnDestroy {
  subscription!: Subscription;
  splash!: {  form: {
    step1: any;
    step2: any;
    step3: any;
    inputs: InputForm[];
  };};
  loading = false;
  constructor(private store: Store<AppState>,
              private service: ConfigService,
              private notiSvc: NotificationService,
              private router: Router,
              private fileService: FileServiceService) { }

  ngOnInit(): void {
    this.subscription = this.store.select('splashConf').subscribe((data) => {
      this.splash = data;
    } );

  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  async onSubmit(): Promise<void>{
    try{
      this.loading = true;
      const fields = [];
      if(this.splash.form.step2.nombre){
        fields.push(
          {
            field_name : 'Nombre',
            field_type : 'text',
            is_required: this.splash.form.step2.nombreRequired ? 1 : 0,
            is_footfall: 0,
            field_extras : {}
          }
        );
      }

      if(this.splash.form.step2.email){
        fields.push(
          {
            field_name : 'Correo',
            field_type : 'email',
            is_required: this.splash.form.step2.emailRequired ? 1 : 0,
            is_footfall: 0,
            field_extras : {}
          }
        );
      }

      this.splash.form.inputs.forEach((input) => {
        const newInput = {
          field_name : input.name,
          field_type : input.type,
          is_required: input.required ? 1 : 0,
          is_footfall : input.footfall ? 1 : 0,
          field_extras: {}
        };
        const extras: { [key: string]: any } = {};

        input.values?.forEach((val, idx) => {
          extras[idx] = val;
        });

        newInput.field_extras = extras;
        fields.push(newInput);
      });

      const data = {
        title: this.splash.form.step1.name,
        subtitle: this.splash.form.step1.subname,
        navigation_time : +this.splash.form.step1.days,
        infinite_time: this.splash.form.step1.days === '4' ? 1 : 0,
        predefined_image: this.splash.form.step1.defaultImage ? 1 : 0,
        auth_google: this.splash.form.step2.google ? 1 : 0,
        auth_facebook: this.splash.form.step2.facebook ? 1 : 0,
        nsat_usage_ssid : 'XXX-XXX-XXX',
        is_published: false,
        fields
      };

      console.log(data);


      const res  = await this.service.saveSplashLogin(data);

      if(res){

        if(this.splash.form.step1.bg){
          const background_image = await this.fileService.convertFileToBase64(this.splash.form.step1.bg);
          await this.service.saveImagetoSplash({ background_image }, res.id_splash);
        }
        if(this.splash.form.step1.logo){
          const logo_image = await this.fileService.convertFileToBase64(this.splash.form.step1.logo);
          await this.service.saveImagetoSplash({ logo_image }, res.id_splash);
        }

        await this.notiSvc.showNotification(
          {icon: 'check',
          title : 'El splash login se creó correctamente.',
          text : '',
          hideCancel: true}
        );

        this.router.navigate(['/main/settings/splash-login']);

      }
    }catch(error){
      await this.notiSvc.showNotification(
        {icon: 'close',
        title : 'Ha ocurrido un error.',
        text : 'Porfavor contacte a soporte técnico',
        hideCancel: true}
      );
    }
  }
}
