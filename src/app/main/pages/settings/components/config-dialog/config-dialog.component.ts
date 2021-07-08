import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { NotificationService } from '@services/notification.service';
import { AppState } from 'app/app.reducer';
import { addInput } from 'app/store/actions/splash/splash-login.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-config-dialog',
  templateUrl: './config-dialog.component.html',
  styleUrls: ['./config-dialog.component.scss']
})
export class ConfigDialogComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  types = [
    {name: 'Texto', value: 'text'},
    {name: 'Fecha', value: 'date'},
    {name: 'Número', value: 'number'},
    {name: 'Selección', value: 'select'}
  ];
  valuesIndex: any[] = [];
  values: any[] = [];
  isSelect = false;
  subscription!: Subscription;
  canAddInput = true;
  constructor(private fb: FormBuilder,
              private store: Store<AppState>,
              private dialog: MatDialogRef<ConfigDialogComponent>,
              private notiSvc: NotificationService) { this.buildForm(); }

  ngOnInit(): void {
    this.subscription = this.store.select('splashConf').subscribe((data) => {
      this.canAddInput = data.form.inputs.filter((x) => x.footfall === true).length < 5 ? true : false;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  buildForm(): void{
    this.form = this.fb.group({
      type: ['', [Validators.required]],
      name: ['', [Validators.required]],
      enabled: [true],
      required: [false],
      footfall: [false],
      values: [[]]
    });
  }

  async saveInput(): Promise<void>{
    const data = {
      ...this.form.value,
      footfall : this.form.get('type')?.value === 'select' ? true : false,
      id: new Date().getTime()
    };
    if(!this.canAddInput && data.type === 'select'){
      await this.notiSvc.showNotification(
        {
          icon:'alert',
          title: 'Alcanzaste el número máximo de campos de selección.',
          text: '',
          hideCancel: true
        });
      return;
    }
    this.store.dispatch( addInput({ input: data }) );
    this.notiSvc.showNotification(
      {
        icon:'check',
        title: 'Se agregó un nuevo campo',
        text: '',
        hideCancel: true
      });
    this.dialog.close(true);
  }

  addInput(): void{
    this.valuesIndex.push('Nuevo campo');
    this.values.push('');
    this.form.get('values')?.setValue(this.values);
  }

  deleteInput(idx: number): void{
    this.valuesIndex.splice(idx, 1);
    this.values.splice(idx, 1);
    this.form.get('values')?.setValue(this.values);
  }

  editInput(idx: number, event: any): void{
    this.values[idx] = event.target.value;
    this.form.get('values')?.setValue(this.values);
  }

  showSelection(event: any): void{
    this.isSelect = event.value === 'select';
    this.values = [];
    this.form.get('values')?.setValue(this.values);
    if(this.isSelect){
      this.form.get('values')?.setValidators([Validators.required]);
    }else{
      this.form.get('values')?.clearValidators();
    }

    this.form.get('values')?.updateValueAndValidity();

  }

}
