import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FileServiceService } from '@services/file-service.service';
import { NotificationService } from '@services/notification.service';
import { AppState } from 'app/app.reducer';
import { removeSplashConf, storeStep1 } from 'app/store/actions/splash/splash-login.actions';

@Component({
  selector: 'app-splash-login-step1',
  templateUrl: './splash-login-step1.component.html',
  styleUrls: ['./splash-login-step1.component.scss']
})
export class SplashLoginStep1Component implements OnInit, OnDestroy {
  form!: FormGroup;
  files1: File[] = [];
  files2: File[] = [];
  splashConf!: any;
  imgbase641!: string | undefined;
  imgbase642!: string | undefined;
  constructor(private fb: FormBuilder,
              private store: Store<AppState>,
              private notiSvc: NotificationService,
              private router: Router,
              private fileService: FileServiceService) { this.buildForm(); }

  ngOnInit(): void {
  }

  ngOnDestroy(): void{
    console.log('Destroy');

    this.store.dispatch( removeSplashConf() );
  }

  buildForm(): void{
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      subname: ['', [Validators.required, Validators.maxLength(50)]],
      days: ['', [Validators.required]],
      defaultImage: [false, []]
    });
  }

  onSubmit(): void{
    this.store.dispatch( storeStep1(
      { data: {...this.form.value,
        bg : this.files1[0],
        logo : this.files2[0]} }
    ));
  }

  async onRemoveConf(): Promise<void>{
    const res = await this.notiSvc.showNotification(
      {
        icon: 'alert',
        title: '¿Estás seguro de cancelar la configuración?',
        text: 'Al cancelar, no se podra recuperar la información',
        hideCancel: false
      }
    );

    if(res){
      this.store.dispatch( removeSplashConf() );
      this.router.navigate(['/main/settings']);
    }
  }

  async setFiles1(event: any): Promise<void>{
    const files: File[] = event;
    this.files1 = files;

    if(this.files1.length <= 0){
      this.imgbase641 = undefined;
    }else{
      this.imgbase641 = await this.fileService.convertFileToBase64(this.files1[0]);
    }

  }

  async setFiles2(event: any): Promise<void>{
    const files: File[] = event;
    this.files2 = files;

    if(this.files2.length <= 0){
      this.imgbase642 = undefined;
    }else{
      this.imgbase642 = await this.fileService.convertFileToBase64(this.files2[0]);
    }
  }

}
