import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { Store } from '@ngrx/store';
import { NotificationService } from '@services/notification.service';
import { AppState } from 'app/app.reducer';
import { ConfigDialogService } from 'app/main/pages/settings/services/config-dialog.service';
import * as actions from 'app/store/actions/splash/splash-login.actions';
import { InputForm } from 'app/store/reducers/splash/splash-login.reducer';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-splash-login-step2',
  templateUrl: './splash-login-step2.component.html',
  styleUrls: ['./splash-login-step2.component.scss']
})
export class SplashLoginStep2Component implements OnInit, OnDestroy {
  @ViewChild('gender') gender!: MatSlideToggle;
  @ViewChild('birthday') birthday!: MatSlideToggle;
  form!: FormGroup;
  inputs: InputForm[] = [];
  subscription!: Subscription;
  fbFlag = false;
  googleFlag = false;
  canAddInput = true;
  canAddInputSelect = true;
  constructor(private store: Store<AppState>,
              private fb: FormBuilder,
              private dialogService: ConfigDialogService,
              private notiSvc: NotificationService) { this.buildForm(); }

  ngOnInit(): void {
    this.subscription = this.store.select('splashConf').subscribe((data) => {
      this.canAddInput = data.form.inputs.length < 6 ? true : false;
      this.canAddInputSelect = data.form.inputs.filter((x) => x.footfall === true).length < 5 ? true : false;
      this.inputs = data.form.inputs.filter((x) => x.name !== 'Género' && x.name !== 'Fecha Nacimiento');
    });
    this.startListeners();
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  startListeners(): void{
    this.form.get('facebook')?.valueChanges.subscribe((val) => {
      this.fbFlag = val;
      this.toggleInputs();
    });

    this.form.get('google')?.valueChanges.subscribe((val) => {
      this.googleFlag = val;
      this.toggleInputs();
    });
  }

  toggleInputs(): void{
    if(this.fbFlag || this.googleFlag){
      this.form.get('nombre')?.setValue(true);
      this.form.get('nombreRequired')?.setValue(true);

      this.form.get('email')?.setValue(true);
      this.form.get('emailRequired')?.setValue(true);
    }else{
      this.form.get('nombre')?.setValue(false);
      this.form.get('nombreRequired')?.setValue(false);

      this.form.get('email')?.setValue(false);
      this.form.get('emailRequired')?.setValue(false);
    }
  }

  buildForm(): void{
    this.form = this.fb.group({
      facebook: [false, []],
      google: [false, []],
      nombre: [false, []],
      nombreRequired: [false, []],
      email: [false, []],
      emailRequired: [false, []],
    });
  }

  async addGender(val: boolean): Promise<void>{
    if(val){
      if(!this.canAddInputSelect){
        await this.noMore();
        this.gender.checked = false;
        return;
      }
      const data = {
        type: 'select',
        name: 'Género',
        enabled: true,
        required: false,
        footfall: true,
        values : [
          'Masculino',
          'Femenino'
        ],
        id: new Date().getTime()
      };
      this.store.dispatch( actions.addInput({ input: data }) );
    }else{
      this.store.dispatch( actions.deleteInputByName({ name: 'Género' }) );
    }
  }

  async addBirthday(val: boolean): Promise<void>{
    if(val){
      if(!this.canAddInputSelect){
        await this.noMore();
        this.birthday.checked = false;
        return;
      }
      const data = {
        type: 'date',
        name: 'Fecha Nacimiento',
        enabled: true,
        required: false,
        footfall: true,
        values : [],
        id: new Date().getTime()
      };
      this.store.dispatch( actions.addInput({ input: data }) );
    }else{
      this.store.dispatch( actions.deleteInputByName({ name: 'Fecha Nacimiento' }) );
    }
  }

  toggleRequiredInputByName(name: string): void{
    this.store.dispatch( actions.toggleRequiredInputByName({ name }) );
  }

  onSubmit(): void{
    this.store.dispatch( actions.storeStep2({data : this.form.value}) );
  }

  async deleteInput(idx: number): Promise<void>{
    const res = await this.notiSvc.showNotification({
      icon: 'alert',
      title: '¿Estás seguro de borrar el campo?',
      text: 'Al borrarlo, no podrás recuperar la información.',
      hideCancel: false
    });

    if(res){
      this.store.dispatch( actions.deleteInput({ id: idx }) );
    }
  }

  toggleRequired(idx: number): void{
    this.store.dispatch( actions.toggleRequiredInput({ id: idx }) );
  }

  toggleEnable(idx: number): void{
    this.store.dispatch( actions.toggleEnableInput({ id: idx }) );
  }

  async openDialog(): Promise<void>{
    await this.dialogService.openInputDialog();
  }

  noMore(): Promise<boolean>{
    return this.notiSvc.showNotification(
      {
        icon:'alert',
        title: 'Alcanzaste el número máximo de campos de selección.',
        text: '',
        hideCancel: true
      });
  }

}
